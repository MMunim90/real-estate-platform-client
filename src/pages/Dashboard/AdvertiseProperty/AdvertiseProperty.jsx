import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../shared/Loading/Loading";
import { toast } from "react-toastify";

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

  const { data: advertisedProperties = [], isLoading: advertisedLoading } =
    useQuery({
      queryKey: ["advertised-properties"],
      queryFn: async () => {
        const res = await axiosSecure.get("/properties/advertised");
        return res.data;
      },
    });

  const handleAdvertise = async (propertyId) => {
    try {
      const res = await axiosSecure.post(`/properties/advertise/${propertyId}`);
      if (res.data.modifiedCount > 0) {
        toast.success("Property Advertised Successfully");
        queryClient.invalidateQueries(["verified-properties"]);
        queryClient.invalidateQueries(["advertised-properties"]);
      }
    } catch (err) {
      console.error("Failed to advertise:", err);
      toast.error("Failed to advertise property");
    }
  };

  const handleDeleteAdvertised = async (advertisementId) => {
    try {
      const res = await axiosSecure.delete(
        `/properties/advertise/${advertisementId}`
      );
      if (res.data.success) {
        toast.success("Advertisement removed successfully");
        queryClient.invalidateQueries(["verified-properties"]);
        queryClient.invalidateQueries(["advertised-properties"]);
      }
    } catch (err) {
      console.error("Failed to delete advertisement:", err);
      toast.error("Failed to delete advertisement");
    }
  };

  if (isLoading || advertisedLoading) return <Loading />;

  return (
    <div className="px-4 md:px-12 py-10 bg-blue-50 min-h-screen">
      <Helmet>
        <title>Advertise Property | Admin Panel</title>
      </Helmet>

      <h2 className="text-3xl md:text-5xl font-bold text-center mb-8">
        Advertise Property
      </h2>

      {/* Table for Non-advertised Verified Properties */}
      <div className="overflow-x-auto shadow rounded border border-gray-400 mb-12">
        <table className="table w-full">
          <thead className="bg-blue-100 text-black">
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price Range</th>
              <th>Agent</th>
              <th>Installments</th>
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
                <td>{property.installments || "N/A"}</td>
                <td>
                  <button
                    onClick={() => handleAdvertise(property._id)}
                    className="px-4 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white text-sm transition-all"
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

      {/* Table for Already Advertised Properties */}
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-6">
        Advertised Properties
      </h2>
      <div className="overflow-x-auto shadow rounded border border-gray-400">
        <table className="table w-full">
          <thead className="bg-blue-100 text-black">
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price Range</th>
              <th>Installments</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {advertisedProperties.map((property) => (
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
                <td>{property.installments || "N/A"}</td>
                <td>
                  <button
                    onClick={() => handleDeleteAdvertised(property._id)}
                    className="px-4 py-1 rounded bg-red-600 hover:bg-red-700 text-white text-sm transition-all"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {advertisedProperties.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 py-8">
                  No advertised properties found.
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
