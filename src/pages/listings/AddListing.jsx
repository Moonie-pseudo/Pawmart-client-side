import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-hot-toast";

export default function AddListing() {
  const { user } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("Pets");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !category || !location || !description || !image || !date) {
      return toast.error("Please fill all fields");
    }

    const newListing = {
      id: Date.now(), // unique id
      name,
      category,
      price: category === "Pets" ? 0 : Number(price),
      location,
      description,
      image,
      date,
      email: user?.email || "",
    };

    // Get existing listings from localStorage
    const existingListings = JSON.parse(localStorage.getItem("listings")) || [];
    localStorage.setItem("listings", JSON.stringify([newListing, ...existingListings]));

    toast.success("Listing added successfully!");

    // Reset form
    setName("");
    setCategory("Pets");
    setPrice("");
    setLocation("");
    setDescription("");
    setImage("");
    setDate("");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-24">
      <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-black">
          Add New Listing
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Product/Pet Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-400 focus:outline-none"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-400 focus:outline-none"
          >
            <option value="Pets">Pets</option>
            <option value="Pet Food">Pet Food</option>
            <option value="Accessories">Accessories</option>
            <option value="Pet Care Products">Care Products</option>
          </select>

          {category !== "Pets" && (
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-400 focus:outline-none"
            />
          )}

          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-400 focus:outline-none"
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-400 focus:outline-none"
          ></textarea>

          <input
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-400 focus:outline-none"
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-400 focus:outline-none"
          />

          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
          />

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded transition"
          >
            Add Listing
          </button>
        </form>
      </div>
    </div>
  );
}
