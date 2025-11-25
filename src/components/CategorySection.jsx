import { Link } from "react-router-dom";

const categories = [
  {
    id: 1,
    name: "Pets",
    image: "/assets/category-pets.jpg",
  },
  {
    id: 2,
    name: "Pet Food",
    image: "/assets/category-food.jpg",
  },
  {
    id: 3,
    name: "Accessories",
    image: "/assets/category-accessories.jpg",
  },
  {
    id: 4,
    name: "Pet Care Products",
    image: "/assets/category-care.jpg",
  },
];

export default function CategorySection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center text-black mb-8">
        Explore Categories
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            to="/pets-supplies"
            className="group relative block rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-xl md:text-2xl font-bold text-white">
                {cat.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
