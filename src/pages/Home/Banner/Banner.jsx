import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";

// Slide content array
const slides = [
  {
    id: 1,
    title: "Find Your Dream Home",
    description: "Discover thousands of listings from trusted agents and property owners.",
    buttonText: "Browse Properties",
    buttonLink: "/allProperties",
    bg: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  },
  {
    id: 2,
    title: "List Your Property Today",
    description: "Join BrickBase to rent or sell your property with ease and security.",
    buttonText: "Start Listing",
    buttonLink: "/dashboard/profile",
    bg: "https://images.unsplash.com/photo-1599423300746-b62533397364",
  },
  {
    id: 3,
    title: "Reliable Agents Near You",
    description: "Connect with verified property agents and close deals faster.",
    buttonText: "Meet Agents",
    buttonLink: "/about",
    bg: "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
  },
  {
    id: 4,
    title: "Secure and Simple Platform",
    description: "Enjoy safe transactions and complete transparency at BrickBase.",
    buttonText: "Learn More",
    buttonLink: "/privacyPolicy",
    bg: "https://upcdn.io/FW25b3d/raw/uploads/2023/04/18/file-6h8s.jpeg",
  },
  {
    id: 5,
    title: "Modern Living, Affordable Prices",
    description: "Explore properties that match your lifestyle and budget.",
    buttonText: "Get Started",
    buttonLink: "/contact",
    bg: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914",
  },
];

const slideVariants = {
  initial: (direction) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
    position: "absolute",
  }),
  animate: {
    x: 0,
    opacity: 1,
    position: "relative",
    transition: { duration: 0.8, ease: "easeInOut" },
  },
  exit: (direction) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
    position: "absolute",
    transition: { duration: 0.8, ease: "easeInOut" },
  }),
};

const Banner = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[80vh] overflow-hidden">
      <AnimatePresence custom={direction}>
        <motion.div
          key={slides[index].id}
          custom={direction}
          variants={slideVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.1)), url(${slides[index].bg})` }}
        >
          <div className="w-full h-full flex flex-col justify-center items-center text-center text-white p-6">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              {slides[index].title}
            </h2>
            <p className="text-lg md:text-xl mb-6 max-w-2xl">
              {slides[index].description}
            </p>
            <Link
              to={slides[index].buttonLink}
              className="bg-white text-black px-6 py-3 rounded-md hover:bg-gray-200 font-medium"
            >
              {slides[index].buttonText}
            </Link>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Banner;
