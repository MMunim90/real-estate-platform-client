import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router";
import { Helmet } from "react-helmet-async";
import Loading from "../../shared/Loading/Loading";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import logo from "../../../assets/logo.png";
import { BsInfoLg } from "react-icons/bs";

const PropertyBought = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [offerInfo, setOfferInfo] = useState(null);
  const [showInfoModal, setShowInfoModal] = useState(false);

  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["boughtProperties", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/offers?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const { isPending, data: payments = [] } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleShowInfo = async (property) => {
    try {
      const res = await axiosSecure.get(
        `/offers/by-property/${property.propertyId}`
      );
      const offers = res.data || [];

      const topOffer = offers.reduce(
        (max, curr) => (curr.offerAmount > max.offerAmount ? curr : max),
        { offerAmount: 0 }
      );

      const userOffersRes = await axiosSecure.get(
        `/offers?email=${user.email}`
      );
      const userOffers = userOffersRes.data || [];

      const userOffer = userOffers.find(
        (o) => o.propertyId === property.propertyId
      );

      const propertyWithUserOffer = {
        ...property,
        offerAmount: userOffer?.offerAmount || "Not Found",
      };

      setOfferInfo({
        topAmount: topOffer.offerAmount,
      });

      setSelectedProperty(propertyWithUserOffer);
      setShowInfoModal(true);
    } catch (error) {
      console.error("Error fetching offer info", error);
    }
  };

  if (isLoading || isPending) {
    return (
      <div className="text-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="px-4 md:px-10 py-8 bg-blue-50 min-h-screen">
      <Helmet>
        <title>Bought Properties | BrickBase</title>
      </Helmet>

      <div className="breadcrumbs text-xs md:text-sm text-gray-800 mb-4 self-start md:self-center">
          <ul className="flex gap-2">
            <li>
              <Link to="/" className="hover:underline font-medium">
                Home
              </Link>
            </li>
            <li className="text-gray-700 font-medium"><Link to="/dashboard/profile">Dashboard</Link></li>
            <li className="text-gray-700 font-medium">Property Bought</li>
          </ul>
        </div>

      <h1 className="text-3xl md:text-5xl font-semibold mb-8 text-center">
        Your Offered Properties
      </h1>
      {properties.length === 0 ? (
        <p className="text-center text-gray-600">No properties found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => {
            const payment = payments.find(
              (p) =>
                p.propertyId === property.propertyId 
            );

            return (
              <div
                key={property._id}
                className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-200 flex flex-col"
              >
                <div className="relative">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="h-48 w-full object-cover"
                  />
                  <button
                    onClick={() => handleShowInfo(property)}
                    className="absolute top-2 right-2 text-black p-1 rounded-full hover:text-white bg-white hover:bg-black"
                    title="View Info"
                  >
                    <BsInfoLg size={25} />
                  </button>
                </div>

                <div className="p-4 space-y-2 flex flex-col h-full">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-black">
                      {property.title}
                    </h2>
                    <p
                      className={`inline-block px-3 rounded-full text-sm font-semibold ${
                        property.status === "pending"
                          ? "badge badge-warning"
                          : property.status === "accepted" || property.status === "paid"
                          ? "badge badge-success"
                          : "badge badge-error"
                      }`}
                    >
                      {property.status === "paid" ? "bought" : property.status}
                    </p>
                  </div>
                  <p className="text-gray-600">
                    <span className="font-medium">Location:</span>{" "}
                    {property.location}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Agent:</span>{" "}
                    {property.agentName}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Offered Amount:</span> ৳
                    {property.offerAmount}
                  </p>

                  {property.status === "accepted" && (
                    <button
                      onClick={() =>
                        navigate(`/dashboard/payment/${property._id}`, {
                          state: { amount: property.offerAmount, property },
                        })
                      }
                      className="mt-auto bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                    >
                      <div className="flex justify-center gap-3 items-center">
                        <img className="w-6 h-6 inline" src={logo} />{" "}
                        <p>Brick Pay</p>
                      </div>
                    </button>
                  )}

                  {property.status === "paid" && payment?.transactionId && (
                    <p className="text-green-600 text-lg">
                      Transaction ID: {payment.transactionId}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showInfoModal && selectedProperty && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 px-4">
          <div className="bg-white p-6 rounded w-full max-w-md shadow-lg space-y-6 relative">
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-300">
              <div className="flex items-center space-x-2">
                <img src={logo} alt="BrickBase Logo" className="w-8 h-8" />
                <span className="font-bold text-xl text-gray-800">
                  BrickBase
                </span>
              </div>
              <button
                onClick={() => setShowInfoModal(false)}
                className="text-gray-700 hover:text-red-600 text-3xl font-bold"
              >
                ×
              </button>
            </div>

            <h3 className="text-2xl font-semibold text-center text-gray-800">
              Offer Information
            </h3>

            <div className="text-center text-gray-600 space-y-2">
              <p>
                <span className="font-semibold">You Offered:</span> ৳
                {selectedProperty?.offerAmount}
              </p>
              <p>
                <span className="font-semibold">Top Offered:</span> ৳
                {offerInfo?.topAmount}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyBought;
