// Search API simplified for static export
export async function POST(req: Request) {
  return new Response(
    JSON.stringify({ 
      message: "Search disabled in demo", 
      sources: [], 
      results: [] 
    }), 
    { 
      status: 200, 
      headers: { "Content-Type": "application/json" } 
    }
  );
}
