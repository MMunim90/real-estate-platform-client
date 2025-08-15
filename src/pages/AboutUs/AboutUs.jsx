import React from "react";
import FadeIn from "react-fade-in";
import { Helmet } from "react-helmet-async";
import {
  FaRocket,
  FaEye,
  FaHistory,
  FaUserTie,
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaTelegram,
  FaShieldAlt,
  FaTools,
  FaGlobe,
  FaHandshake,
} from "react-icons/fa";
import developerImg from "../../assets/developer.jpg";

const AboutUs = () => {
  return (
    <div className="bg-white text-gray-800">
      <Helmet>
        <title>About | BrickBase</title>
      </Helmet>
      <FadeIn>

        {/* Header Section with Background */}
        <section
          className="bg-cover bg-center text-white py-20 px-6 md:px-16 relative"
          style={{
            backgroundImage:
              "url('https://www.bankrate.com/2022/09/21122002/Residential-real-estate.jpg?auto=webp&optimize=high&crop=16:9')",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-60"></div>
          <div className="relative z-10 max-w-5xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              About BrickBase
            </h1>
            <p className="text-lg md:text-xl text-gray-200">
              Your trusted platform for smarter real estate experiences.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-12 px-6 md:px-16 bg-blue-50">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-blue-500 flex items-center gap-2">
                <FaRocket /> Our Mission
              </h2>
              <p className="text-gray-600">
                At BrickBase, our mission is to simplify the process of buying,
                selling, and renting real estate by providing users with accurate
                listings, insights, and seamless tools.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-blue-500 flex items-center gap-2">
                <FaEye /> Our Vision
              </h2>
              <p className="text-gray-600">
                We envision a future where technology transforms real estate
                transactions into transparent, efficient, and empowering
                experiences for everyone.
              </p>
            </div>
          </div>
        </section>

        {/* 4 Responsive Feature Cards */}
        <section className="bg-white py-16 px-6 md:px-16">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-blue-500 mb-10">
              What Makes Us Unique
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white hover:bg-blue-50 p-6 rounded-lg shadow-md hover:shadow-2xl transition">
                <FaShieldAlt className="text-blue-500 text-3xl mb-3" />
                <h3 className="font-semibold text-lg mb-2">Trusted Platform</h3>
                <p className="text-sm text-gray-600">
                  We are trusted by thousands across Bangladesh for real estate services.
                </p>
              </div>

              <div className="bg-white hover:bg-blue-50 p-6 rounded-lg shadow-md hover:shadow-2xl transition">
                <FaTools className="text-blue-500 text-3xl mb-3" />
                <h3 className="font-semibold text-lg mb-2">Smart Tools</h3>
                <p className="text-sm text-gray-600">
                  Access AI-powered search, virtual tours, and smart listing filters.
                </p>
              </div>

              <div className="bg-white hover:bg-blue-50 p-6 rounded-lg shadow-md hover:shadow-2xl transition">
                <FaGlobe className="text-blue-500 text-3xl mb-3" />
                <h3 className="font-semibold text-lg mb-2">Nationwide Reach</h3>
                <p className="text-sm text-gray-600">
                  Our listings cover all major cities and rural areas across the country.
                </p>
              </div>

              <div className="bg-white hover:bg-blue-50 p-6 rounded-lg shadow-md hover:shadow-2xl transition">
                <FaHandshake className="text-blue-500 text-3xl mb-3" />
                <h3 className="font-semibold text-lg mb-2">Customer Support</h3>
                <p className="text-sm text-gray-600">
                  Our support team is ready 24/7 to assist buyers, sellers & renters.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* History Section */}
        <section className="bg-blue-50 py-12 px-6 md:px-16">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4 text-blue-500 flex justify-center items-center gap-2">
              <FaHistory /> Our Journey
            </h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
              For over 10 years, BrickBase has grown from a local platform to a
              nationwide hub, connecting millions of users with their ideal
              properties. Trust, innovation, and transparency are our pillars.
            </p>
          </div>
        </section>

        {/* New Section: Why Choose Us */}
        <section className="py-16 px-6 md:px-16">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-6 text-blue-500">Why Choose Us?</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              BrickBase is more than just a listing platform — it's a trusted companion
              in your property journey. With user-friendly tools, transparent data, and a
              focus on simplicity, we make every step easier.
            </p>
          </div>
        </section>

        {/* New Section: Technology We Use */}
        <section className="bg-blue-50 py-16 px-6 md:px-16">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-6 text-blue-500">Technology We Use</h2>
            <p className="text-gray-600 max-w-3xl mx-auto mb-6">
              BrickBase is built using modern, scalable technologies like React.js,
              Node.js, MongoDB, Tailwind CSS, and cloud infrastructure — ensuring
              performance, security, and scalability.
            </p>
          </div>
        </section>

        {/* Developer Info */}
        <section className="py-12 px-6 md:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-semibold mb-6 text-blue-500 flex justify-center items-center gap-2">
              <FaUserTie /> Meet the Developer
            </h2>
            <div className="bg-blue-50 rounded-xl p-6 shadow-lg">
              <img
                className="w-32 h-32 object-cover rounded-full mx-auto mb-4 border-4 border-blue-300"
                src={developerImg}
                alt="Developer"
              />
              <p className="text-lg font-medium mb-2">MD. Shahan Al Munim</p>
              <p className="text-gray-600 mb-2">
                Full Stack Developer | MERN | React | Tailwind
              </p>
              <p className="text-gray-600 mb-4">
                Passionate about building interactive, scalable, and modern web
                applications. Currently pursuing B.Sc. in Computer Science and
                Engineering.
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-blue-600 text-sm">
                <a href="https://github.com/MMunim90" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline">
                  <FaGithub /> GitHub
                </a>
                <a href="https://www.linkedin.com/in/m-munim/" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline">
                  <FaLinkedin /> LinkedIn
                </a>
                <a href="mailto:shahan.al.munim@gmail.com" className="flex items-center gap-1 hover:underline">
                  <FaEnvelope /> Email
                </a>
                <a href="https://t.me/codecraftgamers" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline">
                  <FaTelegram /> Telegram
                </a>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>
    </div>
  );
};

export default AboutUs;
