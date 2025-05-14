"use client";
import { useState, useEffect } from "react";

const paymentMethods = [
  { id: "mastercard", src: "mc.png", alt: "MasterCard" },
  { id: "cod", src: "COD.jpg", alt: "Cash on Delivery" },
  { id: "paypal", src: "paypal.png", alt: "PayPal" },
];

export default function PayNowPage() {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [cardDetails, setCardDetails] = useState({
    name: "",
    number: "",
    exp: "",
    cvc: "",
  });
  const [address, setAddress] = useState("");
  const [paymentDone, setPaymentDone] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedItems = localStorage.getItem("cartItems");
    const storedTotal = localStorage.getItem("cartTotal");

    if (storedItems && storedTotal) {
      setCartItems(JSON.parse(storedItems));
      setTotal(Number(storedTotal));
    }
  }, []);

  const validatePaymentDetails = () => {
    if (!selectedMethod) {
      setErrorMessage("Please select a payment method.");
      return false;
    }

    if (selectedMethod === "mastercard") {
      if (
        !cardDetails.name ||
        !cardDetails.number ||
        !cardDetails.exp ||
        !cardDetails.cvc
      ) {
        setErrorMessage("Please fill in all card details.");
        return false;
      }
    }

    if (selectedMethod === "cod" && !address) {
      setErrorMessage("Please enter your delivery address.");
      return false;
    }

    setErrorMessage("");
    return true;
  };

  const handleSubmitPayment = async () => {
    if (!validatePaymentDetails()) {
      return;
    }

    setLoading(true);

    const paymentData = {
      method: selectedMethod,
      productName: cartItems[0]?.name,
      productId: cartItems[0]?._id,
      price: total,
      cardDetails,
      address,
    };

    try {
      const res = await fetch("/api/send-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
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

      {/* Cart summary */}
      <div className="text-sm text-gray-700 space-y-2">
        <h3 className="font-semibold text-gray-800 mb-2">Order Summary:</h3>
        {cartItems.map((item) => (
          <div key={item._id} className="flex justify-between">
            <span>{item.name}</span>
            <span>₹{(item.quantity || 1) * item.price}</span>
          </div>
        ))}
        <div className="border-t pt-2 mt-2 flex justify-between font-bold text-base">
          <span>Total</span>
          <span>₹{total}</span>
        </div>
      </div>

      {/* Conditional form section */}
      {selectedMethod === "mastercard" && (
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Cardholder name"
            value={cardDetails.name}
            onChange={(e) =>
              setCardDetails({ ...cardDetails, name: e.target.value })
            }
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Card number"
            value={cardDetails.number}
            onChange={(e) =>
              setCardDetails({ ...cardDetails, number: e.target.value })
            }
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Expiration date"
              value={cardDetails.exp}
              onChange={(e) =>
                setCardDetails({ ...cardDetails, exp: e.target.value })
              }
              className="w-1/2 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              placeholder="CVC"
              value={cardDetails.cvc}
              onChange={(e) =>
                setCardDetails({ ...cardDetails, cvc: e.target.value })
              }
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
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full h-24 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      )}

      {/* Error message */}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      {/* Pay Now button */}
      {selectedMethod && (
        <button
          onClick={handleSubmitPayment}
          disabled={loading}
          className="w-full py-3 text-white font-semibold bg-gradient-to-r from-purple-500 to-blue-500 rounded-md hover:opacity-90 transition"
        >
          {loading ? "Processing..." : "Pay now"}
        </button>
      )}
    </div>
  );
}
