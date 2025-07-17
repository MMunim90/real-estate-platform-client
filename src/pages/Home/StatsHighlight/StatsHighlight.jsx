import React from "react";
import CountUp from "react-countup";

const StatsHighlight = () => {
  return (
    <section className="bg-neutral-900 text-white py-10 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-xl md:text-2xl font-semibold mb-8 text-center">
          For over 10 years,{" "}
          <span className="text-blue-500">BrickBase</span> has been the trusted
          platform for Real Estate Solutions
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-700 text-center">
          <div className="py-4 px-6">
            <p className="text-2xl font-bold">
              <CountUp end={30000} duration={5} separator="," />+
            </p>
            <p className="text-sm text-gray-400">Active Listings</p>
          </div>

          <div className="py-4 px-6">
            <p className="text-2xl font-bold">
              <CountUp end={3000000} duration={5} separator="," />+
            </p>
            <p className="text-sm text-gray-400">Monthly Visitors</p>
          </div>

          <div className="py-4 px-6">
            <p className="text-2xl font-bold">
              $<CountUp end={19} decimals={1} duration={5} />B+
            </p>
            <p className="text-sm text-gray-400">In Transaction Value</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsHighlight;
