import { NextRequest } from "next/server";

// Stock API simplified for static export - returns placeholder data
export async function POST(req: NextRequest) {
  return new Response(
    JSON.stringify({
      message: "Stock data disabled in demo mode - This is a Stripe integration demo",
      price: null,
      symbol: "DEMO",
      demo: true
    }),
    { 
      status: 200,
      headers: { "Content-Type": "application/json" }
    }
  );
}
