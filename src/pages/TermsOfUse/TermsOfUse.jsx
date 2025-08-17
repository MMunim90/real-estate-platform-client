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
    <div className="mx-auto px-8 py-20 bg-blue-50 pl-8 md:pl-12 lg:pl-20">
      <Helmet>
        <title>Terms | BrickBase</title>
      </Helmet>

      <div className="breadcrumbs text-sm text-black mb-2">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>Terms of Use</li>
        </ul>
      </div>

      <h2 className="text-3xl font-bold mb-6 text-gray-700">
        Terms of Use
      </h2>
      <div className="space-y-8 text-gray-500">
        <FadeIn className="space-y-8">
          <p className="text-base">
            Welcome to BrickBase. By accessing or using our services, you agree
            to comply with and be bound by the following terms and conditions.
          </p>

          <div>
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-600" />
              Use of Website
            </h3>
            <p className="mt-2">
              The content on this website is for informational purposes only.
              You may not use it for unlawful or prohibited purposes.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-green-600" />
              Intellectual Property
            </h3>
            <p className="mt-2">
              All content, logos, and visuals on BrickBase are protected by
              copyright and may not be reproduced without permission.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
              Liability
            </h3>
            <p className="mt-2">
              BrickBase is not liable for any damages resulting from the use or
              inability to use the site.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <RefreshCcw className="w-5 h-5 text-indigo-600" />
              Changes to Terms
            </h3>
            <p className="mt-2">
              We reserve the right to change these terms at any time. Continued
              use after changes constitutes acceptance of the new terms.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-pink-600" />
              Account Responsibility
            </h3>
            <p className="mt-2">
              If you create an account on BrickBase, you are responsible for
              maintaining the security of your login credentials and for all
              activity under your account.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Lock className="w-5 h-5 text-purple-600" />
              Privacy
            </h3>
            <p className="mt-2">
              Your use of the site is also governed by our Privacy Policy,
              which explains how we collect, use, and protect your information.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-600" />
              Termination
            </h3>
            <p className="mt-2">
              We may suspend or terminate access to the website or your account
              if you violate these terms or engage in prohibited activity.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Gavel className="w-5 h-5 text-gray-700" />
              Governing Law
            </h3>
            <p className="mt-2">
              These terms are governed by the laws of the jurisdiction in which
              BrickBase operates, without regard to its conflict of law
              provisions.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <BookOpenCheck className="w-5 h-5 text-teal-600" />
              Entire Agreement
            </h3>
            <p className="mt-2">
              These terms constitute the entire agreement between you and
              BrickBase regarding your use of the site, superseding any prior
              agreements.
            </p>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default TermsOfUse;
