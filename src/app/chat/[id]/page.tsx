import { redirect } from 'next/navigation';

// Required for static export - return empty array to avoid pre-generation
export async function generateStaticParams() {
  return [];
}

// Redirect all dynamic chat routes to home for static export
// This route is not needed for the Stripe integration demo
export default function ChatPage() {
  redirect('/');
}
