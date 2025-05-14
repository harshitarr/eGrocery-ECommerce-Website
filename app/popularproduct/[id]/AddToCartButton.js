'use client';

import { useState } from 'react';

export default function AddToCartButton({ productId, name, price, image }) {
  const [status, setStatus] = useState('ADD TO CART');

  const handleClick = async () => {
    setStatus('Adding...');

    try {
      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, name, price, image }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus('Done');
      } else {
        setStatus('Failed');
        alert(data.message || 'Failed to add to cart');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('Error');
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={status === 'Adding...' || status === 'Done'}
      className={`bg-green-500 text-white px-4 py-2 sm:px-6 sm:py-2 text-sm sm:text-base rounded-md hover:bg-green-600 transition ${
        status === 'Done' ? 'opacity-70 cursor-not-allowed' : ''
      }`}
    >
      {status}
    </button>
  );
}
