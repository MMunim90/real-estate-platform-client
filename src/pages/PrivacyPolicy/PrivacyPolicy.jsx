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

const PrivacyPolicy = () => {
  return (
    <div className="px-4 md:px-16 py-10 max-w-6xl mx-auto">
      <Helmet>
        <title>Privacy Policy | BrickBase</title>
      </Helmet>

      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-blue-600 text-center">
        <FaUserShield className="inline-block mr-2" />
        Privacy Policy
      </h1>

      <p className="mb-6 text-gray-600 text-center">
        Last Updated: July 18, 2025
      </p>

      <div>
        <FadeIn className="space-y-8">
          {/* 1. Information Collection */}
          <section>
            <h2 className="text-2xl font-semibold mb-2 text-blue-500 flex items-center gap-2">
              <FaLock /> Information We Collect
            </h2>
            <p>
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
            <p>
              Your data is used to:
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>Match listings based on your preferences</li>
                <li>Send updates, alerts, and offers</li>
                <li>Enhance user experience and platform security</li>
                <li>Comply with legal obligations</li>
              </ul>
            </p>
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
            <p>
              We do not sell your personal data. However, we may share it with:
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>Trusted partners for listing promotions</li>
                <li>Law enforcement when required</li>
                <li>Third-party analytics services (e.g., Google Analytics)</li>
              </ul>
            </p>
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
