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
  const [cardDetails, setCardDetails] = useState({ name: '', number: '', cvc: '' });
  const [addressDetails, setAddressDetails] = useState({ line: '', city: '', state: '', pincode: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);

  const isNumeric = (value) => /^\d+$/.test(value);

  const handlePayNow = async () => {
    setError('');

    if (!selectedMethod) {
      setError('Please select a payment method.');
      return;
    }

    if (selectedMethod === 'mastercard') {
      const { name, number, cvc } = cardDetails;
      if (!name || !number || !cvc) {
        setError('Please fill in all card details.');
        return;
      }
      if (!isNumeric(number) || number.length < 13 || number.length > 19) {
        setError('Enter a valid card number (13-19 digits).');
        return;
      }
      if (!/^\d{3}$/.test(cvc)) {
        setError('CVC must be a 3-digit number.');
        return;
      }
    }

    if (selectedMethod === 'cod') {
      const { line, city, state, pincode } = addressDetails;
      if (!line || !city || !state || !pincode) {
        setError('Please fill in all address fields.');
        return;
      }
      if (!isNumeric(pincode)) {
        setError('Pincode must be numeric.');
        return;
      }
    }

    setLoading(true);

    const payload = {
      productId,
      productName,
      productPrice,
      method: selectedMethod,
      cardDetails,
      address: addressDetails,
      email: 'recipient@example.com',
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
          <InputField label="Cardholder Name" value={cardDetails.name} onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })} />
          <InputField label="Card Number" value={cardDetails.number} onChange={(e) => {
            if (e.target.value === '' || isNumeric(e.target.value)) {
              setCardDetails({ ...cardDetails, number: e.target.value });
            }
          }} />
          <InputField label="CVC" value={cardDetails.cvc} onChange={(e) => {
            if (e.target.value === '' || /^\d{0,3}$/.test(e.target.value)) {
              setCardDetails({ ...cardDetails, cvc: e.target.value });
            }
          }} />
        </div>
      )}

      {selectedMethod === 'paypal' && (
        <div className="text-center">
          <p className="text-gray-700 mb-2">Scan this QR to Pay with PayPal</p>
          <img src="/qr.png" alt="PayPal QR" className="mx-auto h-40" />
        </div>
      )}

      {selectedMethod === 'cod' && (
        <div className="space-y-3">
          <InputField label="Address Line" value={addressDetails.line} onChange={(e) => setAddressDetails({ ...addressDetails, line: e.target.value })} />
          <InputField label="City" value={addressDetails.city} onChange={(e) => setAddressDetails({ ...addressDetails, city: e.target.value })} />
          <InputField label="State" value={addressDetails.state} onChange={(e) => setAddressDetails({ ...addressDetails, state: e.target.value })} />
          <InputField label="Pincode" value={addressDetails.pincode} onChange={(e) => {
            if (e.target.value === '' || isNumeric(e.target.value)) {
              setAddressDetails({ ...addressDetails, pincode: e.target.value });
            }
          }} />
        </div>
      )}

      {selectedMethod && (
        <button
          onClick={handlePayNow}
          className="w-full py-3 text-white font-semibold cursor-pointer bg-green-600 rounded-md hover:opacity-90 transition"
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
