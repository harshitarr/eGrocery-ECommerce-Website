"use client";

import { useState } from "react";

const paymentMethods = [
  { id: "mastercard", src: "mc.png", alt: "MasterCard" },
  { id: "cod", src: "COD.jpg", alt: "Cash on Delivery" }, // Replacing Visa with COD
  { id: "paypal", src: "paypal.png", alt: "PayPal" },
];

export default function PayNowPage() {
  const [selectedMethod, setSelectedMethod] = useState(null);

  const product = {
    name: "Premium Headphones",
    id: "PRD-90823",
    price: "$129.99",
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow-md space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Checkout</h2>

      {/* Payment method selection */}
      <div className="flex justify-between gap-4">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            onClick={() => setSelectedMethod(method.id)}
            className={`cursor-pointer p-2 border rounded-lg shadow-sm transition ${
              selectedMethod === method.id
                ? "border-green-500"
                : "border-gray-200"
            }`}
          >
            <img src={method.src} alt={method.alt} className="h-10" />
          </div>
        ))}
      </div>

      {/* Product details */}
      <div className="text-sm text-gray-700 space-y-1">
        <p><strong>Product Name:</strong> {product.name}</p>
        <p><strong>Product ID:</strong> {product.id}</p>
        <p><strong>Price:</strong> {product.price}</p>
      </div>

      {/* Conditional form section */}
      {selectedMethod === "mastercard" && (
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Cardholder name"
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Card number"
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Expiration date"
              className="w-1/2 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              placeholder="CVC"
              className="w-1/2 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>
      )}

      {selectedMethod === "paypal" && (
        <div className="text-center">
          <p className="text-gray-700 mb-2">Scan this QR to Pay with PayPal</p>
          <img src="qr.png" alt="PayPal QR" className="mx-auto h-40" />
        </div>
      )}

      {selectedMethod === "cod" && (
        <div>
          <textarea
            placeholder="Enter your delivery address"
            className="w-full h-24 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      )}

      {/* Pay Now button */}
      {selectedMethod && (
        <button
          className="w-full py-3 text-white font-semibold bg-gradient-to-r from-purple-500 to-blue-500 rounded-md hover:opacity-90 transition"
        >
          Pay now
        </button>
      )}
    </div>
  );
}
