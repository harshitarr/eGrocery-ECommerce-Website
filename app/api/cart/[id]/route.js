import { NextResponse } from 'next/server';
import connectMongo from '@/utils/connectMongo';
import Cart from '@/models/cart';

export async function DELETE(request, { params }) {
  try {
    await connectMongo();
    const { id } = params;

    await Cart.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: 'Item removed from cart' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: 'Failed to remove item' }, { status: 500 });
  }
}