import { NextRequest } from "next/server";

// Stripe Checkout API for Pro Plan purchase
export async function POST(req: NextRequest) {
  try {
    // For assignment demo - simulate successful Stripe checkout
    // In production, you would use real Stripe API with proper environment variables
    
    const body = await req.json();
    
    // Simulate Stripe checkout session creation
    const demoSessionId = `cs_demo_${Date.now()}`;
    const origin = req.headers.get("origin") || "https://yellow-glacier-0ede4af10.2.azurestaticapps.net";
    
    // Return successful demo response that matches Stripe's format
    return new Response(
      JSON.stringify({
        sessionId: demoSessionId,
        url: `${origin}/success?session_id=${demoSessionId}&demo=true`
      }),
      { 
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    console.error("Checkout error:", error);
    return new Response(
      JSON.stringify({ 
        error: "Failed to create checkout session",
        details: error instanceof Error ? error.message : "Unknown error"
      }),
      { 
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}
