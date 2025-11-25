import { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, setUser } = useContext(AuthContext);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setIsProfileOpen(false);
  };

  const navLinksBeforeLogin = [
    { name: "Home", path: "/" },
    { name: "Pets & Supplies", path: "/pets-supplies" },
  ];

  const navLinksAfterLogin = [
    { name: "Home", path: "/" },
    { name: "Pets & Supplies", path: "/pets-supplies" },
    { name: "Add Listing", path: "/add-listing" },
    { name: "My Listings", path: "/my-listings" },
    { name: "My Orders", path: "/my-orders" },
  ];

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* Left: Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-orange-500">
              PawMart
            </Link>
          </div>

          {/* Middle: Navigation Links */}
          <div className="hidden md:flex md:space-x-6">
            {(user ? navLinksAfterLogin : navLinksBeforeLogin).map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-orange-500 font-semibold"
                    : "text-gray-700 hover:text-orange-400"
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Right: Auth Buttons / Profile */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {!user ? (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive
                      ? "text-orange-500 font-semibold"
                      : "text-gray-700 hover:text-orange-400"
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    isActive
                      ? "text-orange-500 font-semibold"
                      : "text-gray-700 hover:text-orange-400"
                  }
                >
                  Register
                </NavLink>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <img
                    src={user.photoURL || "https://i.pravatar.cc/40"}
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-gray-700 font-medium">
                    {user.displayName || "User"}
                  </span>
                </button>
                {isProfileOpen && (
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
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="text-gray-700 hover:text-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-300 p-2 rounded"
              aria-label="Toggle Menu"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileOpen ? (
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
      {isMobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          {(user ? navLinksAfterLogin : navLinksBeforeLogin).map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              onClick={() => setIsMobileOpen(false)}
            >
              {link.name}
            </NavLink>
          ))}

          {!user ? (
            <>
              <NavLink
                to="/login"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => setIsMobileOpen(false)}
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => setIsMobileOpen(false)}
              >
                Register
              </NavLink>
            </>
          ) : (
            <button
              onClick={() => {
                handleLogout();
                setIsMobileOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
