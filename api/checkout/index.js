const { app } = require('@azure/functions');
const Stripe = require('stripe');

app.http('checkout', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        try {
            const body = await request.json();
            const { amount } = body;

            context.log('Checkout request received:', { amount });

            // Use Stripe secret key
            const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

            if (!stripeSecretKey || stripeSecretKey.includes('dummy') || stripeSecretKey.includes('demo')) {
                context.log.error('Stripe secret key not properly configured');
                return {
                    status: 500,
                    jsonBody: {
                        error: 'Stripe configuration not found. Please contact support.'
                    }
                };
            }

            context.log('Stripe key found, creating session...');

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
                                images: ['https://delightful-forest-03b64411e.4.azurestaticapps.net/Logo.png'],
                            },
                            unit_amount: amount, // $10.00 in cents
                        },
                        quantity: 1,
                    },
                ],
                mode: 'payment',
                success_url: `https://delightful-forest-03b64411e.4.azurestaticapps.net/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `https://delightful-forest-03b64411e.4.azurestaticapps.net/cancel`,
                billing_address_collection: 'auto',
                customer_creation: 'always',
            });

            context.log('Stripe session created successfully:', session.id);

            return {
                status: 200,
                jsonBody: {
                    sessionId: session.id,
                    url: session.url
                }
            };

        } catch (error) {
            context.log.error('Stripe API error:', error);
            return {
                status: 500,
                jsonBody: {
                    error: 'Failed to create checkout session. Please try again.',
                    details: error.message || 'Unknown error'
                }
            };
        }
    }
});
