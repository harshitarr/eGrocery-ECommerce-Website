import React from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const CartItem = ({ title, color, quantity, price, image }) => (
  <div className="flex items-center justify-between py-4 border-b">
    <div className="flex items-center gap-4">
      <img src={image} alt={title} className="w-16 h-16 rounded object-cover" />
      <div>
        <p className="font-semibold text-lg">{title}</p>
        <p className="text-sm text-gray-500">Set : Colour: {color}</p>
      </div>
    </div>
    <div className="flex items-center gap-8">
      <div className="flex items-center border rounded px-2 py-1">
        <button className="px-2">-</button>
        <span className="px-2">{quantity}</span>
        <button className="px-2">+</button>
      </div>
      <div className="font-semibold text-lg">${price}</div>
      <Trash2 className="cursor-pointer text-red-500" />
    </div>
  </div>
);

export default function ShoppingCart() {
  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
        <CartItem
          title="Furniture Set"
          color="Coffee"
          quantity={4}
          price={437}
          image="/products/furniture.png"
        />
        <CartItem
          title="Vintage Dining Set"
          color="Brown"
          quantity={2}
          price={945}
          image="/products/dining.png"
        />
        <CartItem
          title="Studio Chair"
          color="Deep Green"
          quantity={7}
          price={597}
          image="/products/chair.png"
        />
      </div>

      <div className="bg-gray-100 p-6 rounded-xl shadow-md h-fit">
        <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Discount voucher"
            className="w-full border rounded px-4 py-2 mb-2"
          />
          <Button className="w-full">Apply</Button>
        </div>
        <div className="space-y-2 mb-4">
          <div className="flex justify-between">
            <span>Sub Total</span>
            <span>2,000 USD</span>
          </div>
          <div className="flex justify-between">
            <span>Discount (10%)</span>
            <span>-1,000 USD</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery fee</span>
            <span>50 USD</span>
          </div>
        </div>
        <div className="flex justify-between font-bold text-lg mb-4">
          <span>Total</span>
          <span>1,850 USD</span>
        </div>
        <p className="text-sm text-gray-500 mb-4">
          90 Day Limited Warranty against manufacturer's defects
        </p>
        <Button className="w-full text-white bg-black hover:bg-gray-900">
          Checkout Now
        </Button>
      </div>
    </div>
  );
}
