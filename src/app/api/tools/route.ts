import { NextRequest } from "next/server";

// Tools API simplified for static export - returns placeholder data
export async function POST(req: NextRequest) {
  return new Response(
    JSON.stringify({
      message: "Tools disabled in demo mode - This is a Stripe integration demo",
      tools: [],
      demo: true
    }),
    { 
      status: 200,
      headers: { "Content-Type": "application/json" }
    }
  );
}
