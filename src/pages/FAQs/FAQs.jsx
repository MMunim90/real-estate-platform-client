import React, { useState } from "react";
import { Helmet } from "react-helmet-async";

const faqs = [
  {
    question: "How do I list my property on BrickBase?",
    answer:
      "You can list your property by creating an account and clicking on 'Post Property'. Fill in the required details and upload photos.",
  },
  {
    question: "Is there a fee to use BrickBase?",
    answer:
      "Basic listings are free. Premium listings and marketing tools are available for a fee.",
  },
  {
    question: "How do I contact a seller?",
    answer:
      "Click on a property listing and use the contact form or phone number provided by the seller or agent.",
  },
  {
    question: "Can I schedule property visits through BrickBase?",
    answer:
      "Yes, many listings have a 'Schedule Visit' option where you can choose a suitable date and time to visit the property.",
  },
  {
    question: "Are all listings verified on BrickBase?",
    answer:
      "We encourage all users to verify listings, and we conduct manual checks on premium listings to ensure authenticity.",
  },
  {
    question: "How do I edit or remove my listing?",
    answer:
      "Log in to your account, go to 'My Listings', and select the property you wish to edit or remove.",
  },
];

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <Helmet>
        <title>FAQ'S | BrickBase</title>
      </Helmet>
      <h2 className="text-3xl font-bold mb-8 text-center">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((item, index) => (
          <div key={index} className="border border-gray-300 rounded p-4">
            <button
              onClick={() => toggle(index)}
              className="flex justify-between w-full text-left font-medium text-lg"
            >
              {item.question}
              <span>{openIndex === index ? "−" : "+"}</span>
            </button>
            {openIndex === index && (
              <p className="mt-2 text-gray-400">{item.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQs;
