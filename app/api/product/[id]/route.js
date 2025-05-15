import connectMongo from '@/utils/connectMongo';
import Product from '@/models/product';
import mongoose from 'mongoose';

export async function GET(req, { params }) {
  await connectMongo();

 
  if (!mongoose.Types.ObjectId.isValid(params.id)) {
    return Response.json({ error: 'Invalid Product ID format' }, { status: 400 });
  }

  try {
    const product = await Product.findById(params.id);
    if (!product) {
      return Response.json({ error: 'Product not found' }, { status: 404 });
    }

    return Response.json({ product }, { status: 200 });
  } catch (err) {
    console.error(err); 
    return Response.json({ error: 'Error fetching product' }, { status: 500 });
  }
}
