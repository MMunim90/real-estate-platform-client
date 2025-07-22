import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import PropertyCard from "./PropertyCard";
import { Helmet } from "react-helmet-async";
import Loading from "../shared/Loading/Loading";

const AllProperties = () => {
  const axiosPublic = useAxiosPublic();

  const [selectedDivision, setSelectedDivision] = useState("All");

  const divisions = [
    "All",
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

  const filteredProperties =
    selectedDivision === "All"
      ? properties
      : properties.filter((property) =>
          property.location
            ?.toLowerCase()
            .includes(selectedDivision.toLowerCase())
        );

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

      <div className="flex flex-row items-center justify-between mb-6 gap-4">
        <p className="text-md md:text-2xl text-black">
          Property list({filteredProperties.length})
        </p>

        <div className="text-center md:text-start">
          <label className="hidden md:inline text-lg font-semibold mr-2 text-black">
            Filter by Division:
          </label>
          <select
            className="border border-gray-400 rounded px-3 py-1 md:py-2 text-black"
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
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {filteredProperties.map((property) => (
          <PropertyCard key={property._id} property={property} />
        ))}
      </div>
    </section>
  );
};

export default AllProperties;
