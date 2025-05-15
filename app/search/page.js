import connectMongo from '@/utils/connectMongo';
import ProductModel from '@/models/product';
import PopularModel from '@/models/popularproductmodel';
import BundleModel from '@/models/popularbundle';
import ProductCard from '@/components/ProductCard';
import Fuse from 'fuse.js';

export default async function SearchPage({ searchParams }) {
  const query = searchParams?.query?.trim() || '';

  await connectMongo();

  const [products, populars, bundles] = await Promise.all([
    ProductModel.find({}).lean(),
    PopularModel.find({}).lean(),
    BundleModel.find({}).lean(),
  ]);

  // Convert _id to string and mark source
  const safeMap = (items, source) =>
    items.map((item) => ({
      ...item,
      _id: item._id.toString(),
      source,
    }));

  const allItems = [
    ...safeMap(products, 'product'),
    ...safeMap(populars, 'popular'),
    ...safeMap(bundles, 'bundle'),
  ];

  // Fuse.js config
  const fuse = new Fuse(allItems, {
    keys: ['name', 'category', 'type'],
    threshold: 0.4,
  });

  const fuzzyResults = query ? fuse.search(query).map((res) => res.item) : allItems;

  return (
    <section className="px-6 py-10 mt-20 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 capitalize">
        Search Results for "{query}"
      </h2>

      {fuzzyResults.length === 0 ? (
        <p className="text-gray-600">No products found matching your search.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {fuzzyResults.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
