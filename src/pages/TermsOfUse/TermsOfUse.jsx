import React from "react";
import { Helmet } from "react-helmet-async";
import {
  Globe,
  ShieldCheck,
  BookOpenCheck,
  AlertTriangle,
  RefreshCcw,
  UserCheck,
  Lock,
  XCircle,
  Gavel,
} from "lucide-react";
import FadeIn from "react-fade-in";
import { Link } from "react-router";

const TermsOfUse = () => {
  return (
    <div className="px-6 md:px-12 py-16 bg-blue-50">
      <Helmet>
        <title>Terms | BrickBase</title>
      </Helmet>

      {/* Breadcrumbs */}
      <div className="breadcrumbs text-sm text-gray-600 mb-6">
        <ul className="flex items-center gap-2">
          <li>
            <Link to="/" className="font-medium">
              Home
            </Link>
          </li>
          <li className="font-medium text-gray-700">Terms of Use</li>
        </ul>
      </div>

      {/* Page Title */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-500 mb-3">
          Terms of Use
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Please read these terms carefully before using BrickBase.  
          By accessing our services, you agree to be bound by them.
        </p>
      </div>

      {/* Terms Content */}
      <div className="space-y-10">
        <FadeIn className="space-y-10">
          <p className="text-base text-gray-600 leading-relaxed border-l-4 border-blue-400 pl-4 italic">
            Welcome to BrickBase. By accessing or using our services, you agree
            to comply with and be bound by the following terms and conditions.
          </p>

          {[
            {
              title: "Use of Website",
              icon: <Globe className="w-6 h-6 text-blue-600" />,
              text: "The content on this website is for informational purposes only. You may not use it for unlawful or prohibited purposes.",
            },
            {
              title: "Intellectual Property",
              icon: <ShieldCheck className="w-6 h-6 text-green-600" />,
              text: "All content, logos, and visuals on BrickBase are protected by copyright and may not be reproduced without permission.",
            },
            {
              title: "Liability",
              icon: <AlertTriangle className="w-6 h-6 text-yellow-500" />,
              text: "BrickBase is not liable for any damages resulting from the use or inability to use the site.",
            },
            {
              title: "Changes to Terms",
              icon: <RefreshCcw className="w-6 h-6 text-indigo-600" />,
              text: "We reserve the right to change these terms at any time. Continued use after changes constitutes acceptance of the new terms.",
            },
            {
              title: "Account Responsibility",
              icon: <UserCheck className="w-6 h-6 text-pink-600" />,
              text: "If you create an account on BrickBase, you are responsible for maintaining the security of your login credentials and for all activity under your account.",
            },
            {
              title: "Privacy",
              icon: <Lock className="w-6 h-6 text-purple-600" />,
              text: "Your use of the site is also governed by our Privacy Policy, which explains how we collect, use, and protect your information.",
            },
            {
              title: "Termination",
              icon: <XCircle className="w-6 h-6 text-red-600" />,
              text: "We may suspend or terminate access to the website or your account if you violate these terms or engage in prohibited activity.",
            },
            {
              title: "Governing Law",
              icon: <Gavel className="w-6 h-6 text-gray-700" />,
              text: "These terms are governed by the laws of the jurisdiction in which BrickBase operates, without regard to its conflict of law provisions.",
            },
            {
              title: "Entire Agreement",
              icon: <BookOpenCheck className="w-6 h-6 text-teal-600" />,
              text: "These terms constitute the entire agreement between you and BrickBase regarding your use of the site, superseding any prior agreements.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white shadow-md hover:shadow-xl transition-shadow rounded-2xl p-6"
            >
              <h3 className="text-xl font-semibold flex items-center gap-3 mb-2 text-gray-800">
                {item.icon}
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </FadeIn>
      </div>
    </div>
  );
};

export default TermsOfUse;
