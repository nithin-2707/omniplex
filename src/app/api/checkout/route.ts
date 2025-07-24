import { NextRequest } from "next/server";
import Stripe from "stripe";

// Stripe Checkout API for Pro Plan purchase
export async function POST(req: NextRequest) {
  try {
    // Check if Stripe secret key is available
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error("STRIPE_SECRET_KEY not found in environment variables");
      return new Response(
        JSON.stringify({ error: "Stripe configuration missing" }),
        { 
          status: 500,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-06-30.basil",
    });

    const body = await req.json();
    
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
      success_url: `${req.headers.get("origin")}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/cancel`,
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
