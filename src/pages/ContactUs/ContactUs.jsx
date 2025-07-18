import React from 'react';
import { FaPhoneAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="text-center mb-12 w-full">
        <h2 className="text-3xl font-bold mb-10">GET IN TOUCH</h2>

        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {/* Card 1: Advertising Solutions */}
          <motion.div
            whileHover={{
              scale: 1.02,
              boxShadow: '0 0 0 4px rgba(59,130,246,0.4)',
            }}
            transition={{ duration: 0.4 }}
            className="rounded overflow-hidden bg-cover bg-center relative bg-[url('https://sevenluxuryrealestate.com/wp-content/uploads/2024/11/dubai-real-estate-boom-a-response-to-growing-demand-for-home-ownership.webp')]"
          >
            <div className="bg-black/10 backdrop-blur p-8 h-full lg:h-[400px] flex flex-col justify-between rounded">
              <div className="text-center w-full m-auto">
                <h3 className="text-xl lg:text-3xl font-semibold text-white mb-2">Advertising Solutions</h3>
                <p className="text-sm text-gray-100 mb-4">
                  Find out more about our advertising solutions as a CRE owner or broker.
                </p>
                <div className="flex items-center justify-center text-blue-400 font-medium space-x-2 mb-4">
                  <FaPhoneAlt className="text-blue-400" />
                  <a href="tel:2253594875" className="hover:underline">225-359-4875</a>
                </div>
              </div>
              <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
                Request a Demo
              </button>
            </div>
          </motion.div>

          {/* Card 2: Customer Support */}
          <motion.div
            whileHover={{
              scale: 1.02,
              boxShadow: '0 0 0 4px rgba(59,130,246,0.4)',
            }}
            transition={{ duration: 0.4 }}
            className="rounded overflow-hidden bg-cover bg-center relative bg-[url('https://www.bproperty.com/blog/wp-content/uploads/2021/04/house-1867187_1920.jpg')]"
          >
            <div className="bg-black/10 backdrop-blur p-8 h-full lg:h-[400px] flex flex-col justify-between rounded">
              <div className="text-center w-full m-auto">
                <h3 className="text-xl lg:text-3xl font-semibold text-white mb-2">Customer Support</h3>
                <p className="text-sm text-gray-100 mb-4">
                  Manage account, billing inquiries, property questions, support team, and more.
                </p>
                <div className="flex items-center justify-center text-blue-400 font-medium space-x-2 mb-4">
                  <FaPhoneAlt className="text-blue-400" />
                  <a href="tel:4876554545" className="hover:underline">487-655-4545</a>
                </div>
              </div>
              <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
                Get Help
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
