import { motion } from "framer-motion";
import React from "react";

const banners = [
  {
    id: 1,
    title: "Find Your Furry Friend Today!",
    subtitle: "Adopt, Don't Shop",
    image: "/src/assets/banner1.jpg",
  },
  {
    id: 2,
    title: "Everything Your Pet Needs in One Place",
    subtitle: "Food, Toys, Accessories & More",
    image: "/src/assets/banner2.jpg",
  },
  {
    id: 3,
    title: "Happy Pets, Happy Owners",
    subtitle: "Join the PawMart Family Today",
    image: "/src/assets/banner3.jpg",
  },
];

export default function Banner() {
  const [current, setCurrent] = React.useState(0);

 
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[70vh] md:h-[80vh] w-full overflow-hidden">
      {banners.map((banner, index) => (
        <motion.div
          key={banner.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: index === current ? 1 : 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 w-full h-full bg-black/40 flex items-center justify-center"
        >
          <img
            src={banner.image}
            alt={banner.title}
            className="w-full h-full object-cover absolute inset-0"
          />

           <div className="absolute inset-0 bg-black/50"></div>
           
          <div className="relative z-10 text-center px-4">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">
              {banner.title}
            </h1>
            <p className="text-lg md:text-2xl text-orange-400 drop-shadow-lg">
              {banner.subtitle}
            </p>
          </div>
        </motion.div>
      ))}

      {/* Navigation Dots */}
      <div className="absolute bottom-5 w-full flex justify-center gap-3">
        {banners.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full ${
              idx === current ? "bg-orange-500" : "bg-white/50"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
}
