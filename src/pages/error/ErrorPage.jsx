// src/pages/error/ErrorPage.jsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  // Set dynamic page title
  useEffect(() => {
    document.title = "404 - Page Not Found | PawMart";
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="text-6xl font-bold text-orange-500 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6 text-black">Page Not Found</h2>
      <p className="text-gray-600 mb-6 text-center">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded font-semibold transition"
      >
        Go to Home
      </Link>
    </div>
  );
}
