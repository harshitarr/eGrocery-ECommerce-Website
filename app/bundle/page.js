"use client"

import React, { useEffect, useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link'; // Import Link from next/link

export default function PopularBundle() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/bundle'); // ✅
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="px-6 py-10 bg-[#c8f0d2] mt-20">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-[#1e1e1e]">Popular Bundle</h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-6">
        {Array.isArray(products) &&
          products.map((product, idx) => (
            <Link key={idx} href={`/bundle/${product._id}`}>
              <div className="bg-white border rounded-xl shadow hover:shadow-md transition duration-200 flex flex-col justify-between cursor-pointer">
                <img src={product.image} alt={product.name} className="w-70 h-50 mx-auto object-contain" />
                <div className="relative bg-gray-100 px-4 py-4 rounded-br-xl rounded-bl-xl">
                  <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                  <p className="text-md text-gray-500">{product.weight}</p>
                  <p className="text-lg text-green-500 font-bold mt-1">₹{product.price}</p>
                  <button
                    className="absolute bottom-2 right-4 bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition"
                    aria-label="Add to cart"
                  >
                    <ShoppingCart size={16} />
                  </button>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </section>
  );
}
