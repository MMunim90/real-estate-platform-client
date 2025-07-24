import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import PropertyCard from "./PropertyCard";
import { Helmet } from "react-helmet-async";
import Loading from "../shared/Loading/Loading";

const AllProperties = () => {
  const axiosPublic = useAxiosPublic();

  const [selectedDivision, setSelectedDivision] = useState("All(Division)");
  const [sortOrder, setSortOrder] = useState("Default");

  const divisions = [
    "All(Division)",
    "Dhaka",
    "Chattogram",
    "Rajshahi",
    "Khulna",
    "Barisal",
    "Sylhet",
    "Rangpur",
    "Mymensingh",
  ];

  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["verified-properties"],
    queryFn: async () => {
      const res = await axiosPublic.get("/properties/verified");
      return res.data;
    },
  });

  const filteredProperties = properties
    .filter((property) =>
      selectedDivision === "All(Division)"
        ? true
        : property.location
            ?.toLowerCase()
            .includes(selectedDivision.toLowerCase())
    )
    .sort((a, b) => {
    if (sortOrder === "LowToHigh") {
      return a.minRate - b.minRate;
    } else if (sortOrder === "HighToLow") {
      return b.minRate - a.minRate;
    }
    return 0; // Default
  });

  if (isLoading)
    return (
      <div className="text-center py-20 text-lg">
        <Loading></Loading>
      </div>
    );

  return (
    <section className="py-10 px-4 md:px-10 bg-blue-50 min-h-screen">
      <Helmet>
        <title>All Properties | BrickBase</title>
      </Helmet>

      <h2 className="text-3xl md:text-5xl font-bold text-center mb-10 text-black">
        Verified Properties
      </h2>

      {filteredProperties.length === 0 ? (
        <div className="flex flex-col gap-5">
          <p className="text-center text-gray-500">
            No properties found in this Division.
          </p>
          <button
            onClick={() => (window.location.href = "/allProperties")}
            className="text-white px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 max-w-[100px] w-full mx-auto"
          >
            Back
          </button>
        </div>
      ) : (
        <div className="flex flex-row items-center justify-between mb-6 gap-4 flex-wrap">
          <p className="text-md md:text-2xl text-black">
            Property list ({filteredProperties.length})
          </p>

          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* Division Filter */}
            <div>
              <label className="text-md text-black">
                Sort: <br className="block md:hidden"/>
              </label>
              <select
                className="border border-gray-400 rounded px-3 py-1 text-black mt-4 md:mt-0"
                value={selectedDivision}
                onChange={(e) => setSelectedDivision(e.target.value)}
              >
                {divisions.map((division) => (
                  <option key={division} value={division}>
                    {division}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div>
              <label className="text-lg font-semibold mr-1 text-black">
              </label>
              <select
                className="border border-gray-400 rounded px-3 py-1 text-black"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="Default">Default(Price)</option>
                <option value="LowToHigh">Low to High</option>
                <option value="HighToLow">High to Low</option>
              </select>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {filteredProperties.map((property) => (
          <PropertyCard key={property._id} property={property} />
        ))}
      </div>
    </section>
  );
};

export default AllProperties;
