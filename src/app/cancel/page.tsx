import React from 'react';
import Link from 'next/link';

export default function Cancel() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-8">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-auto text-center border border-red-200">
        <div className="text-6xl mb-6">💔</div>
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Payment Cancelled
        </h1>
        <p className="text-gray-700 mb-6">
          No worries! You can try upgrading again anytime.
        </p>
        
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-red-700 font-medium mb-2">
            💡 Payment was cancelled
          </p>
          <p className="text-xs text-red-600">
            No charges were made to your account
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-blue-800 mb-2">Still want Pro features?</h3>
          <div className="text-xs text-blue-700 space-y-1">
            <p>✓ Test with card: 4242 4242 4242 4242</p>
            <p>✓ Use any future expiry date</p>
            <p>✓ Use any 3-digit CVC</p>
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
            href="/"
            className="block w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-105"
          >
            🚀 Try Upgrade Again
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
