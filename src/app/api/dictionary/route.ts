import { NextRequest } from "next/server";

// Dictionary API simplified for static export - returns placeholder data
export async function POST(req: NextRequest) {
  return new Response(
    JSON.stringify({
      message: "Dictionary disabled in demo mode - This is a Stripe integration demo",
      definition: "Demo mode: Dictionary functionality disabled for static deployment",
      demo: true
    }),
    { 
      status: 200,
      headers: { "Content-Type": "application/json" }
    }
  );
}
