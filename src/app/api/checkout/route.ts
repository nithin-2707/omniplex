import { NextRequest } from "next/server";
import Stripe from "stripe";

// Stripe Checkout API for Pro Plan purchase
export async function POST(req: NextRequest) {
  try {
    // Check if Stripe secret key is available
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    
    if (!stripeSecretKey) {
      console.error("STRIPE_SECRET_KEY not found in environment variables");
      console.log("Available env vars:", Object.keys(process.env).filter(key => key.includes('STRIPE')));
      
      // Fallback to demo mode if env var is missing
      const demoSessionId = `cs_demo_${Date.now()}`;
      const origin = req.headers.get("origin") || "https://yellow-glacier-0ede4af10.2.azurestaticapps.net";
      
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
    }

    // Initialize Stripe with the secret key
    const stripe = new Stripe(stripeSecretKey);

    const body = await req.json();
    const origin = req.headers.get("origin") || "https://yellow-glacier-0ede4af10.2.azurestaticapps.net";
    
    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Omniplex Pro Plan",
              description: "Unlock unlimited AI conversations and advanced features",
            },
            unit_amount: 1000, // $10.00 in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel`,
    });

    return new Response(
      JSON.stringify({
        sessionId: session.id,
        url: session.url
      }),
      { 
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    console.error("Stripe checkout error:", error);
    
    // Fallback to demo mode on any error
    const demoSessionId = `cs_demo_${Date.now()}`;
    const origin = req.headers.get("origin") || "https://yellow-glacier-0ede4af10.2.azurestaticapps.net";
    
    return new Response(
      JSON.stringify({
        sessionId: demoSessionId,
        url: `${origin}/success?session_id=${demoSessionId}&demo=true&fallback=true`
      }),
      { 
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}
