import React from "react";
import { Helmet } from "react-helmet-async";
import {
  Globe,
  ShieldCheck,
  BookOpenCheck,
  AlertTriangle,
  RefreshCcw,
} from "lucide-react";
import FadeIn from "react-fade-in";

const TermsOfUse = () => {
  return (
    <div className="max-w-7xl mx-auto px-8 py-12">
      <Helmet>
        <title>Terms | BrickBase</title>
      </Helmet>
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-400">
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
        </FadeIn>
      </div>
    </div>
  );
};

export default TermsOfUse;
