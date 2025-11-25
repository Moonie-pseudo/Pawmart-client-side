import React from "react";

export default function PetHeroes() {
  const heroes = [
    {
      id: 1,
      name: "Aisha & Milo",
      story:
        "Aisha adopted Milo after finding him injured. Now Milo is healthy, playful, and her best friend.",
      image: "/src/assets/banner3.jpg",
    },
    {
      id: 2,
      name: "Rafsan & Bella",
      story:
        "Bella was a shy rescue pup. Rafsan trained her with love — now she’s the happiest dog in the neighborhood.",
      image: "/src/assets/banner3.jpg",
    },
    {
      id: 3,
      name: "Tania & Coco",
      story:
        "Coco was abandoned as a kitten. Tania gave her a forever home, and Coco brings joy every day.",
      image: "/src/assets/banner3.jpg",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        
        <h2 className="text-3xl md:text-4xl font-bold text-center text-black mb-10">
          Meet Our <span className="text-orange-500">Pet Heroes</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {heroes.map((hero) => (
            <div
              key={hero.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden"
            >
              <img
                src={hero.image}
                alt={hero.name}
                className="w-full h-56 object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-semibold mb-2">{hero.name}</h3>
                <p className="text-gray-600 text-sm">{hero.story}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
