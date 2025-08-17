import React, { useState } from "react";
import TestimonialCard from "./TestimonialCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const testimonials = [
  {
    name: "Rasel Ahamed",
    role: "CTO, UrbanNest Realty",
    text: "BrickBase’s platform makes property management simple and efficient. We rely on it for listing, tracking, and closing deals smoothly.",
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    name: "Awlad Hossin",
    role: "Senior Property Designer, Creatix Homes",
    text: "I was amazed at how quickly we could showcase our new properties online. BrickBase is now our go-to platform for all listings!",
    image: "https://randomuser.me/api/portraits/men/44.jpg"
  },
  {
    name: "Nasir Uddin",
    role: "CEO, Innoventures Realty",
    text: "From listing to client management, the whole process is seamless. BrickBase has streamlined our real estate operations tremendously.",
    image: "https://randomuser.me/api/portraits/men/67.jpg"
  },
  {
    name: "Ayesha Sultana",
    role: "Marketing Manager, BrightMark Realty",
    text: "Thanks to BrickBase, our property campaigns reach potential buyers faster than ever. It’s a truly reliable platform for real estate marketing.",
    image: "https://randomuser.me/api/portraits/women/21.jpg"
  },
  {
    name: "Tanvir Hossain",
    role: "Software Engineer, Devline Properties",
    text: "I listed a property for sale and had interested buyers within hours. BrickBase’s speed and reliability are impressive!",
    image: "https://randomuser.me/api/portraits/men/75.jpg"
  },
  {
    name: "Nadia Rahman",
    role: "HR Executive, PeoplePro Realty",
    text: "We use BrickBase to onboard new clients and manage their property queries. The quick and organized process makes a great first impression.",
    image: "https://randomuser.me/api/portraits/women/41.jpg"
  },
  {
    name: "Jubayer Alam",
    role: "UX Researcher, Humanable Realty",
    text: "Real-time property tracking and smooth client management—BrickBase sets a new standard in real estate platforms. Highly recommended!",
    image: "https://randomuser.me/api/portraits/men/60.jpg"
  },
  {
    name: "Fatema Binte",
    role: "Sales Lead, NeoCorp Realty",
    text: "Even during peak seasons, BrickBase ensures all listings and inquiries are handled promptly. A must-have tool for every sales team.",
    image: "https://randomuser.me/api/portraits/women/35.jpg"
  },
  {
    name: "Hasibul Haque",
    role: "Operations Analyst, FlowTech Properties",
    text: "Our team relies on BrickBase to manage daily property operations. Their consistency and support are outstanding.",
    image: "https://randomuser.me/api/portraits/men/53.jpg"
  },
  {
    name: "Munira Jahan",
    role: "Business Consultant, StratEdge Realty",
    text: "Clients always praise our quick property updates—all thanks to BrickBase. It’s a platform we confidently recommend to others.",
    image: "https://randomuser.me/api/portraits/women/49.jpg"
  }
];


const CustomersMessages = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="py-8 px-4 relative">
      {/* Header */}
      <div className="text-center mb-12 flex flex-col items-center">
        <h1 className="text-white font-bold text-[40px] mt-2 mb-2">
          What our satisfied clients are saying...
        </h1>
        <p className="opacity-50 text-center">
          Our clients choose Brickbase for our commitment to speed, reliability, and personalized service. Read real stories from property buyers, sellers, and investors who trust us to handle every transaction smoothly and deliver exceptional results.
        </p>
      </div>

      {/* Swiper + Controls */}
      <div className="relative">
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={3}
          coverflowEffect={{
            rotate: 10,
            stretch: 20,
            depth: 100,
            modifier: 2.5,
          }}
          autoplay={{
            delay: 10000, 
            disableOnInteraction: false, 
          }}
          pagination={{ el: ".swiper-pagination", clickable: true }}
          navigation={{
            nextEl: ".custom-swiper-next",
            prevEl: ".custom-swiper-prev",
          }}
          modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
          className="swiper_container"
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)} // track active slide
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide
              key={index}
              style={{
                opacity: index === activeIndex ? 1 : 0.6,
                transition: "opacity 0.3s ease",
              }}
            >
              <TestimonialCard testimonial={testimonial} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Arrows + Pagination Centered */}
        <div className="mt-12 lg:flex justify-around items-center gap-6 sm:gap-10 hidden max-w-[400px] mx-auto">
          {/* Left Arrow */}
          <div className="custom-swiper-prev bg-blue-400 text-black p-2 rounded-full shadow-lg cursor-pointer hover:bg-gray-100 transition-all duration-300">
            <FaChevronLeft size={25} />
          </div>

          {/* Pagination in between - flex-grow to center */}
          <div className="swiper-pagination flex-grow flex justify-center mb-2"></div>

          {/* Right Arrow */}
          <div className="custom-swiper-next bg-blue-400 text-black p-2 rounded-full shadow-lg cursor-pointer transition-all duration-300">
            <FaChevronRight size={25} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomersMessages;
