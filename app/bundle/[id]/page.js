import mongoose from 'mongoose';
import connectMongo from '@/utils/connectMongo';
import BundleModel from '@/models/popularbundle';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import AddToCartButton from './AddToCartButton';

export default async function ProductDetailPage({ params }) {
  const id = decodeURIComponent(params.id);

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return <div className="text-center mt-10 text-red-600">Invalid product ID</div>;
  }

  await connectMongo();

  const product = await BundleModel.findById(id).lean();

  if (!product) notFound();

  // Convert _id (ObjectId) to string before passing as props
  const productId = product._id.toString();

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
            <p className="text-sm text-gray-600 mt-4">Items in Pack: <strong>{product.qantity}</strong></p>
            <p className="text-sm text-gray-600 mt-4">Weight: <strong>{product.weight}</strong></p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="text-3xl font-semibold text-gray-800">₹{product.price}</span>

            {/* Update the link to point to /paynow/[productId] */}
            <Link href={`/paynow/${product._id}?type=bundle`}>
              <button className="bg-green-500 text-white px-4 py-2 sm:px-6 sm:py-2 text-sm sm:text-base rounded-md hover:bg-green-600 transition">
                BUY NOW
              </button>
            </Link>

            <AddToCartButton
              productId={productId}  
              name={product.name}
              price={product.price}
              image={product.image}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
