import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-hot-toast";

export default function ListingDetails() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [listing, setListing] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Order form states
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [quantity, setQuantity] = useState(1); // new state for quantity

  // Fetch the listing by id
  useEffect(() => {
    const fetchListing = async () => {
      const storedListings = JSON.parse(localStorage.getItem("listings")) || [];
      let foundListing = storedListings.find((l) => l.id === Number(id));

      if (!foundListing) {
        try {
          const res = await fetch("/listings.json");
          const data = await res.json();
          foundListing = data.find((l) => l.id === Number(id));
        } catch (err) {
          console.error("Error fetching listings:", err);
        }
      }

      setListing(foundListing || null);

      // Set initial quantity
      if (foundListing) {
        setQuantity(foundListing.category === "Pets" ? 1 : 1);
      }
    };

    fetchListing();
  }, [id]);

  if (!listing) return <p className="text-center mt-10">Listing not found.</p>;

  // Handle Order Submission
  const handleOrder = (e) => {
    e.preventDefault();

    if (!address || !date || !phone) {
      return toast.error("Please fill all required fields");
    }

    const newOrder = {
      id: Date.now(),
      productId: listing.id,
      productName: listing.name,
      buyerName: user?.displayName || "",
      email: user?.email || "",
      quantity: listing.category === "Pets" ? 1 : quantity,
      price: listing.price,
      address,
      date,
      phone,
      additionalNotes: notes,
    };

    // Save to localStorage
    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    localStorage.setItem(
      "orders",
      JSON.stringify([newOrder, ...existingOrders])
    );

    toast.success("Order placed successfully!");
    setShowModal(false);

    // Reset form
    setAddress("");
    setDate("");
    setPhone("");
    setNotes("");
    if (listing.category !== "Pets") setQuantity(1);
  };

  return (
    <div className="min-h-[80vh] py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={listing.image}
            alt={listing.name}
            className="w-full md:w-1/2 h-64 object-cover rounded"
          />
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-4 text-black">
              {listing.name}
            </h2>
            <p className="text-gray-600 mb-2">Category: {listing.category}</p>
            <p className="text-gray-600 mb-2">Owner's Email: {listing.email}</p>
            <p className="text-gray-600 mb-2">
              Price: {listing.price ? `$${listing.price}` : "Free for Adoption"}
            </p>
            <p className="text-gray-600 mb-2">Location: {listing.location}</p>
            <p className="text-gray-600 mb-4">{listing.description}</p>

            <button
              onClick={() => setShowModal(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded transition"
            >
              🛒 Adopt / Order Now
            </button>
          </div>
        </div>
      </div>

      {/* Order Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 overflow-y-auto">
          <div className="min-h-screen flex items-center justify-center p-4">
            <div className="bg-white rounded-lg w-full max-w-md p-6 relative overflow-y-auto max-h-[90vh]">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 font-bold text-xl"
              >
                &times;
              </button>

              <h3 className="text-2xl font-bold mb-4 text-black">
                Place Your Order
              </h3>

              <form onSubmit={handleOrder} className="space-y-3">
                <input
                  type="text"
                  value={user?.displayName || ""}
                  readOnly
                  placeholder="Buyer Name"
                  className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
                />
                <input
                  type="email"
                  value={user?.email || ""}
                  readOnly
                  placeholder="Email"
                  className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
                />
                <input
                  type="text"
                  value={listing.id}
                  readOnly
                  placeholder="Product ID"
                  className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
                />
                <input
                  type="text"
                  value={listing.name}
                  readOnly
                  placeholder="Product Name"
                  className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
                />
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  placeholder="Quantity"
                  className={`w-full p-2 border rounded ${
                    listing.category === "Pets"
                      ? "bg-gray-100 cursor-not-allowed"
                      : ""
                  }`}
                  readOnly={listing.category === "Pets"}
                  min={1}
                />
                <input
                  type="text"
                  value={listing.price}
                  readOnly
                  placeholder="Price"
                  className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
                />
                <input
                  type="text"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-2 border rounded"
                />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2 border rounded"
                />
                <textarea
                  placeholder="Additional Notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-2 border rounded"
                ></textarea>

                <button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded transition"
                >
                  Place Order
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
