// Favicon API simplified for static export - returns placeholder
export async function GET(req: Request) {
  // Return a simple 1x1 transparent PNG as placeholder
  const transparentPng = Buffer.from(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChAI/sEyoNQAAAABJRU5ErkJggg==",
    "base64"
  );
  
  return new Response(transparentPng, {
    status: 200,
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=86400"
    }
  });
}
