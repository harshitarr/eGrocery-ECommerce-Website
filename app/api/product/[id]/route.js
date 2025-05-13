import connectMongo  from '@/utils/connectMongo'; // your DB connection logic
import Product from '@/models/product'; // your Mongoose model

export async function GET(req, { params }) {
  await connectMongo();

  try {
    const product = await Product.findById(params.id);
    if (!product) {
      return Response.json({ error: 'Product not found' }, { status: 404 });
    }

    return Response.json({ product }, { status: 200 });
  } catch (err) {
    return Response.json({ error: 'Invalid ID' }, { status: 400 });
  }
}
