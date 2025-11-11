import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface BookingApprovalRequest {
  bookingId: string;
  bookingType: string;
  name: string;
  email: string;
  services: string[];
  totalPrice: number;
  preferredDate?: string;
  preferredTime?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { bookingId, bookingType, name, email, services, totalPrice, preferredDate, preferredTime }: BookingApprovalRequest = await req.json();

    const emailResponse = await resend.emails.send({
      from: "Kunda Pathways <noreply@kundapathways.com>",
      to: [email],
      subject: "🎉 Your Booking is Approved - Kunda Pathways",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
          <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">🎉 Booking Approved!</h1>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <p style="font-size: 16px; color: #374151; margin-bottom: 20px;">
              Dear <strong>${name}</strong>,
            </p>
            
            <p style="font-size: 16px; color: #374151; margin-bottom: 20px;">
              Great news! Your ${bookingType.replace('_', ' ')} booking has been <strong style="color: #10b981;">approved</strong> by our team.
            </p>

            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="color: #1f2937; font-size: 18px; margin-top: 0;">Booking Details</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-weight: 500;">Booking ID:</td>
                  <td style="padding: 8px 0; color: #1f2937; text-align: right;"><code style="background: white; padding: 4px 8px; border-radius: 4px;">${bookingId.substring(0, 8)}</code></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-weight: 500;">Services:</td>
                  <td style="padding: 8px 0; color: #1f2937; text-align: right;">${services.join(', ')}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-weight: 500;">Total Amount:</td>
                  <td style="padding: 8px 0; color: #10b981; text-align: right; font-weight: bold; font-size: 18px;">$${totalPrice.toLocaleString()}</td>
                </tr>
                ${preferredDate ? `
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-weight: 500;">Scheduled Date:</td>
                  <td style="padding: 8px 0; color: #1f2937; text-align: right;">${new Date(preferredDate).toLocaleDateString()}</td>
                </tr>
                ` : ''}
                ${preferredTime ? `
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-weight: 500;">Scheduled Time:</td>
                  <td style="padding: 8px 0; color: #1f2937; text-align: right;">${preferredTime}</td>
                </tr>
                ` : ''}
              </table>
            </div>

            <div style="background: #dcfce7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981;">
              <h3 style="color: #065f46; margin-top: 0; font-size: 16px;">✅ Next Steps</h3>
              <p style="color: #1f2937; line-height: 1.6; margin: 10px 0;">
                Your booking is confirmed! We're excited to work with you. If you have any questions or need to make changes, please feel free to contact us.
              </p>
              <p style="margin: 10px 0; color: #065f46; font-size: 14px;">
                📱 Contact us via WhatsApp: <a href="https://wa.me/821026077012" style="color: #059669; font-weight: bold;">+82 10-2607-7012</a>
              </p>
            </div>

            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 14px; margin: 0 0 10px 0;">
                Questions? Contact us:
              </p>
              <p style="color: #1f2937; font-size: 14px; margin: 0;">
                📧 <a href="mailto:diradukunda40@gmail.com" style="color: #3b82f6;">diradukunda40@gmail.com</a><br>
                📱 <a href="https://wa.me/821026077012" style="color: #3b82f6;">+82 10-2607-7012</a>
              </p>
              <p style="color: #6b7280; font-size: 14px; margin: 20px 0 0 0;">
                Best regards,<br>
                <strong style="color: #1f2937;">The Kunda Pathways Team</strong>
              </p>
            </div>
          </div>
        </div>
      `,
    });

    console.log("Booking approval email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-booking-approval function:", error);
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
