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
    cvc: "",
  });
  const [address, setAddress] = useState({
    line: "",
    city: "",
    state: "",
    pincode: "",
  });
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
      const { name, number, cvc } = cardDetails;

      if (!name || !number || !cvc) {
        setErrorMessage("Please fill in all card details.");
        return false;
      }

      if (!/^\d{16}$/.test(number)) {
        setErrorMessage("Card number must be 16 digits.");
        return false;
      }

      if (!/^\d{3}$/.test(cvc)) {
        setErrorMessage("CVC must be a 3-digit number.");
        return false;
      }
    }

    if (selectedMethod === "cod") {
      const { line, city, state, pincode } = address;

      if (!line || !city || !state || !pincode) {
        setErrorMessage("Please fill in all address fields.");
        return false;
      }

      if (!/^\d{6}$/.test(pincode)) {
        setErrorMessage("Pincode must be a 6-digit number.");
        return false;
      }
    }

    setErrorMessage("");
    return true;
  };

  const handleSubmitPayment = async () => {
    if (!validatePaymentDetails()) return;

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
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "");
              setCardDetails({ ...cardDetails, number: val });
            }}
            maxLength={16}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="CVC"
            value={cardDetails.cvc}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "");
              setCardDetails({ ...cardDetails, cvc: val });
            }}
            maxLength={3}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      )}

      {selectedMethod === "paypal" && (
        <div className="text-center">
          <p className="text-gray-700 mb-2">Scan this QR to Pay with PayPal</p>
          <img src="qr.png" alt="PayPal QR" className="mx-auto h-40" />
        </div>
      )}

      {selectedMethod === "cod" && (
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Address Line"
            value={address.line}
            onChange={(e) =>
              setAddress({ ...address, line: e.target.value })
            }
            className="w-full border rounded-md px-3 py-2"
          />
          <input
            type="text"
            placeholder="City"
            value={address.city}
            onChange={(e) =>
              setAddress({ ...address, city: e.target.value })
            }
            className="w-full border rounded-md px-3 py-2"
          />
          <input
            type="text"
            placeholder="State"
            value={address.state}
            onChange={(e) =>
              setAddress({ ...address, state: e.target.value })
            }
            className="w-full border rounded-md px-3 py-2"
          />
          <input
            type="text"
            placeholder="Pincode"
            value={address.pincode}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "");
              setAddress({ ...address, pincode: val });
            }}
            maxLength={6}
            className="w-full border rounded-md px-3 py-2"
          />
        </div>
      )}

      
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      
      {selectedMethod && (
        <button
          onClick={handleSubmitPayment}
          disabled={loading}
          className="w-full py-3 text-white font-semibold cursor-pointer bg-green-600 rounded-md hover:opacity-90 transition"
        >
          {loading ? "Processing..." : "Pay now"}
        </button>
      )}
    </div>
  );
}
