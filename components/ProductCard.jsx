
"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function ProductCard({ product }) {
  const handleAddToCart = async () => {
    try {
      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
        }),
      });

      const data = await res.json();
      alert(data.message);
    } catch (err) {
      console.error('Error adding to cart:', err);
      alert('Something went wrong!');
    }
  };

  return (
    <Link href={`/product/${product._id}`}>
      <div className="relative bg-white rounded-lg shadow-md hover:shadow-lg transition p-4 cursor-pointer">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-contain mb-4"
        />
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="text-sm text-gray-500 mb-1">{product.weight}</p>
        <p className="text-md text-green-600 font-bold">₹{product.price}</p>
        <button
          onClick={(e) => {
            e.preventDefault(); // prevent link navigation
            handleAddToCart();
          }}
          className="absolute bottom-4 right-4 bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition"
          aria-label="Add to cart"
        >
          <ShoppingCart size={16} />
        </button>
      </div>
    </Link>
  );
}
