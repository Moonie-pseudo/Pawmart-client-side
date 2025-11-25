import { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, setUser } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-orange-500">PawMart</Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-orange-500 font-semibold" : "text-gray-700 hover:text-orange-400"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/pets-supplies"
              className={({ isActive }) =>
                isActive ? "text-orange-500 font-semibold" : "text-gray-700 hover:text-orange-400"
              }
            >
              Pets & Supplies
            </NavLink>

            {user ? (
              <>
                <NavLink
                  to="/add-listing"
                  className={({ isActive }) =>
                    isActive ? "text-orange-500 font-semibold" : "text-gray-700 hover:text-orange-400"
                  }
                >
                  Add Listing
                </NavLink>
                <NavLink
                  to="/my-listings"
                  className={({ isActive }) =>
                    isActive ? "text-orange-500 font-semibold" : "text-gray-700 hover:text-orange-400"
                  }
                >
                  My Listings
                </NavLink>
                <NavLink
                  to="/my-orders"
                  className={({ isActive }) =>
                    isActive ? "text-orange-500 font-semibold" : "text-gray-700 hover:text-orange-400"
                  }
                >
                  My Orders
                </NavLink>
                <div className="relative">
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center space-x-2 focus:outline-none"
                  >
                    <img
                      src={user.photoURL || "https://i.pravatar.cc/40"}
                      alt="Profile"
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-gray-700 font-medium">{user.displayName || "User"}</span>
                  </button>
                  {isOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg py-2 z-50">
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? "text-orange-500 font-semibold" : "text-gray-700 hover:text-orange-400"
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    isActive ? "text-orange-500 font-semibold" : "text-gray-700 hover:text-orange-400"
                  }
                >
                  Register
                </NavLink>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-300 p-2 rounded"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <NavLink
            to="/"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/pets-supplies"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            Pets & Supplies
          </NavLink>
          {user ? (
            <>
              <NavLink
                to="/add-listing"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                Add Listing
              </NavLink>
              <NavLink
                to="/my-listings"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                My Listings
              </NavLink>
              <NavLink
                to="/my-orders"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                My Orders
              </NavLink>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
