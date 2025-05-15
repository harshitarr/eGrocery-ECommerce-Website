"use client";

import React, { useEffect, useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';

export default function PopularBundle() {
  const [bundles, setBundles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBundles = async () => {
      try {
        const res = await fetch('/api/bundle');
        let data = await res.json();

       
        data = data.map(bundle => ({
          ...bundle,
          _id: bundle._id?.toString?.() ?? bundle._id,
        }));

        setBundles(data);
      } catch (err) {
        console.error('Error fetching bundles:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBundles();
  }, []);

  const handleAddToCart = async (bundle) => {
    try {
      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: bundle._id, 
          name: bundle.name,
          price: bundle.price,
          image: bundle.image,
        }),
      });

      const data = await res.json();
      alert(data.message); 
    } catch (err) {
      console.error('Error adding to cart:', err);
      alert('Something went wrong!');
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <section className="px-6 py-10 bg-[#c8f0d2] mt-20">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-[#1e1e1e]">Popular Bundle</h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-6">
        {bundles.map((bundle) => (
          <Link key={bundle._id} href={`/bundle/${bundle._id}`}>
            <div className="bg-white border rounded-xl shadow hover:shadow-md transition duration-200 flex flex-col justify-between cursor-pointer">
              <img
                src={bundle.image}
                alt={bundle.name}
                className="w-70 h-50 mx-auto object-contain"
              />
              <div className="relative bg-gray-100 px-4 py-4 rounded-br-xl rounded-bl-xl">
                <h3 className="text-xl font-semibold text-gray-800">{bundle.name}</h3>
                <p className="text-md text-gray-500">{bundle.weight}</p>
                <p className="text-lg text-green-500 font-bold mt-1">₹{bundle.price}</p>
                <button
                  onClick={(e) => {
                    e.preventDefault(); 
                    handleAddToCart(bundle);
                  }}
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
