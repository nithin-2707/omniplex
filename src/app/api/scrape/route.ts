// Scrape API simplified for static export - returns placeholder data
export async function POST(req: Request) {
  return new Response(
    JSON.stringify({
      message: "Scraping disabled in demo mode - This is a Stripe integration demo",
      content: "",
      title: "Demo Mode",
      description: "Scraping functionality disabled for static deployment"
    }),
    { 
      status: 200,
      headers: { "Content-Type": "application/json" }
    }
  );
}
