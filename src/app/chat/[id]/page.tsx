import { redirect } from 'next/navigation';

// Redirect all dynamic chat routes to home for static export
// This route is not needed for the Stripe integration demo
export default function ChatPage() {
  redirect('/');
}
