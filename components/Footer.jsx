export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 py-10 mt-12">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-8 text-sm">
        <div>
          <h4 className="font-semibold text-lg mb-3">About</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Our Story</a></li>
            <li><a href="#" className="hover:underline">Careers</a></li>
            <li><a href="#" className="hover:underline">News</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-lg mb-3">Delivery</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">How It Works</a></li>
            <li><a href="#" className="hover:underline">Delivery Zones</a></li>
            <li><a href="#" className="hover:underline">Returns</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-lg mb-3">Contact</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Support Center</a></li>
            <li><a href="#" className="hover:underline">Email Us</a></li>
            <li><a href="#" className="hover:underline">Live Chat</a></li>
          </ul>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 mt-8">
        @ eGrocery. All rights reserved.
      </div>
    </footer>
  );
}
