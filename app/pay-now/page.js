'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

const paymentMethods = [
  { id: 'mastercard', src: '/mc.png', alt: 'MasterCard' },
  { id: 'cod', src: '/COD.jpg', alt: 'Cash on Delivery' },
  { id: 'paypal', src: '/paypal.png', alt: 'PayPal' },
];

export default function PayNowPage() {
  const searchParams = useSearchParams();
  const productId = searchParams.get('productId');
  const productName = searchParams.get('productName');
  const productPrice = searchParams.get('productPrice');

  const [selectedMethod, setSelectedMethod] = useState(null);
  const [cardDetails, setCardDetails] = useState({ name: '', number: '', exp: '', cvc: '' });
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false); // for success screen

  const handlePayNow = async () => {
    setError('');

    if (!selectedMethod) {
      setError('Please select a payment method.');
      return;
    }

    if (selectedMethod === 'mastercard') {
      const { name, number, exp, cvc } = cardDetails;
      if (!name || !number || !exp || !cvc) {
        setError('Please fill in all card details.');
        return;
      }
    }

    if (selectedMethod === 'cod' && !address.trim()) {
      setError('Please enter your delivery address.');
      return;
    }

    setLoading(true);

    const payload = {
      productId,
      productName,
      productPrice,
      method: selectedMethod,
      cardDetails,
      address,
      email: 'recipient@example.com', // <-- replace with real or test email
    };

    try {
      const res = await fetch('/api/send-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setPaymentDone(true);
      } else {
        setError('Payment failed. Please try again.');
      }
    } catch (error) {
      console.error('Payment error:', error);
      setError('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (paymentDone) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-md text-center">
          <h1 className="text-2xl font-bold text-green-600 mb-4">Payment Successful!</h1>
          <p className="text-gray-700">Your order has been confirmed. Thank you for shopping with us!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow-md space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Checkout</h2>

      {error && <div className="text-red-500 text-sm text-center">{error}</div>}

      <div className="flex justify-between gap-4">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            onClick={() => setSelectedMethod(method.id)}
            className={`cursor-pointer p-2 border rounded-lg shadow-sm transition ${selectedMethod === method.id ? 'border-green-500' : 'border-gray-200'}`}
          >
            <img src={method.src} alt={method.alt} className="h-10" />
          </div>
        ))}
      </div>

      <div className="text-sm text-gray-700 space-y-1 mt-4">
        <p><strong>Product Name:</strong> {productName}</p>
        <p><strong>Price:</strong> ₹{productPrice}</p>
      </div>

      {selectedMethod === 'mastercard' && (
        <div className="space-y-3">
          <InputField label="Cardholder name" value={cardDetails.name} onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })} />
          <InputField label="Card number" value={cardDetails.number} onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })} />
          <div className="flex gap-3">
            <InputField label="Expiration date" value={cardDetails.exp} onChange={(e) => setCardDetails({ ...cardDetails, exp: e.target.value })} />
            <InputField label="CVC" value={cardDetails.cvc} onChange={(e) => setCardDetails({ ...cardDetails, cvc: e.target.value })} />
          </div>
        </div>
      )}

      {selectedMethod === 'paypal' && (
        <div className="text-center">
          <p className="text-gray-700 mb-2">Scan this QR to Pay with PayPal</p>
          <img src="/qr.png" alt="PayPal QR" className="mx-auto h-40" />
        </div>
      )}

      {selectedMethod === 'cod' && (
        <div>
          <textarea
            placeholder="Enter your delivery address"
            className="w-full h-24 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
      )}

      {selectedMethod && (
        <button
          onClick={handlePayNow}
          className="w-full py-3 text-white font-semibold bg-gradient-to-r from-purple-500 to-blue-500 rounded-md hover:opacity-90 transition"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Pay Now'}
        </button>
      )}
    </div>
  );
}

const InputField = ({ label, value, onChange }) => (
  <div>
    <label className="block text-sm text-gray-700 mb-1">{label}</label>
    <input
      type="text"
      className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      value={value}
      onChange={onChange}
    />
  </div>
);
