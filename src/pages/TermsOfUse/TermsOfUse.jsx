import React from "react";

const TermsOfUse = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-6 text-center">Terms of Use</h2>
      <div className="space-y-6 text-gray-400">
        <p>
          Welcome to BrickBase. By accessing or using our services, you agree to comply with and be bound by the following terms and conditions.
        </p>
        <h3 className="text-xl font-semibold">1. Use of Website</h3>
        <p>
          The content on this website is for informational purposes only. You may not use it for unlawful or prohibited purposes.
        </p>
        <h3 className="text-xl font-semibold">2. Intellectual Property</h3>
        <p>
          All content, logos, and visuals on BrickBase are protected by copyright and may not be reproduced without permission.
        </p>
        <h3 className="text-xl font-semibold">3. Liability</h3>
        <p>
          BrickBase is not liable for any damages resulting from the use or inability to use the site.
        </p>
        <h3 className="text-xl font-semibold">4. Changes to Terms</h3>
        <p>
          We reserve the right to change these terms at any time. Continued use after changes constitutes acceptance of the new terms.
        </p>
      </div>
    </div>
  );
};

export default TermsOfUse;
