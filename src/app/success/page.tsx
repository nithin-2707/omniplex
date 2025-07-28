'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function Success() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const isDemo = searchParams.get('demo') === 'true';
  const [sessionData, setSessionData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessionData = async () => {
      if (sessionId && !isDemo && sessionId !== 'demo_session') {
        try {
          const response = await fetch(`/api/checkout/session?session_id=${sessionId}`);
          if (response.ok) {
            const data = await response.json();
            setSessionData(data);
          }
        } catch (error) {
          console.error('Failed to fetch session data:', error);
        }
      }
      setLoading(false);
    };

    fetchSessionData();
  }, [sessionId, isDemo]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-8">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg mx-auto text-center border border-green-200">
        <div className="text-6xl mb-6">🎉</div>
        
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          Payment Successful!
        </h1>
        
        <p className="text-gray-700 mb-6 text-lg">
          Thank you for your purchase! Your Pro Plan is now active.
        </p>

        {isDemo && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-700 font-medium">
              🧪 Demo Mode - This was a test transaction
            </p>
            <p className="text-xs text-blue-600 mt-1">
              Use card 4242 4242 4242 4242 for real test payments
            </p>
          </div>
        )}

        {sessionData && !isDemo && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-green-800 mb-2">Payment Details</h3>
            <div className="text-sm text-green-700 space-y-1">
              <p>Amount: ${(sessionData.amount_total / 100).toFixed(2)} USD</p>
              <p>Payment Status: {sessionData.payment_status}</p>
              <p>Session ID: {sessionId?.slice(0, 20)}...</p>
            </div>
          </div>
        )}

        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">🚀 What&apos;s Next?</h3>
          <div className="text-sm text-gray-700 space-y-2">
            <div className="flex items-center justify-center">
              <span className="text-green-500 mr-2">✓</span>
              Unlimited AI conversations
            </div>
            <div className="flex items-center justify-center">
              <span className="text-green-500 mr-2">✓</span>
              Advanced search capabilities
            </div>
            <div className="flex items-center justify-center">
              <span className="text-green-500 mr-2">✓</span>
              Priority support access
            </div>
            <div className="flex items-center justify-center">
              <span className="text-green-500 mr-2">✓</span>
              Export chat history
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Link 
            href="/"
            className="block w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-105"
          >
            🏠 Back to Home
          </Link>
          
          <Link 
            href="/?openSidebar=true"
            className="block w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-105"
          >
            💬 Start Chatting Now
          </Link>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Questions? Contact us at support@omniplex.ai
          </p>
        </div>
      </div>
    </div>
  );
}
