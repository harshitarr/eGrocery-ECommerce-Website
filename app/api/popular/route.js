import connectMongo from '@/utils/connectMongo';
import PopularModel from '@/models/popularproductmodel';

export async function GET(req) {
  try {
    await connectMongo();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (id) {
      const product = await PopularModel.findById(id);
      if (!product) {
        return new Response(JSON.stringify({ error: 'Popular product not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({ product }), { status: 200 });
    }

    const products = await PopularModel.find({});
    return new Response(JSON.stringify(products), { status: 200 });

  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch popular products' }), { status: 500 });
  }
}
