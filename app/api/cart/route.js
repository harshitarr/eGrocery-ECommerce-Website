import { NextResponse } from 'next/server';
import connectMongo from '@/utils/connectMongo';
import Cart from '@/models/cart';

// GET - Fetch all cart items
export async function GET() {
  try {
    await connectMongo();
    const items = await Cart.find();
    return NextResponse.json(items);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: 'Failed to fetch cart items' }, { status: 500 });
  }
}

// POST - Add new item to cart
export async function POST(request) {
  try {
    await connectMongo();
    const body = await request.json();

    const { productId, name, price, image } = body;

    const newCartItem = new Cart({ productId, name, price, image });
    await newCartItem.save();

    return NextResponse.json({ success: true, message: 'Added to cart' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: 'Error adding to cart' }, { status: 500 });
  }
}
