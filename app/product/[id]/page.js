'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import mongoose from 'mongoose';

export default function ProductDetailPage(paramPromise) {
  const { id } = use(paramPromise.params);
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [invalidId, setInvalidId] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        setInvalidId(true);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/product/${id}`);
        const data = await res.json();

        if (res.ok) {
          setProduct(data.product);
        } else {
          setInvalidId(true);
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setInvalidId(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setAdded(true);
      } else {
        alert('Failed to add to cart');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong!');
    }
  };

  if (loading) {
    return <div className="text-center mt-10 text-gray-600">Loading...</div>;
  }

  if (invalidId || !product) {
    return <div className="text-center mt-10 text-red-600">Product not found or invalid ID</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="bg-white shadow-lg rounded-lg max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
        <div className="flex flex-col items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            width={400}
            height={400}
            className="object-contain"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-800 mt-1">{product.name}</h1>

          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-600 mb-2">Description</h4>
            <pre className="text-sm text-gray-600 whitespace-pre-wrap">{product.description}</pre>
            <p className="text-sm text-gray-600 mt-4">
              Items in Pack: <strong>{product.items}</strong>
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="text-3xl font-semibold text-gray-800">₹{product.price}</span>

            <button
              className="bg-green-500 text-white px-4 py-2 sm:px-6 sm:py-2 text-sm sm:text-base rounded-md hover:bg-green-600 transition"
              onClick={() => {
                router.push(`/pay-now?productId=${product._id}&productName=${product.name}&productPrice=${product.price}`);
              }}
            >
              Buy Now
            </button>

            <button
              onClick={handleAddToCart}
              disabled={added}
              className={`text-white px-4 py-2 sm:px-6 sm:py-2 text-sm sm:text-base rounded-md transition ${
                added ? 'bg-green-700' : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              {added ? 'Done' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
