import { NextRequest } from "next/server";
import Stripe from "stripe";

// Stripe Checkout API for Pro Plan purchase
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount } = body;

    console.log('Checkout request received:', { amount });

    // Use Stripe secret key
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

    if (!stripeSecretKey || stripeSecretKey.includes('dummy') || stripeSecretKey.includes('demo')) {
      console.error('Stripe secret key not properly configured');
      return Response.json(
        { error: 'Stripe configuration not found. Please contact support.' },
        { status: 500 }
      );
    }

    console.log('Stripe key found, creating session...');

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2025-06-30.basil',
    });

    // Create Checkout Sessions from body params
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Omniplex Pro Plan',
              description: 'Unlimited AI conversations, advanced features, priority support',
              images: ['https://yellow-glacier-0ede4af10.2.azurestaticapps.net/Logo.png'],
            },
            unit_amount: amount, // $10.00 in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NODE_ENV === 'production' 
        ? 'https://yellow-glacier-0ede4af10.2.azurestaticapps.net' 
        : 'http://localhost:3000'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NODE_ENV === 'production' 
        ? 'https://yellow-glacier-0ede4af10.2.azurestaticapps.net' 
        : 'http://localhost:3000'}/cancel`,
      billing_address_collection: 'auto',
      customer_creation: 'always',
    });

    console.log('Stripe session created successfully:', session.id);

    return Response.json({
      sessionId: session.id,
      url: session.url
    });

  } catch (error) {
    console.error('Stripe API error:', error);
    return Response.json(
      { 
        error: 'Failed to create checkout session. Please try again.',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
