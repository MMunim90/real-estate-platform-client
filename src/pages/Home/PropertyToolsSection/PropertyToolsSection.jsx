import React from "react";

const PropertyToolsSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 my-6">
      {/* Block 1 - Text */}
      <div className="text-white p-8 flex flex-col justify-center">
        <h2 className="text-2xl md:text-3xl lg:text-5xl font-semibold mb-4">
          Advertise Your Rental
        </h2>
        <p className="text-base md:text-lg mb-4">
          Connect with thousands of property seekers across Bangladesh using
          BrickBase’s comprehensive marketing tools.
        </p>
        <a
          href="/list-property"
          className="text-blue-400 font-medium hover:underline"
        >
          List Your Property
        </a>
      </div>

      {/* Block 2 - Image */}
      <div className="w-full h-64 md:h-[250px] lg:h-[450px]">
        <img
          src="https://images.unsplash.com/photo-1501183638710-841dd1904471"
          alt="Apartment"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Block 3 - Image */}
      <div className="w-full h-64 md:h-[250px] lg:h-[450px]">
        <img
          src="https://www.authorlove.com/wp-content/uploads/2017/04/Happy-Couple-Love-Pure-scaled.jpg"
          alt="Happy Couple"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Block 4 - Text */}
      <div className="text-white p-8 flex flex-col justify-center">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 lg:text-5xl">
          Lease 100% Online
        </h2>
        <p className="text-base md:text-lg mb-4">
          Accept applications, collect payments, and sign leases digitally— all
          on one platform.
        </p>
        <a
          href="/manage-property"
          className="text-blue-400 font-medium hover:underline"
        >
          Manage Your Property
        </a>
      </div>
    </div>
  );
};

export default PropertyToolsSection;
