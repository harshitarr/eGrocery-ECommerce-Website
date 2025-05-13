import { NextResponse } from 'next/server';
import connectMongo from '@/utils/connectMongo';
import Cart from '@/models/cart';

export async function POST(request) {
  try {
    await connectMongo();
    const body = await request.json();

    const { productId, name, price, image } = body;

    const newCartItem = new Cart({ productId, name, price, image });
    await newCartItem.save();

    return NextResponse.json({ success: true, message: 'Added to cart' });
  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false, message: 'Error adding to cart' }, { status: 500 });
  }
}
