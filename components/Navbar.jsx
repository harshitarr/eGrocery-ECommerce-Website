'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingCart, User, Menu } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link href="/">
          <div className="text-2xl font-bold text-green-600 cursor-pointer">eGrocery</div>
        </Link>

        <form onSubmit={handleSearch} className="flex items-center gap-2 w-full sm:w-auto">
          <div className="flex items-center w-full sm:w-[350px] border border-gray-300 rounded-md">
            <input
              type="text"
              placeholder="Search grocery"
              className="px-4 py-2 w-full h-[40px] border-none rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-600"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="bg-green-600 py-2 px-4 text-white rounded-r-md hover:bg-green-700 transition cursor-pointer"
            >
              Search
            </button>
          </div>
        </form>

        <div className="hidden md:flex items-center gap-6">
          <Link href="/">
            <button className="text-gray-700 cursor-pointer hover:text-green-600">Home</button>
          </Link>
          <Link href="/contactus">
            <button className="text-gray-700 cursor-pointer hover:text-green-600">Contact Us</button>
          </Link>
          <Link href="/profile">
            <User className="cursor-pointer text-gray-700 hover:text-green-600" />
          </Link>
          <Link href="/mycart">
            <ShoppingCart className="cursor-pointer text-gray-700 hover:text-green-600" />
          </Link>
        </div>

        <div className="md:hidden">
          <Menu className="cursor-pointer text-gray-700 hover:text-green-600" />
        </div>
      </div>
    </nav>
  );
}
