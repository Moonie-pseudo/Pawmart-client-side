import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-hot-toast";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function MyOrders() {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const allOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const userOrders = allOrders.filter(
      (order) => order.email === user?.email
    );
    setOrders(userOrders);
  }, [user]);

  const downloadReport = () => {
    if (orders.length === 0) {
      toast.error("No orders to export!");
      return;
    }

    const doc = new jsPDF();

  // Title
  doc.setFontSize(16);
  doc.text("My Orders Report", 14, 16);

  // Table
  const tableColumn = [
    "Product Name",
    "Buyer Name",
    "Price",
    "Quantity",
    "Address",
    "Date",
    "Phone",
  ];

  const tableRows = orders.map((order) => [
    order.productName,
    order.buyerName,
    order.price ? `$${order.price}` : "Free",
    order.quantity,
    order.address,
    order.date,
    order.phone,
  ]);

  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 22,
    theme: "grid",
    headStyles: { fillColor: [255, 165, 0] },
    styles: { fontSize: 9 },
  });

  doc.save("my_orders_report.pdf");
};

  return (
    <div className="min-h-[80vh] py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-black">My Orders</h2>
          <button
            onClick={downloadReport}
            className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded font-semibold"
          >
            🧩 Download Report
          </button>
        </div>

        {orders.length === 0 ? (
          <p className="text-gray-600">You have no orders yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left p-2">Product</th>
                  <th className="text-left p-2">Buyer</th>
                  <th className="text-left p-2">Price</th>
                  <th className="text-left p-2">Qty</th>
                  <th className="text-left p-2">Address</th>
                  <th className="text-left p-2">Date</th>
                  <th className="text-left p-2">Phone</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-2">{order.productName}</td>
                    <td className="p-2">{order.buyerName}</td>
                    <td className="p-2">
                      {order.price ? `$${order.price}` : "Free"}
                    </td>
                    <td className="p-2">{order.quantity}</td>
                    <td className="p-2">{order.address}</td>
                    <td className="p-2">{order.date}</td>
                    <td className="p-2">{order.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
