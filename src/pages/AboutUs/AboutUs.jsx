import React from "react";
import FadeIn from "react-fade-in";
import developerImg from "../../assets/developer.jpg";
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
} from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="bg-white text-gray-800">
      <Helmet>
        <title>About | BrickBase</title>
      </Helmet>
      <FadeIn>
        {/* Header Section */}
        <section className="bg-blue-100 py-12 px-6 md:px-16">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-blue-900 mb-4">
              About BrickBase
            </h1>
            <p className="text-lg md:text-xl text-gray-700">
              Your trusted platform for smarter real estate experiences.
            </p>
          </div>
        </section>

        {/* Company Mission & Vision */}
        <section className="py-12 px-6 md:px-16">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-blue-800 flex items-center gap-2">
                <FaRocket /> Our Mission
              </h2>
              <p className="text-gray-600 leading-relaxed">
                At BrickBase, our mission is to simplify the process of buying,
                selling, and renting real estate by providing users with the
                most accurate listings, data-driven insights, and seamless tools
                to make confident decisions.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-blue-800 flex items-center gap-2">
                <FaEye /> Our Vision
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We envision a future where technology transforms real estate
                transactions into transparent, efficient, and empowering
                experiences for everyone involved — from individuals to
                investors.
              </p>
            </div>
          </div>
        </section>

        {/* History / Impact Section */}
        <section className="bg-gray-100 py-12 px-6 md:px-16">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-2xl font-semibold mb-4 text-blue-800 flex justify-center items-center gap-2">
              <FaHistory /> Our Journey
            </h2>
            <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto">
              For over 10 years, BrickBase has grown from a local platform to a
              nationwide hub, connecting millions of users with their ideal
              properties. Our commitment to trust, innovation, and transparency
              remains at the heart of what we do.
            </p>
          </div>
        </section>

        {/* Developer Details */}
        <section className="py-12 px-6 md:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-semibold mb-6 text-blue-800 flex justify-center items-center gap-2">
              <FaUserTie /> Meet the Developer
            </h2>
            <div className="bg-blue-50 rounded-xl p-6 shadow-md">
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
                <a
                  href="https://github.com/shahanalmunim"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 hover:underline"
                >
                  <FaGithub /> GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/shahanalmunim"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 hover:underline"
                >
                  <FaLinkedin /> LinkedIn
                </a>
                <a
                  href="mailto:shahanalmunim@gmail.com"
                  className="flex items-center gap-1 hover:underline"
                >
                  <FaEnvelope /> Email
                </a>
                <a
                  href="https://t.me/codecraftgamers"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 hover:underline"
                >
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
