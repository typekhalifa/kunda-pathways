import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.0";
import { Resend } from "npm:resend@4.0.0";
import { renderAsync } from 'npm:@react-email/components@0.0.22';
import React from 'npm:react@18.3.1';
import { WelcomeEmail } from './_templates/welcome.tsx';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface WelcomeEmailRequest {
  email: string;
  name?: string;
  subscriberId: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Welcome email function started");
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, name, subscriberId }: WelcomeEmailRequest = await req.json();
    console.log("Request parsed:", { email, name });

    // Validate required fields
    if (!email || !subscriberId) {
      console.error("Missing required fields");
      return new Response(
        JSON.stringify({ error: "Missing required fields: email, subscriberId" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Initialize Resend
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    
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

    // Fetch advisor information
    const { data: advisorData } = await supabase
      .from("about_content")
      .select("advisor_name, advisor_title")
      .eq("section_key", "main")
      .eq("is_active", true)
      .single();

    console.log("Advisor data fetched:", advisorData);

    // Get the website URL
    const websiteUrl = Deno.env.get("WEBSITE_URL") || "https://kundapathways.com";
    const unsubscribeUrl = `${websiteUrl}/unsubscribe?id=${subscriberId}`;

    // Create the email HTML using React Email
    let emailHtml: string;
    try {
      emailHtml = await renderAsync(
        React.createElement(WelcomeEmail, {
          name: name || "there",
          unsubscribeUrl: unsubscribeUrl,
          advisorName: advisorData?.advisor_name || "Kunda John Kim",
          advisorTitle: advisorData?.advisor_title || "Global Education & F&B Consultant"
        })
      );
      console.log("Welcome email HTML generated successfully");
    } catch (emailError) {
      console.error("Failed to generate React Email, using fallback:", emailError);
      emailHtml = `
        <html>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #2563eb; padding-bottom: 20px;">
              <h1 style="color: #2563eb; margin-bottom: 10px; font-size: 32px;">Welcome to Kunda Pathways!</h1>
              <p style="color: #666; margin: 0; font-style: italic;">Your Gateway to Global Education and Business Success</p>
            </div>
            
            <div style="padding: 30px; margin-bottom: 30px;">
              <h2 style="color: #1a1a1a; margin-bottom: 20px;">Hello ${name || "there"}!</h2>
              <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                Thank you for subscribing to our newsletter! We're excited to have you join our community.
              </p>
              <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                You'll now receive regular updates about:
              </p>
              <ul style="margin-bottom: 20px;">
                <li>Educational opportunities and scholarship alerts</li>
                <li>Business consulting insights and tips</li>
                <li>Exclusive resources and guides</li>
                <li>Success stories from our community</li>
              </ul>
              <p style="font-size: 16px; line-height: 1.6;">
                Stay tuned for valuable content that will help you achieve your global education and business goals!
              </p>
            </div>
            
            <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; text-align: center;">
              <p style="margin: 0; color: #64748b; font-size: 14px;">
                Best regards,<br>
                <strong>${advisorData?.advisor_name || "Kunda John Kim"}</strong><br>
                ${advisorData?.advisor_title || "Global Education & F&B Consultant"}<br>
                Kunda Pathways
              </p>
              <p style="margin-top: 20px; color: #94a3b8; font-size: 12px;">
                You received this email because you subscribed to our newsletter.
                <a href="${unsubscribeUrl}" style="color: #2563eb; text-decoration: underline;">Unsubscribe here</a>
              </p>
            </div>
          </body>
        </html>
      `;
    }

    // Send the welcome email
    console.log(`Sending welcome email to: ${email}`);
    
    const emailResult = await resend.emails.send({
      from: "Kunda Pathways <noreply@kundapathways.com>",
      to: email,
      subject: "Welcome to Kunda Pathways Newsletter!",
      html: emailHtml,
    });
    
    console.log(`Resend API response:`, JSON.stringify(emailResult, null, 2));
    
    if (emailResult.error) {
      throw new Error(`Resend API error: ${JSON.stringify(emailResult.error)}`);
    }
    
    if (!emailResult.data?.id) {
      throw new Error(`No email ID returned from Resend: ${JSON.stringify(emailResult)}`);
    }
    
    console.log(`✅ Welcome email sent successfully to: ${email}, Resend ID: ${emailResult.data.id}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Welcome email sent successfully",
        emailId: emailResult.data.id 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-welcome-email function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message || "Failed to send welcome email" 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
