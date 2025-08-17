import React from "react";
import FadeIn from "react-fade-in";
import { Helmet } from "react-helmet-async";
import {
  FaUserShield,
  FaLock,
  FaExchangeAlt,
  FaRegClock,
  FaRegEnvelope,
} from "react-icons/fa";
import { Link } from "react-router";
import logo from "../../assets/logo.png";

const PrivacyPolicy = () => {
  return (
    <div className="px-4 md:px-16 py-20 mx-auto bg-blue-50 text-black pl-6 md:pl-12 lg:pl-20">
      <Helmet>
        <title>Privacy Policy | BrickBase</title>
      </Helmet>

      <div className="mb-10 relative flex flex-col bg-gradient-to-r from-blue-400 to-blue-300 px-12 py-16 rounded-2xl">
        {/* Logo at top-right */}

        <img
          src={logo}
          alt="BrickBase Logo"
          className="absolute top-8 left-12 w-12 h-12"
        />
        <p className="absolute left-26 top-10 text-2xl text-gray-800 font-bold"> BrickBase</p>

        <div className="breadcrumbs text-sm text-black mb-2 mt-6">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-2">
          <FaUserShield className="inline-block mr-2" />
          Privacy Policy
        </h1>

        <p className="text-gray-700">Last Updated: July 18, 2025</p>
      </div>

      <div>
        <FadeIn className="space-y-8">
          {/* 1. Information Collection */}
          <section>
            <h2 className="text-2xl font-semibold mb-2 text-blue-500 flex items-center gap-2">
              <FaLock /> Information We Collect
            </h2>
            <p className="max-w-6xl">
              We collect personal information such as name, email address, phone
              number, and property preferences when you register, list
              properties, or communicate with us. We may also gather location
              and browser data for analytics purposes.
            </p>
          </section>

          {/* 2. Use of Information */}
          <section>
            <h2 className="text-2xl font-semibold mb-2 text-blue-500 flex items-center gap-2">
              <FaExchangeAlt /> How We Use Your Information
            </h2>
            <div>
              Your data is used to:
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>Match listings based on your preferences</li>
                <li>Send updates, alerts, and offers</li>
                <li>Enhance user experience and platform security</li>
                <li>Comply with legal obligations</li>
              </ul>
            </div>
          </section>

          {/* 3. Data Retention */}
          <section>
            <h2 className="text-2xl font-semibold mb-2 text-blue-500 flex items-center gap-2">
              <FaRegClock /> Data Retention
            </h2>
            <p>
              We retain your personal data as long as your account is active or
              necessary to provide our services. You can request deletion by
              contacting our support team.
            </p>
          </section>

          {/* 4. Sharing Data */}
          <section>
            <h2 className="text-2xl font-semibold mb-2 text-blue-500 flex items-center gap-2">
              <FaUserShield /> Data Sharing & Disclosure
            </h2>
            <div>
              We do not sell your personal data. However, we may share it with:
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>Trusted partners for listing promotions</li>
                <li>Law enforcement when required</li>
                <li>Third-party analytics services (e.g., Google Analytics)</li>
              </ul>
            </div>
          </section>

          {/* 5. Contact */}
          <section>
            <h2 className="text-2xl font-semibold mb-2 text-blue-500 flex items-center gap-2">
              <FaRegEnvelope /> Contact Us
            </h2>
            <p>
              If you have questions about this Privacy Policy, feel free to
              reach us at:
            </p>
            <ul className="list-inside ml-4 mt-2">
              <li>Email: support@brickbase.com</li>
              <li>Phone: +880-1234-567890</li>
              <li>Address: Dhaka, Bangladesh</li>
            </ul>
          </section>
        </FadeIn>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
