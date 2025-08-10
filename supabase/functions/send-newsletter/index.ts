import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

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
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Newsletter function called with request method:", req.method);
    
    const requestBody = await req.json();
    console.log("Request body received:", requestBody);
    
    const { campaignId, subject, content, htmlContent }: SendNewsletterRequest = requestBody;
    
    if (!campaignId || !subject || !content) {
      throw new Error('Missing required fields: campaignId, subject, or content');
    }
    
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const resendKey = Deno.env.get('RESEND_API_KEY');
    
    console.log("Environment check:", {
      hasSupabaseUrl: !!supabaseUrl,
      hasSupabaseKey: !!supabaseKey,
      hasResendKey: !!resendKey
    });
    
    if (!supabaseUrl || !supabaseKey || !resendKey) {
      throw new Error('Missing required environment variables');
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log("Processing newsletter campaign:", campaignId);

    // Get active subscribers
    const { data: subscribers, error: subscribersError } = await supabase
      .from('newsletter_subscribers')
      .select('email, name')
      .eq('is_active', true);

    if (subscribersError) {
      throw new Error(`Failed to fetch subscribers: ${subscribersError.message}`);
    }

    if (!subscribers || subscribers.length === 0) {
      throw new Error('No active subscribers found');
    }

    console.log(`Found ${subscribers.length} active subscribers`);

    // Prepare email content
    const emailHtml = htmlContent || `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #2563eb; margin: 0;">Africa Korea Connect</h1>
          <p style="color: #64748b; margin: 5px 0 0 0;">Your Gateway to Global Education and Business Success</p>
        </div>
        
        <div style="background-color: #f8fafc; padding: 30px; border-radius: 12px; margin-bottom: 30px;">
          <div style="white-space: pre-wrap; line-height: 1.6; color: #334155;">${content}</div>
        </div>
        
        <div style="text-align: center; padding-top: 20px; border-top: 1px solid #e2e8f0;">
          <p style="margin: 0; color: #64748b; font-size: 14px;">
            You're receiving this email because you subscribed to our newsletter.<br>
            <a href="#" style="color: #2563eb; text-decoration: none;">Unsubscribe</a>
          </p>
        </div>
      </div>
    `;

    // Send emails in batches to avoid rate limits
    const batchSize = 10;
    const batches = [];
    for (let i = 0; i < subscribers.length; i += batchSize) {
      batches.push(subscribers.slice(i, i + batchSize));
    }

    let sentCount = 0;
    let errorCount = 0;

    for (const batch of batches) {
      const emailPromises = batch.map(async (subscriber) => {
        try {
          const emailResult = await resend.emails.send({
            from: "Africa Korea Connect <onboarding@resend.dev>", // This is a verified domain by Resend
            to: [subscriber.email],
            subject: subject,
            html: emailHtml,
          });
          sentCount++;
          console.log(`Email sent to: ${subscriber.email}, Result:`, emailResult);
        } catch (error) {
          errorCount++;
          console.error(`Failed to send email to ${subscriber.email}:`, error);
          // Log more detailed error information
          if (error instanceof Error) {
            console.error(`Error details: ${error.message}, Stack: ${error.stack}`);
          }
        }
      });

      await Promise.all(emailPromises);
      
      // Add a small delay between batches
      if (batches.indexOf(batch) < batches.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    // Update campaign status
    const { error: updateError } = await supabase
      .from('newsletter_campaigns')
      .update({
        status: 'sent',
        sent_at: new Date().toISOString(),
        recipient_count: sentCount
      })
      .eq('id', campaignId);

    if (updateError) {
      console.error('Failed to update campaign status:', updateError);
    }

    console.log(`Newsletter sent successfully. Sent: ${sentCount}, Errors: ${errorCount}`);

    return new Response(JSON.stringify({
      success: true,
      sentCount,
      errorCount,
      totalSubscribers: subscribers.length
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-newsletter function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);