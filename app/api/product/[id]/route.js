import connectMongo from '@/utils/connectMongo'; // your DB connection logic
import Product from '@/models/product'; // your Mongoose model
import mongoose from 'mongoose';

export async function GET(req, { params }) {
  await connectMongo();

  // Validate ObjectId format before querying DB
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
    console.error(err); // Log the error for debugging
    return Response.json({ error: 'Error fetching product' }, { status: 500 });
  }
}
