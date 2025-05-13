import connectMongo from '@/utils/connectMongo';
import Category from '@/models/category';

export async function GET() {
  try {
    await connectMongo();

    const categories = await Category.find();
    return Response.json(categories);
  } catch (error) {
    return Response.json({ error: 'Error fetching categories' }, { status: 500 });
  }
}
