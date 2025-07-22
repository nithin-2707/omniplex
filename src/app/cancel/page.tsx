import React from 'react';
import Link from 'next/link';

export default function Cancel() {
  return (
    <div className="min-h-screen bg-red-50 flex items-center justify-center p-8">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md mx-auto text-center">
        <div className="text-6xl mb-4">❌</div>
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Payment Cancelled
        </h1>
        <p className="text-gray-600 mb-6">
          No worries! You can try again anytime.
        </p>
        <div className="bg-red-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-red-700">
            Your payment was cancelled. No charges were made.
          </p>
        </div>
        <div className="space-y-3">
          <Link 
            href="/"
            className="block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Back to Home
          </Link>
          <Link 
            href="/"
            className="block bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Try Payment Again
          </Link>
        </div>
      </div>
    </div>
  );
}
