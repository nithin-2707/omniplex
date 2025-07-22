'use client';

import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const StripeCheckout = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    setIsLoading(true);
    
    try {
      // Get Stripe instance
      const stripe = await stripePromise;
      
      if (!stripe) {
        alert('Stripe failed to load');
        return;
      }

      // Create checkout session
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: 1000 // $10.00 in cents
        })
      });

      const { sessionId } = await response.json();

      if (!sessionId) {
        alert('Failed to create checkout session');
        return;
      }

      // Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({
        sessionId: sessionId,
      });

      if (result.error) {
        alert(result.error.message);
      }
      
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Something went wrong with the payment');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-black rounded-2xl p-8 max-w-md mx-auto border-2 border-white">
      {/* Icon */}
      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"/>
        </svg>
      </div>

      {/* Title */}
      <h3 className="text-2xl font-bold text-white text-center mb-2">
        Omniplex Pro Plan
      </h3>

      {/* Description */}
      <p className="text-white text-center mb-6">
        Unlock unlimited AI conversations and advanced features
      </p>

      {/* Price */}
      <div className="text-center mb-6">
        <span className="text-4xl font-bold text-white">$10.00</span>
        <span className="text-white ml-2">/month</span>
      </div>

      {/* Features */}
      <div className="space-y-3 mb-8">
        <div className="flex items-center text-white">
          <svg className="w-5 h-5 text-white mr-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
          </svg>
          Unlimited AI conversations
        </div>
        <div className="flex items-center text-white">
          <svg className="w-5 h-5 text-white mr-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
          </svg>
          Advanced search capabilities
        </div>
        <div className="flex items-center text-white">
          <svg className="w-5 h-5 text-white mr-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
          </svg>
          Priority support
        </div>
      </div>

      {/* Subscribe Button */}
      <button
        onClick={handleCheckout}
        disabled={isLoading}
        className="w-full bg-white text-black font-semibold py-3 px-6 rounded-xl hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Processing...' : 'Subscribe Now'}
      </button>

      {/* Test Card Info */}
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          💳 Test with card: 4242 4242 4242 4242
        </p>
        <p className="text-xs text-gray-600 mt-1">
          Secure payment powered by Stripe
        </p>
      </div>
    </div>
  );
};

export default StripeCheckout;
