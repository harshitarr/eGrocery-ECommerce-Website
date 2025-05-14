import connectMongo from '@/utils/connectMongo';
import ProductModel from '@/models/product';
import ProductCard from '@/components/ProductCard';

export default async function SearchPage({ searchParams }) {
  const query = searchParams?.query || '';

  await connectMongo();

  const products = await ProductModel.find({
    $or: [
      { name: { $regex: query, $options: 'i' } },
      { category: { $regex: query, $options: 'i' } },
      { type: { $regex: query, $options: 'i' } }, // 'type' must exist in the schema if you're using it
    ],
  }).lean();

  const formattedProducts = products.map((product) => ({
    ...product,
    _id: product._id.toString(),
  }));

  return (
    <section className="px-6 py-10 mt-20 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 capitalize">
        Search Results for "{query}"
      </h2>

      {formattedProducts.length === 0 ? (
        <p className="text-gray-600">No products found matching your search.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {formattedProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
