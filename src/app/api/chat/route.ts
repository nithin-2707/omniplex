import { NextRequest } from "next/server";

// Chat API simplified for static export - returns placeholder data
export async function POST(req: NextRequest) {
  return new Response(
    JSON.stringify({
      message: "Chat disabled in demo mode - This is a Stripe integration demo",
      response: "This is a demo response. The chat feature is disabled for static deployment.",
      demo: true
    }),
    { 
      status: 200,
      headers: { "Content-Type": "application/json" }
    }
  );
}
