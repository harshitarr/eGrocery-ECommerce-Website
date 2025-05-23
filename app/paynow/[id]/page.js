"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";

const paymentMethods = [
  { id: "mastercard", src: "/mc.png", alt: "MasterCard" },
  { id: "cod", src: "/COD.jpg", alt: "Cash on Delivery" },
  { id: "paypal", src: "/paypal.png", alt: "PayPal" },
];

export default function PayNowPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const productType = searchParams.get("type");
  const productId = params.id;

  const [selectedMethod, setSelectedMethod] = useState(null);
  const [product, setProduct] = useState(null);
  const [cardDetails, setCardDetails] = useState({ name: "", number: "", cvc: "" });
  const [address, setAddress] = useState({ line: "", city: "", state: "", pincode: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [paymentDone, setPaymentDone] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      if (!productType || !productId) {
        setLoadError("Invalid product or type.");
        setLoading(false);
        return;
      }

      let apiRoute = "";
      if (productType === "bundle") {
        apiRoute = `/api/bundle?id=${productId}`;
      } else if (productType === "popular") {
        apiRoute = `/api/popular?id=${productId}`;
      } else if (productType === "category") {
        apiRoute = `/api/product/${productId}`;
      } else {
        setLoadError("Invalid product type.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(apiRoute);
        const data = await res.json();
        setProduct(data.product || data);
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
        setLoadError("Failed to load product details.");
        setLoading(false);
      }
    }

    fetchProduct();
  }, [productId, productType]);

  const handlePayNow = async () => {
    setErrorMessage("");

    if (!selectedMethod) {
      setErrorMessage("Please select a payment method.");
      return;
    }

    if (selectedMethod === "mastercard") {
      const { name, number, cvc } = cardDetails;
      if (!name || !number || !cvc) {
        setErrorMessage("Please fill in all card details.");
        return;
      }
      if (!/^\d{16}$/.test(number)) {
        setErrorMessage("Card number must be a 16-digit numeric value.");
        return;
      }
      if (!/^\d{3}$/.test(cvc)) {
        setErrorMessage("CVC must be a 3-digit numeric value.");
        return;
      }
    }

    if (selectedMethod === "cod") {
      const { line, city, state, pincode } = address;
      if (!line || !city || !state || !pincode) {
        setErrorMessage("Please fill in all address fields.");
        return;
      }
      if (!/^\d{6}$/.test(pincode)) {
        setErrorMessage("Pincode must be a 6-digit numeric value.");
        return;
      }
    }

    const payload = {
      productId: product._id,
      productName: product.name,
      price: product.price,
      method: selectedMethod,
      cardDetails,
      address,
    };

    try {
      const res = await fetch("/api/send-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setPaymentDone(true);
      } else {
        setErrorMessage("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      setErrorMessage("Payment failed. Please try again.");
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

  if (loading) {
    return <div className="text-center mt-10 text-gray-600">Loading product details...</div>;
  }

  if (loadError) {
    return <div className="text-center mt-10 text-red-500">{loadError}</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow-md space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Checkout</h2>

      {errorMessage && <div className="text-red-500 text-sm text-center">{errorMessage}</div>}

      <div className="flex justify-between gap-4">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            onClick={() => setSelectedMethod(method.id)}
            className={`cursor-pointer p-2 border rounded-lg shadow-sm transition ${
              selectedMethod === method.id ? "border-green-500" : "border-gray-200"
            }`}
          >
            <img src={method.src} alt={method.alt} className="h-10" />
          </div>
        ))}
      </div>

      <div className="text-sm text-gray-700 space-y-1">
        <p><strong>Product Name:</strong> {product.name}</p>
        <p><strong>Product ID:</strong> {product._id}</p>
        <p><strong>Price:</strong> ₹{product.price}</p>
      </div>

      {selectedMethod === "mastercard" && (
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Cardholder name"
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={cardDetails.name}
            onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Card number"
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={cardDetails.number}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, ""); // Remove non-numeric
              setCardDetails({ ...cardDetails, number: val });
            }}
            maxLength={16}
          />
          <input
            type="text"
            placeholder="CVC"
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={cardDetails.cvc}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "").slice(0, 3);
              setCardDetails({ ...cardDetails, cvc: val });
            }}
          />
        </div>
      )}

      {selectedMethod === "paypal" && (
        <div className="text-center">
          <p className="text-gray-700 mb-2">Scan this QR to Pay with PayPal</p>
          <img src="/qr.png" alt="PayPal QR" className="mx-auto h-40" />
        </div>
      )}

      {selectedMethod === "cod" && (
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Address Line"
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={address.line}
            onChange={(e) => setAddress({ ...address, line: e.target.value })}
          />
          <input
            type="text"
            placeholder="City"
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={address.city}
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
          />
          <input
            type="text"
            placeholder="State"
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={address.state}
            onChange={(e) => setAddress({ ...address, state: e.target.value })}
          />
          <input
            type="text"
            placeholder="Pincode"
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={address.pincode}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "").slice(0, 6);
              setAddress({ ...address, pincode: val });
            }}
          />
        </div>
      )}

      {selectedMethod && (
        <button
          onClick={handlePayNow}
          className="w-full py-3 text-white font-semibold cursor-pointer bg-green-600 rounded-md hover:opacity-90 transition"
        >
          Pay now
        </button>
      )}
    </div>
  );
}
