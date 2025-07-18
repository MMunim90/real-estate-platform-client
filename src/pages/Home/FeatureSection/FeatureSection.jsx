import React from "react";
import { FaBullhorn, FaCameraRetro, FaRocket, FaSearch } from "react-icons/fa";

const FeatureSection = () => {
  return (
    <div
      className="relative bg-cover bg-center text-white py-16 px-4 md:px-16"
      style={{
        backgroundImage:
          "url('https://www.outsourcinghubindia.com/wp-content/uploads/2021/10/commercial-real-estate-covid.jpeg')",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative z-10 max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          BrickBase Listings Sell or Rent Faster
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 text-left">
          <div className="flex flex-col items-start">
            <FaBullhorn className="text-4xl mb-3" />
            <h3 className="text-xl font-semibold mb-1">Targeted Exposure</h3>
            <p>
              Showcase your properties to thousands of active renters & buyers
              across Bangladesh.
            </p>
          </div>

          <div className="flex flex-col items-start">
            <FaCameraRetro className="text-4xl mb-3" />
            <h3 className="text-xl font-semibold mb-1">Engaging Media</h3>
            <p>
              Use stunning images, 3D views, and walkthroughs to captivate
              potential clients.
            </p>
          </div>

          <div className="flex flex-col items-start">
            <FaRocket className="text-4xl mb-3" />
            <h3 className="text-xl font-semibold mb-1">Faster Transactions</h3>
            <p>
              Connect with serious buyers and renters faster through smart
              algorithms.
            </p>
          </div>
        </div>

        <div className="mt-10 max-w-2xl mx-auto">
          <div className="flex items-center bg-white rounded overflow-hidden">
            <input
              type="text"
              placeholder="Search properties by city, type, or ID..."
              className="w-full px-4 py-3 text-black placeholder-gray-500 focus:outline-none"
            />
            <button className="bg-gray-800 hover:bg-gray-700 text-white px-5 py-4 cursor-pointer">
              <FaSearch />
            </button>
          </div>
        </div>

        <p className="mt-4 text-sm opacity-80">
          *Based on internal analysis comparing listings with and without
          enhanced marketing.
        </p>
      </div>
    </div>
  );
};

export default FeatureSection;
