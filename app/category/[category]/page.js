import connectMongo from '@/utils/connectMongo';
import ProductModel from '@/models/product'; // adjust if your model name is different
import Link from 'next/link';

export default async function CategoryPage({ params }) {
  const { category } = params;

  await connectMongo();

  const products = await ProductModel.find({ category }).lean();

  return (
    <section className="px-6 py-10  mt-20 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 capitalize">
        {category} 
      </h2>

      {products.length === 0 ? (
        <p className="text-gray-600">No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link key={product._id} href={`/product/${product._id}`}>
              <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-4 cursor-pointer">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-contain mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                <p className="text-sm text-gray-500 mb-1">{product.weight}</p>
                <p className="text-md text-green-600 font-bold">₹{product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
