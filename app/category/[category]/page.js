import connectMongo from '@/utils/connectMongo';
import ProductModel from '@/models/product';
import ProductCard from '@/components/ProductCard';

export default async function CategoryPage({ params }) {
  const { category } = params;

  await connectMongo();

  const rawProducts = await ProductModel.find({ category }).lean();


  const products = rawProducts.map((product) => ({
    ...product,
    _id: product._id.toString(),
  }));

  return (
    <section className="px-6 py-10 mt-20 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 capitalize">
        {category}
      </h2>

      {products.length === 0 ? (
        <p className="text-gray-600">No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
