import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function RecentListings() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    
    fetch("/listings.json")
      .then((res) => res.json())
      .then((data) => {
       
        const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date));
      
        setListings(sorted.slice(0, 6));
      })
      .catch((err) => console.error("Failed to load listings:", err));
  }, []);

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-black">
          Recent Listings
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {listings.map((listing) => (
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
                <p className="text-gray-600 mb-1">Category: {listing.category}</p>
                <p className="text-gray-600 mb-1">
                  Price: {listing.price ? `$${listing.price}` : "Free for Adoption"}
                </p>
                <p className="text-gray-600 mb-2">Location: {listing.location}</p>
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
      </div>
    </section>
  );
}
