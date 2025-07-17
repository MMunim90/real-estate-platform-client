import React from "react";
import { Helmet } from "react-helmet-async";

const ContactUs = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <Helmet>
        <title>Contact | BrickBase</title>
      </Helmet>
      <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>
      <p className="text-center text-gray-600 mb-8">
        We’d love to hear from you. Whether you’re a buyer, seller, or agent —
        reach out with any questions!
      </p>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          type="text"
          placeholder="Your Name"
          className="p-3 border border-gray-300 rounded"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="p-3 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Subject"
          className="p-3 border border-gray-300 rounded md:col-span-2"
        />
        <textarea
          placeholder="Your Message"
          className="p-3 border border-gray-300 rounded h-32 md:col-span-2"
        ></textarea>
        <button
          type="submit"
          className="bg-blue-500 text-white font-semibold py-3 px-6 rounded hover:bg-blue-700 transition md:col-span-2"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactUs;
