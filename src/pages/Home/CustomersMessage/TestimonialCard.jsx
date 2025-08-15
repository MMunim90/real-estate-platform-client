import React from "react";
import image1 from "../../../assets/reviewQuote.png";

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="rounded-xl p-6 transition-all duration-500 w-full md:w-[300px] h-[250px] flex flex-col justify-between text-center bg-white">
      <img className="w-12" src={image1} alt="" />
      <div>
        <p className="text-black text-sm italic">{testimonial.text}</p>
      </div>
      <div className="mt-4 border-t border-dashed border-blue-400 pt-4">
        <div className="flex items-center justify-center gap-2">
          <div className="w-10 h-10">
            <img className="w-10 h-10 rounded-full object-cover" src={testimonial.image} alt="" />
          </div>
          <div className="text-left">
            <p className="font-semibold text-sm text-gray-700">
              {testimonial.name}
            </p>
            <p className="text-xs text-gray-500">{testimonial.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
