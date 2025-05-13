import connectMongo from '@/utils/connectMongo';
import PopularModel from '@/models/popularproductmodel';

export async function GET() {
  try {
    await connectMongo();
    const products = await PopularModel.find({}); 
    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch products' }), { status: 500 });
  }
}
