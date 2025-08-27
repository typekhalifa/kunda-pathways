import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface PasswordResetRequest {
  email: string;
  redirectUrl: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, redirectUrl }: PasswordResetRequest = await req.json();

    console.log('Password reset requested for:', email);

    // Initialize Supabase client with service role key for admin operations
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Generate a password reset link using Supabase Auth Admin API
    const { data, error } = await supabase.auth.admin.generateLink({
      type: 'recovery',
      email: email,
      options: {
        redirectTo: redirectUrl,
      }
    });

    if (error) {
      console.error('Error generating reset link:', error);
      throw new Error('Failed to generate reset link');
    }

    console.log('Reset link generated successfully');

    // Send email using Resend
    const emailResponse = await resend.emails.send({
      from: "Kunda Pathways <onboarding@resend.dev>",
      to: [email],
      subject: "Reset Your Password - Kunda Pathways",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #4F46E5; margin: 0;">Kunda Pathways</h1>
            <h2 style="color: #333; margin: 10px 0;">Reset Your Password</h2>
          </div>
          
          <p style="color: #555; line-height: 1.6;">Hello,</p>
          
          <p style="color: #555; line-height: 1.6;">
            You requested to reset your password for your Kunda Pathways admin account.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${data.properties?.action_link}" 
               style="background: linear-gradient(135deg, #4F46E5, #7C3AED); color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold; font-size: 16px;">
              Reset Password
            </a>
          </div>
          
          <div style="background: #FEF3C7; border: 1px solid #F59E0B; border-radius: 6px; padding: 15px; margin: 20px 0;">
            <p style="color: #92400E; margin: 0; font-size: 14px;">
              <strong>Important:</strong> This link will expire in 24 hours for security reasons.
            </p>
          </div>
          
          <p style="color: #555; line-height: 1.6;">
            If you did not request this password reset, please ignore this email. Your password will remain unchanged.
          </p>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #E5E7EB;">
          
          <div style="text-align: center;">
            <p style="color: #6B7280; font-size: 14px; margin: 0;">
              Best regards,<br>
              <strong>Kunda Pathways Team</strong>
            </p>
            <p style="color: #9CA3AF; font-size: 12px; margin: 10px 0 0 0;">
              Your Gateway to Global Education and Business Success
            </p>
          </div>
        </div>
      `,
    });

    console.log("Password reset email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Password reset email sent successfully' 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error sending password reset email:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Failed to send password reset email' 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);