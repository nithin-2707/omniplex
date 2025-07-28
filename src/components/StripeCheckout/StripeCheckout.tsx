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
        alert('Stripe failed to load. Please refresh and try again.');
        setIsLoading(false);
        return;
      }

      // Create checkout session using Azure Function
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: 1000 // $10.00 in cents
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.error || 'Failed to create checkout session');
        setIsLoading(false);
        return;
      }

      const data = await response.json();
      const { sessionId, error } = data;

      if (error) {
        alert(error);
        setIsLoading(false);
        return;
      }

      if (!sessionId) {
        alert('No session ID received. Please try again.');
        setIsLoading(false);
        return;
      }

      // Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({
        sessionId: sessionId,
      });

      if (result.error) {
        alert(result.error.message);
        setIsLoading(false);
      }
      
    } catch (error) {
      console.error('Checkout error:', error);
      alert('An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div style={{ width: '100%' }}>
      {/* Subscribe Button */}
      <button
        onClick={handleCheckout}
        disabled={isLoading}
        style={{
          width: '100%',
          padding: '12px 24px',
          fontSize: '16px',
          fontWeight: '600',
          borderRadius: '8px',
          border: 'none',
          background: isLoading 
            ? '#6b7280' 
            : 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)',
          color: 'white',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          transition: 'all 0.25s ease-in-out',
          boxShadow: isLoading 
            ? 'none' 
            : '0 2px 8px rgba(74, 222, 128, 0.2)',
        }}
        onMouseEnter={(e) => {
          if (!isLoading) {
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(74, 222, 128, 0.3)';
          }
        }}
        onMouseLeave={(e) => {
          if (!isLoading) {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(74, 222, 128, 0.2)';
          }
        }}
      >
        {isLoading ? 'Processing...' : '🚀 Upgrade to Pro - $10'}
      </button>

      {/* Test Card Info */}
      <div style={{ marginTop: '12px', textAlign: 'center' }}>
        <div style={{ 
          fontSize: '12px', 
          color: '#ffffff', 
          margin: '4px 0',
          fontFamily: 'monospace',
          backgroundColor: '#1a1a1a',
          padding: '8px 12px',
          borderRadius: '6px',
          border: '1px solid #4ade80'
        }}>
          💳 Test Card: <strong>4242 4242 4242 4242</strong>
        </div>
        <div style={{ 
          fontSize: '10px', 
          color: '#a0a0a0', 
          margin: '4px 0'
        }}>
          Use any future expiry date and any 3-digit CVC
        </div>
        <div style={{ 
          fontSize: '10px', 
          color: '#cccccc', 
          margin: '4px 0'
        }}>
          🔒 Secure payment by Stripe
        </div>
      </div>
    </div>
  );
};

export default StripeCheckout;

