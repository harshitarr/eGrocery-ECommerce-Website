"use client";

import React, { useEffect, useState } from 'react';
import { ShoppingCart, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function PopularProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/popular');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (product) => {
    try {
      const res = await fetch('/api/cart', {
        method: 'POST',
        body: JSON.stringify({
          productId: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
        }),
      });

      const data = await res.json();
      alert(data.message);
    } catch (err) {
      console.error('Error adding to cart:', err);
      alert('Something went wrong!');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <section className="px-6 py-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-[#1e1e1e]">Popular Products</h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {Array.isArray(products) &&
          products.map((product, idx) => (
            <Link key={idx} href={`/popularproduct/${product._id}`} className="group">
              <div className="bg-white border rounded-xl shadow hover:shadow-md transition duration-200 flex flex-col justify-between cursor-pointer">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-70 h-50 mx-auto object-contain"
                />

                <div className="relative bg-gray-100 px-4 py-4 rounded-br-xl rounded-bl-xl">
                  <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                  <p className="text-md text-gray-500 flex items-center gap-1">
                    Weight: {product.weight}
                  </p>
                  <p className="text-lg text-green-500 font-bold mt-1">₹{product.price}</p>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddToCart(product);
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
