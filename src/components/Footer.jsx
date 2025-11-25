import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white mt-10 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid md:grid-cols-3 gap-8">
        
        {/* Logo & Description */}
        <div>
          <h1 className="text-2xl font-bold text-orange-500 mb-2">PawMart</h1>
          <p className="text-gray-600">
            PawMart connects local pet owners and buyers for adoption and pet care products. Find your furry friend today!
          </p>
        </div>

        {/* Useful Links */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Useful Links</h2>
          <ul className="space-y-1">
            <li>
              <Link to="/" className="text-gray-600 hover:text-orange-500">Home</Link>
            </li>
            <li>
              <Link to="/pets-supplies" className="text-gray-600 hover:text-orange-500">Pets & Supplies</Link>
            </li>
            <li>
              <Link to="/login" className="text-gray-600 hover:text-orange-500">Login</Link>
            </li>
            <li>
              <Link to="/register" className="text-gray-600 hover:text-orange-500">Register</Link>
            </li>
          </ul>
        </div>

        {/* Social & Contact */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Follow Us</h2>
          <div className="flex space-x-4 mb-4">
            <a href="#" className="text-gray-600 hover:text-orange-500"><FaFacebookF /></a>
            <a href="#" className="text-gray-600 hover:text-orange-500"><FaTwitter /></a>
            <a href="#" className="text-gray-600 hover:text-orange-500"><FaInstagram /></a>
          </div>
          <p className="text-gray-500 text-sm">
            © 2025 PawMart. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
