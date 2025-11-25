// src/pages/pets-supplies/PetsSupplies.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function PetsSupplies() {
  const [listings, setListings] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fetchListings = async () => {
      try {
        // 1️⃣ Get listings from localStorage
        const storedListings = JSON.parse(localStorage.getItem("listings")) || [];

        // 2️⃣ Fetch listings.json from public folder
        const res = await fetch("/listings.json");
        if (!res.ok) throw new Error("Failed to fetch JSON");
        const data = await res.json();

        // 3️⃣ Merge localStorage listings with fetched JSON
        setListings([...storedListings, ...data]);
      } catch (err) {
        console.error("Error fetching listings:", err);
      
        setListings(JSON.parse(localStorage.getItem("listings")) || []);
      }
    };

    fetchListings();
  }, []);

  // Filtered listings based on category
  const filteredListings =
    filter === "All"
      ? listings
      : listings.filter((listing) => listing.category === filter);

  return (
    <div className="min-h-[80vh] py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center text-black">
          Pets & Supplies
        </h2>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 mb-8 flex-wrap">
          {["All", "Pets", "Pet Food", "Accessories", "Pet Care Products"].map(
            (cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full font-semibold transition ${
                  filter === cat
                    ? "bg-orange-500 text-white"
                    : "bg-white border border-gray-300 hover:bg-gray-100"
                }`}
              >
                {cat}
              </button>
            )
          )}
        </div>

        {/* Listings Grid */}
        {filteredListings.length === 0 ? (
          <p className="text-center text-gray-600">No listings found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredListings.map((listing) => (
              <div
                key={listing.id}
                className="bg-white shadow-md rounded-lg overflow-hidden"
              >
                <img
                  src={listing.image}
                  alt={listing.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {listing.name}
                  </h3>
                  <p className="text-gray-600 mb-1">
                    Category: {listing.category}
                  </p>
                  <p className="text-gray-600 mb-1">
                    Price: {listing.price
                      ? `$${listing.price}`
                      : "Free for Adoption"}
                  </p>
                  <p className="text-gray-600 mb-2">
                    Location: {listing.location}
                  </p>
                  <Link
                    to={`/listing-details/${listing.id}`}
                    className="inline-block w-full text-center bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded transition"
                  >
                    See Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
