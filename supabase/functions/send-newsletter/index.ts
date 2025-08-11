import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.0";
import { Resend } from "npm:resend@4.0.0";
import { renderAsync } from 'npm:@react-email/components@0.0.22';
import React from 'npm:react@18.3.1';
import { NewsletterEmail } from './_templates/newsletter.tsx';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface SendNewsletterRequest {
  campaignId: string;
  subject: string;
  content: string;
  htmlContent?: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Newsletter function started");
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { campaignId, subject, content, htmlContent }: SendNewsletterRequest = await req.json();
    console.log("Request parsed:", { campaignId, subject: subject?.substring(0, 50) });

    // Validate required fields
    if (!campaignId || !subject || !content) {
      console.error("Missing required fields");
      return new Response(
        JSON.stringify({ error: "Missing required fields: campaignId, subject, content" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Initialize Resend
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    console.log("RESEND_API_KEY exists:", !!resendApiKey);
    console.log("RESEND_API_KEY length:", resendApiKey?.length || 0);
    
    if (!resendApiKey) {
      console.error("RESEND_API_KEY is not configured");
      return new Response(
        JSON.stringify({ error: "Email service not configured" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const resend = new Resend(resendApiKey);
    console.log("Resend initialized successfully");

    // Initialize Supabase
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !supabaseKey) {
      console.error("Supabase configuration missing");
      return new Response(
        JSON.stringify({ error: "Database configuration missing" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    console.log("Supabase initialized");

    // Fetch advisor information from about_content
    const { data: advisorData } = await supabase
      .from("about_content")
      .select("advisor_name, advisor_title")
      .eq("section_key", "main")
      .eq("is_active", true)
      .single();

    console.log("Advisor data fetched:", advisorData);

    // Fetch active subscribers
    const { data: subscribers, error: subscribersError } = await supabase
      .from("newsletter_subscribers")
      .select("email, name")
      .eq("is_active", true);

    if (subscribersError) {
      console.error("Error fetching subscribers:", subscribersError);
      return new Response(
        JSON.stringify({ error: "Failed to fetch subscribers" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log(`Found ${subscribers?.length || 0} active subscribers`);

    if (!subscribers || subscribers.length === 0) {
      return new Response(
        JSON.stringify({ error: "No active subscribers found" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Create the email HTML using React Email
    let emailHtml: string;
    try {
      emailHtml = await renderAsync(
        React.createElement(NewsletterEmail, {
          subject: subject,
          content: content,
          unsubscribeUrl: `${supabaseUrl}/unsubscribe`,
          advisorName: advisorData?.advisor_name || "Kunda John Kim",
          advisorTitle: advisorData?.advisor_title || "Global Education & F&B Consultant"
        })
      );
      console.log("Email HTML generated successfully with React Email");
    } catch (emailError) {
      console.error("Failed to generate React Email, falling back to basic HTML:", emailError);
      // Fallback to basic HTML if React Email fails
      emailHtml = `
        <html>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #2563eb; padding-bottom: 20px;">
              <h1 style="color: #2563eb; margin-bottom: 10px; font-size: 32px;">Kunda Pathways</h1>
              <p style="color: #666; margin: 0; font-style: italic;">Your Gateway to Global Education and Business Success</p>
            </div>
            
            <div style="background-color: #f8fafc; padding: 30px; border-radius: 8px; margin-bottom: 30px; border-left: 4px solid #2563eb;">
              <div style="white-space: pre-wrap; font-size: 16px; line-height: 1.6;">${content}</div>
            </div>
            
            <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; text-align: center;">
              <p style="margin: 0; color: #64748b; font-size: 14px;">
                Best regards,<br>
                <strong>${advisorData?.advisor_name || "Kunda John Kim"}</strong><br>
                ${advisorData?.advisor_title || "Global Education & F&B Consultant"}<br>
                Kunda Pathways
              </p>
            </div>
          </body>
        </html>
      `;
    }

    // Split subscribers into batches of 10 to avoid rate limiting
    const batchSize = 10;
    const batches = [];
    for (let i = 0; i < subscribers.length; i += batchSize) {
      batches.push(subscribers.slice(i, i + batchSize));
    }

    console.log(`Sending emails in ${batches.length} batches of ${batchSize} emails each`);

    let sentCount = 0;
    let errorCount = 0;
    const failedEmails: string[] = [];

    // Update campaign status to "sending"
    await supabase
      .from('newsletter_campaigns')
      .update({ status: 'sending' })
      .eq('id', campaignId);

    for (const [batchIndex, batch] of batches.entries()) {
      console.log(`Processing batch ${batchIndex + 1}/${batches.length} with ${batch.length} emails`);
      
      const emailPromises = batch.map(async (subscriber) => {
        try {
          console.log(`Attempting to send email to: ${subscriber.email}`);
          
          console.log(`Sending email to: ${subscriber.email} with subject: ${subject}`);
          
          const emailResult = await resend.emails.send({
            from: "Kunda Pathways <onboarding@resend.dev>", // Using Resend's testing address
            to: "jeandh023@gmail.com", // Testing with your verified email
            subject: subject,
            html: emailHtml,
          });
          
          console.log(`Resend API response:`, JSON.stringify(emailResult, null, 2));
          
          if (emailResult.error) {
            throw new Error(`Resend API error: ${JSON.stringify(emailResult.error)}`);
          }
          
          if (!emailResult.data?.id) {
            throw new Error(`No email ID returned from Resend: ${JSON.stringify(emailResult)}`);
          }
          
          sentCount++;
          console.log(`✅ Email sent successfully to: ${subscriber.email}, Resend ID: ${emailResult.data.id}`);
          return { success: true, email: subscriber.email, id: emailResult.data.id };
        } catch (error) {
          errorCount++;
          failedEmails.push(subscriber.email);
          console.error(`❌ Failed to send email to ${subscriber.email}:`, error);
          
          if (error instanceof Error) {
            console.error(`Error message: ${error.message}`);
          }
          return { success: false, email: subscriber.email, error: error.message };
        }
      });

      const batchResults = await Promise.all(emailPromises);
      const batchSuccess = batchResults.filter(r => r.success).length;
      const batchFailed = batchResults.filter(r => !r.success).length;
      
      console.log(`Batch ${batchIndex + 1} completed. Success: ${batchSuccess}, Failed: ${batchFailed}`);
      
      // Add a delay between batches to avoid rate limiting
      if (batchIndex < batches.length - 1) {
        console.log("Waiting 2 seconds before next batch...");
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }

    console.log(`Newsletter sending completed. Total sent: ${sentCount}, Total failed: ${errorCount}`);

    // Update campaign status to "sent"
    const { error: updateError } = await supabase
      .from('newsletter_campaigns')
      .update({
        status: 'sent',
        sent_at: new Date().toISOString(),
        recipient_count: sentCount
      })
      .eq('id', campaignId);

    if (updateError) {
      console.error('Error updating campaign status:', updateError);
    }

    const responseData = { 
      success: true, 
      message: `Newsletter sent successfully to ${sentCount} subscribers`,
      sentCount,
      errorCount,
      totalSubscribers: subscribers.length
    };

    if (failedEmails.length > 0) {
      responseData.failedEmails = failedEmails;
    }

    return new Response(JSON.stringify(responseData), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });

  } catch (error: any) {
    console.error("❌ Critical error in send-newsletter function:", error);
    console.error("Error stack:", error.stack);
    
    // Try to update campaign status to failed if we have a campaignId
    try {
      const { campaignId } = await req.json();
      if (campaignId) {
        const supabase = createClient(
          Deno.env.get("SUPABASE_URL")!,
          Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
        );
        await supabase
          .from('newsletter_campaigns')
          .update({ status: 'failed' })
          .eq('id', campaignId);
      }
    } catch (updateError) {
      console.error('Failed to update campaign status to failed:', updateError);
    }
    
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.stack,
        timestamp: new Date().toISOString()
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);