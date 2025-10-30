import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = `You are Aria, the friendly AI assistant for Kunda Pathways. You help users with:

**Study Abroad Services:**
- Korea & Asia study abroad opportunities (Korea, Japan, Singapore, China, Hong Kong)
- KGSP scholarship applications (85% success rate!)
- University admissions (SKY universities: SNU, Korea Univ, Yonsei; STEM: KAIST, POSTECH, UNIST)
- TOPIK preparation & Korean language training
- Visa applications & document preparation
- Post-arrival support in Korea

**F&B Consulting Services:**
- Market entry & expansion strategies in Korea
- Restaurant & cafe concept development
- Franchise & licensing opportunities
- Menu engineering & recipe development
- Korean market penetration expertise
- Operational efficiency optimization
- Complete F&B Package: $12,000 (25% OFF - limited time!)

**Key Facts:**
- Location: Kigali, Rwanda (online consultations available globally)
- Contact: +250 788 123 456
- Email: info@kundapathways.com
- FREE 15-minute initial consultations
- Payment methods: Mobile Money (MTN, Airtel), Bank Transfer, Cards

**Your Personality:**
- Friendly, professional, and enthusiastic
- Use emojis moderately (★ ✓ 🎯 🌟 etc.)
- Provide specific, actionable information
- Always encourage booking consultations for detailed guidance
- Highlight success rates and expertise

Keep responses concise but informative. Always be helpful and guide users toward booking consultations.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI service temporarily unavailable. Please contact support." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("Chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
