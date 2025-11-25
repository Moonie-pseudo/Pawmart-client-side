// src/pages/myListings/MyListings.jsx
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-hot-toast";

export default function MyListings() {
  const { user } = useContext(AuthContext);

  const [listings, setListings] = useState([]);
  const [selectedListing, setSelectedListing] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Form states for updating
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  // Fetch user's listings from localStorage
  useEffect(() => {
    const allListings = JSON.parse(localStorage.getItem("listings")) || [];
    const userListings = allListings.filter(
      (listing) => listing.email === user?.email
    );
    setListings(userListings);
  }, [user]);

  // Open update modal and fill form with selected listing data
  const handleEdit = (listing) => {
    setSelectedListing(listing);
    setName(listing.name);
    setCategory(listing.category);
    setPrice(listing.price);
    setLocation(listing.location);
    setDescription(listing.description);
    setImage(listing.image);
    setShowUpdateModal(true);
  };

  // Save updates
  const handleUpdate = (e) => {
    e.preventDefault();

    const allListings = JSON.parse(localStorage.getItem("listings")) || [];
    const updatedListings = allListings.map((l) =>
      l.id === selectedListing.id
        ? { ...l, name, category, price, location, description, image }
        : l
    );

    localStorage.setItem("listings", JSON.stringify(updatedListings));
    setListings(updatedListings.filter((l) => l.email === user?.email));

    toast.success("Listing updated successfully!");
    setShowUpdateModal(false);
  };

  // Delete a listing
  const handleDelete = () => {
    const allListings = JSON.parse(localStorage.getItem("listings")) || [];
    const updatedListings = allListings.filter(
      (l) => l.id !== selectedListing.id
    );

    localStorage.setItem("listings", JSON.stringify(updatedListings));
    setListings(updatedListings.filter((l) => l.email === user?.email));
    toast.success("Listing deleted successfully!");
    setShowDeleteModal(false);
  };

  return (
    <div className="min-h-[80vh] py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto p-4 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-black">My Listings</h2>

        {listings.length === 0 ? (
          <p className="text-gray-600">You have no listings.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2 text-left">Image</th>
                  <th className="border px-4 py-2 text-left">Name</th>
                  <th className="border px-4 py-2 text-left">Category</th>
                  <th className="border px-4 py-2 text-left">Price</th>
                  <th className="border px-4 py-2 text-left">Location</th>
                  <th className="border px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {listings.map((listing) => (
                  <tr key={listing.id} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">
                      <img
                        src={listing.image}
                        alt={listing.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>
                    <td className="border px-4 py-2">{listing.name}</td>
                    <td className="border px-4 py-2">{listing.category}</td>
                    <td className="border px-4 py-2">
                      {listing.price ? `$${listing.price}` : "Free"}
                    </td>
                    <td className="border px-4 py-2">{listing.location}</td>
                    <td className="border px-4 py-2 space-x-2">
                      <button
                        onClick={() => handleEdit(listing)}
                        className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => {
                          setSelectedListing(listing);
                          setShowDeleteModal(true);
                        }}
                        className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Update Modal */}
      {showUpdateModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-6 relative overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setShowUpdateModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 font-bold text-xl"
            >
              &times;
            </button>
            <h3 className="text-2xl font-bold mb-4 text-black">Update Listing</h3>
            <form onSubmit={handleUpdate} className="space-y-3">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full p-2 border rounded"
              />
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border rounded"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded transition"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-sm p-6 relative">
            <button
              onClick={() => setShowDeleteModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 font-bold text-xl"
            >
              &times;
            </button>
            <h3 className="text-xl font-bold mb-4 text-black">
              Confirm Delete
            </h3>
            <p className="mb-4">
              Are you sure you want to delete <strong>{selectedListing?.name}</strong>?
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
              >
                Delete
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-300 hover:bg-gray-400 py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
