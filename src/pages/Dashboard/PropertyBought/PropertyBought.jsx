import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { Helmet } from "react-helmet-async";
import Loading from "../../shared/Loading/Loading";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PropertyBought = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["boughtProperties", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/offers/buyer?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading)
    return (
      <div className="text-center">
        <Loading></Loading>
      </div>
    );
  return (
    <div className="px-4 md:px-10 py-8 bg-blue-50 min-h-screen">
      <Helmet>
        <title>Bought Properties | BrickBase</title>
      </Helmet>
      <h1 className="text-3xl md:text-5xl font-semibold mb-6 text-center">
        Your Offered Properties
      </h1>

      {properties.length === 0 ? (
        <p className="text-center text-gray-600">No properties found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div
              key={property._id}
              className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-200"
            >
              <img
                src={property.propertyImage}
                alt={property.propertyTitle}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 space-y-2">
                <h2 className="text-xl font-semibold text-blue-800">
                  {property.propertyTitle}
                </h2>
                <p className="text-gray-600">
                  <span className="font-medium">Location:</span>{" "}
                  {property.propertyLocation}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Agent:</span>{" "}
                  {property.agentName}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Offered Amount:</span> ৳
                  {property.offerAmount}
                </p>
                <p
                  className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                    property.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : property.status === "accepted"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {property.status}
                </p>

                {property.status === "accepted" ? (
                  <button
                    onClick={() =>
                      navigate(`/payment/${property._id}`, {
                        state: { amount: property.offerAmount },
                      })
                    }
                    className="w-full mt-3 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                  >
                    Pay
                  </button>
                ) : null}

                {property.status === "bought" && property.transactionId && (
                  <p className="text-green-600 text-sm mt-2">
                    Transaction ID: {property.transactionId}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyBought;
