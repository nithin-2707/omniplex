// Weather API simplified for static export
export async function GET(req: Request) {
  return new Response(
    JSON.stringify({ 
      message: "Weather disabled in demo", 
      current: null, 
      forecast: [] 
    }), 
    { 
      status: 200, 
      headers: { "Content-Type": "application/json" } 
    }
  );
}
