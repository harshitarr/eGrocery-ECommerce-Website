import { ShoppingCart, User, Menu } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link href='/'><div className="text-2xl font-bold text-green-600">eGrocery</div></Link>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="flex items-center w-full sm:w-[350px] border border-gray-300 rounded-md">
            <input
              type="text"
              placeholder="Search grocery"
              className="px-4 py-2 w-full h-[40px] border-none rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            <button className="bg-green-600 py-2 px-4 text-white rounded-r-md hover:bg-green-700 transition">
              Search
            </button>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <Link href='/'><button className="text-gray-700 hover:text-green-600">Home</button></Link>
          <button className="text-gray-700 hover:text-green-600">Fruits & Vegetables</button>
          <button className="text-gray-700 hover:text-green-600">Snacks & Sweets</button>
          <button className="text-gray-700 hover:text-green-600">Contact Us</button>
          <User className="cursor-pointer text-gray-700 hover:text-green-600" />
          <Link href='/mycart'><ShoppingCart className="cursor-pointer text-gray-700 hover:text-green-600" /></Link>
        </div>

        <div className="md:hidden">
          <Menu className="cursor-pointer text-gray-700 hover:text-green-600" />
        </div>
      </div>

      <div className="md:hidden px-4 pb-4 hidden">
        <button className="block w-full text-left py-2 text-gray-700 hover:text-green-600">Home</button>
        <button className="block w-full text-left py-2 text-gray-700 hover:text-green-600">Fruits & Vegetables</button>
        <button className="block w-full text-left py-2 text-gray-700 hover:text-green-600">Snacks & Sweets</button>
        <button className="block w-full text-left py-2 text-gray-700 hover:text-green-600">Contact Us</button>
        <div className="flex gap-4 mt-2">
          <User className="cursor-pointer text-gray-700 hover:text-green-600" />
          <ShoppingCart className="cursor-pointer text-gray-700 hover:text-green-600" />
        </div>
      </div>
    </nav>
  );
}
