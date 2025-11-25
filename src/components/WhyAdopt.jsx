import React from "react";
import { FaPaw, FaHeart, FaHome, FaSmile } from "react-icons/fa";

export default function WhyAdopt() {
  const reasons = [
    {
      icon: <FaHeart className="text-orange-500 text-4xl" />,
      title: "Give a Pet a Second Chance",
      text: "Thousands of pets wait for a loving home. Your adoption can change their life forever.",
    },
    {
      icon: <FaHome className="text-orange-500 text-4xl" />,
      title: "Reduce Homeless Pets",
      text: "Adopting helps reduce the overpopulation of stray animals in Bangladesh.",
    },
    {
      icon: <FaPaw className="text-orange-500 text-4xl" />,
      title: "Save Money",
      text: "Most adopted pets come vaccinated and trained—saving you cost and effort.",
    },
    {
      icon: <FaSmile className="text-orange-500 text-4xl" />,
      title: "Make a Lifelong Friend",
      text: "Adopted pets are loyal, grateful, and form deep emotional bonds with their owners.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">

        <h2 className="text-3xl md:text-4xl font-bold text-center text-black mb-10">
          Why Adopt from <span className="text-orange-500">PawMart?</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {reasons.map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 rounded-2xl shadow-md hover:shadow-lg transition text-center"
            >
              <div className="flex justify-center mb-4">{item.icon}</div>
              <h3 className="font-semibold text-xl mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.text}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
