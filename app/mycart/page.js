
import mongoose from 'mongoose';
import connectMongo from '@/utils/connectMongo';
import CartModel from '@/models/cart';
import { Trash2 } from "lucide-react";

const CartItem = ({ title, quantity, price, image }) => (
  <div className="flex items-center justify-between py-4 border-b">
    <div className="flex items-center gap-4">
      <img src={image} alt={title} className="w-16 h-16 rounded object-cover" />
      <div>
        <p className="font-semibold text-lg">{title}</p>
      </div>
    </div>
    <div className="flex items-center gap-8">

      <div className="font-semibold text-lg">₹{price}</div>
      <Trash2 className="cursor-pointer text-red-500" />
    </div>
  </div>
);

export default async function ShoppingCartPage() {
  await connectMongo();

  const items = await CartModel.find().lean();

  const total = items.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);

  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>

        {items.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          items.map((item) => (
            <CartItem
              key={item._id}
              title={item.name}
              quantity={item.quantity || 1}
              price={item.price}
              image={item.image}
            />
          ))
        )}
      </div>


<div className="bg-gray-100 p-6 rounded-xl shadow-md h-fit">
  <h3 className="text-xl font-semibold mb-4">Order Summary</h3>

  <div className="space-y-2 mb-4">
    {items.map((item) => (
      <div key={item._id} className="flex justify-between text-sm">
        <div>
          <p className="font-medium">{item.name}</p>

        </div>
        <div className="font-medium">
          ₹{(item.quantity || 1) * item.price}
        </div>
      </div>
    ))}
  </div>

  <div className="border-t pt-4 mt-4 flex justify-between font-bold text-lg mb-4">
    <span>Total</span>
    <span>₹{total}</span>
  </div>

  <button className="w-full text-white bg-black py-2 rounded hover:bg-gray-900">
    BUY NOW
  </button>
</div>

    </div>
  );
}
