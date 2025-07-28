const { app } = require('@azure/functions');
const Stripe = require('stripe');

app.http('session', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'checkout/session',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        try {
            const url = new URL(request.url);
            const sessionId = url.searchParams.get('session_id');

            if (!sessionId) {
                return {
                    status: 400,
                    jsonBody: { error: 'Session ID is required' }
                };
            }

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

            const stripe = new Stripe(stripeSecretKey, {
                apiVersion: '2025-06-30.basil',
            });

            const session = await stripe.checkout.sessions.retrieve(sessionId);

            return {
                status: 200,
                jsonBody: {
                    id: session.id,
                    amount_total: session.amount_total,
                    currency: session.currency,
                    customer_details: session.customer_details,
                    payment_status: session.payment_status,
                    status: session.status
                }
            };

        } catch (error) {
            context.log.error('Error retrieving session:', error);
            return {
                status: 500,
                jsonBody: {
                    error: 'Failed to retrieve session data',
                    details: error.message || 'Unknown error'
                }
            };
        }
    }
});
