// Chat API simplified for static export - returns placeholder data
export async function POST(req: Request) {
  return new Response(
    JSON.stringify({
      message: "Chat disabled in demo mode - This is a Stripe integration demo. Please check out our Stripe payment integration below!",
      choices: [{ 
        delta: { content: "Chat functionality is disabled in this Stripe integration demo. Please scroll down to try our payment system!" } 
      }]
    }),
    { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    }
  );
}
