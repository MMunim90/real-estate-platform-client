import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../shared/Loading/Loading";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

const AdvertiseProperty = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["verified-properties"],
    queryFn: async () => {
      const res = await axiosSecure.get("/properties/notAdvertised");
      return res.data;
    },
  });

  const handleAdvertise = async (propertyId) => {
    try {
      const res = await axiosSecure.post(`/properties/advertise/${propertyId}`);
      if (res.data.modifiedCount > 0) {
        toast.success("Property Advertised Successfully");

        // Remove the advertised item from the cache
        queryClient.setQueryData(["verified-properties"], (oldData) =>
          oldData?.filter((property) => property._id !== propertyId)
        );
      }
    } catch (err) {
      console.error("Failed to advertise:", err);
      toast.error("Failed to advertise property");
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="px-4 md:px-12 py-10 bg-blue-50 min-h-screen">
      <Helmet>
        <title>Advertise Property | Admin Panel</title>
      </Helmet>

      <h2 className="text-3xl md:text-5xl font-bold text-center mb-8">
        Advertise Property
      </h2>

      <div className="overflow-x-auto shadow rounded border border-gray-400">
        <table className="table w-full">
          <thead className="bg-blue-100 text-blue-800">
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price Range</th>
              <th>Agent</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property) => (
              <tr key={property._id} className="hover:bg-blue-50">
                <td>
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-20 h-14 object-cover rounded"
                  />
                </td>
                <td className="font-medium">{property.title}</td>
                <td>
                  ৳{property.minRate} - ৳{property.maxRate}
                </td>
                <td>{property.agentName || "N/A"}</td>
                <td>
                  <button
                    onClick={() => handleAdvertise(property._id)}
                    className="px-4 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={property.advertised}
                  >
                    Advertise
                  </button>
                </td>
              </tr>
            ))}
            {properties.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 py-8">
                  No verified properties available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdvertiseProperty;
