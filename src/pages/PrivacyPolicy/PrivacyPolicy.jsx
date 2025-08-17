import React from "react";
import FadeIn from "react-fade-in";
import { Helmet } from "react-helmet-async";
import {
  FaUserShield,
  FaLock,
  FaExchangeAlt,
  FaRegClock,
  FaRegEnvelope,
  FaCookieBite,
  FaChild,
  FaSyncAlt,
  FaServer,
} from "react-icons/fa";
import { Link } from "react-router";

const PrivacyPolicy = () => {
  return (
    <div className="px-4 md:px-16 py-20 mx-auto bg-blue-50 text-black pl-6 md:pl-12 lg:pl-20">
      <Helmet>
        <title>Privacy Policy | BrickBase</title>
      </Helmet>

      <div
        className="relative flex flex-col items-start md:items-center text-center md:text-center 
  bg-gradient-to-tr from-blue-500 via-blue-400 to-blue-300 
  px-8 md:px-16 py-16 rounded-3xl shadow-lg border border-blue-200 mb-10"
      >
        {/* Breadcrumbs */}
        <div className="breadcrumbs text-sm text-gray-800 mb-4 self-start md:self-center">
          <ul className="flex gap-2">
            <li>
              <Link to="/" className="hover:underline font-medium">
                Home
              </Link>
            </li>
            <li className="text-gray-700 font-medium">Privacy Policy</li>
          </ul>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-extrabold text-blue-600 mb-3 drop-shadow">
          <FaUserShield className="inline-block mr-2 text-blue-600" />
          Privacy Policy
        </h1>

        {/* Last Updated */}
        <p className="text-gray-100 text-sm md:text-base bg-blue-600 px-4 py-2 rounded-full shadow-sm mt-2">
          Last Updated: July 18, 2025
        </p>
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

          {/* 5. Cookies */}
          <section>
            <h2 className="text-2xl font-semibold mb-2 text-blue-500 flex items-center gap-2">
              <FaCookieBite /> Cookies & Tracking Technologies
            </h2>
            <p>
              We use cookies and similar technologies to improve your browsing
              experience, analyze site traffic, and personalize content. You may
              adjust your browser settings to decline cookies, but some features
              of our platform may not function properly without them.
            </p>
          </section>

          {/* 6. User Rights */}
          <section>
            <h2 className="text-2xl font-semibold mb-2 text-blue-500 flex items-center gap-2">
              <FaServer /> Your Rights
            </h2>
            <ul className="list-disc list-inside ml-4">
              <li>Access your personal data</li>
              <li>Request corrections or updates</li>
              <li>Request deletion of your account</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </section>

          {/* 7. Children's Privacy */}
          <section>
            <h2 className="text-2xl font-semibold mb-2 text-blue-500 flex items-center gap-2">
              <FaChild /> Children's Privacy
            </h2>
            <p>
              Our services are not intended for children under 13 years of age.
              We do not knowingly collect personal data from minors. If we
              become aware that we have collected such information, we will
              promptly delete it.
            </p>
          </section>

          {/* 8. Policy Updates */}
          <section>
            <h2 className="text-2xl font-semibold mb-2 text-blue-500 flex items-center gap-2">
              <FaSyncAlt /> Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes
              will be posted here with the updated date. We encourage you to
              review this policy periodically to stay informed about how we
              protect your information.
            </p>
          </section>

          {/* 9. Contact */}
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
              <li>Phone: 487-655-4545</li>
              <li>Address: Dhaka, Bangladesh</li>
            </ul>
          </section>
        </FadeIn>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
