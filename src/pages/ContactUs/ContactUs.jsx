import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";

const Contact = () => {
  const handleRequest = () => {
    Swal.fire({
      icon: "success",
      title: "Request Submitted",
      text: "Thank you for your request, we will respond you soon. Otherwise you can call this number ( 225-359-4875 ) directly for a demo.",
      confirmButtonColor: "#01AFF7",
    });
  };

  const handleHelp = () => {
    Swal.fire({
      icon: "warning",
      title: "Service Not Available",
      text: "Please call this number ( 487-655-4545 ) for help",
      confirmButtonColor: "#01AFF7",
    });
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-100 px-6 py-16">
      <Helmet>
        <title>Contact | BrickBase</title>
      </Helmet>

      {/* Header Section */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold text-blue-500 mb-4">
          Get in Touch
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Whether you're a property owner, broker, or customer, our team is here
          to support you. Reach out to us for assistance or to explore our
          solutions.
        </p>
      </div>

      {/* Cards Section */}
      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Card 1 */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.3 }}
          className="relative rounded-2xl overflow-hidden shadow-lg group"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/40 z-10"></div>
          <img
            src="https://m.cbhomes.com/p/967/872993/2239676239eD45a/original.jpg"
            alt="Advertising Solutions"
            className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white p-6">
            <h3 className="text-2xl md:text-3xl font-bold mb-3">
              Advertising Solutions
            </h3>
            <p className="text-sm text-gray-200 mb-5 max-w-md">
              Explore our advertising solutions tailored for CRE owners and
              brokers.
            </p>
            <div className="flex items-center justify-center text-blue-400 font-medium space-x-2 mb-6 text-2xl">
              <FaPhoneAlt className="text-blue-400" />
              <a href="tel:2253594875" className="hover:underline">
                225-359-4875
              </a>
            </div>
            <button
              onClick={() => handleRequest()}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-full shadow-md transition"
            >
              Request a Demo
            </button>
          </div>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.3 }}
          className="relative rounded-2xl overflow-hidden shadow-lg group"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/40 z-10"></div>
          <img
            src="https://www.bproperty.com/blog/wp-content/uploads/2021/04/house-1867187_1920.jpg"
            alt="Customer Support"
            className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white p-6">
            <h3 className="text-2xl md:text-3xl font-bold mb-3">
              Customer Support
            </h3>
            <p className="text-sm text-gray-200 mb-5 max-w-md">
              Get help with account management, billing inquiries, and
              property-related questions.
            </p>
            <div className="flex items-center justify-center text-blue-400 font-medium space-x-2 mb-6 text-2xl">
              <FaPhoneAlt className="text-blue-400" />
              <a href="tel:4876554545" className="hover:underline">
                487-655-4545
              </a>
            </div>
            <button
              onClick={() => handleHelp()}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-full shadow-md transition"
            >
              Get Help
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
