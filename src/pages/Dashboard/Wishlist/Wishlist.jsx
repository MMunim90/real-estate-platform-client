import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { Helmet } from "react-helmet-async";
import Loading from "../../shared/Loading/Loading";
import Swal from "sweetalert2";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [offeredProperties, setOfferedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.email) return;

    const fetchWishlistAndOffers = async () => {
      try {
        const [wishlistRes, offerRes] = await Promise.all([
          axiosSecure.get(`/wishlist?email=${user.email}`),
          axiosSecure.get(`/offers?email=${user.email}`),
        ]);

        const offeredIds = offerRes.data.map((offer) => offer.propertyId);
        setOfferedProperties(offeredIds);

        const filteredWishlist = wishlistRes.data.filter(
          (item) => !offeredIds.includes(item.propertyId)
        );
        setWishlist(filteredWishlist);
      } catch (error) {
        console.error("Failed to fetch wishlist or offers", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlistAndOffers();
  }, [user?.email, axiosSecure]);

  const handleRemove = async (id) => {
    try {
      const res = await axiosSecure.delete(`/wishlist/${id}`);
      if (res.data.deletedCount > 0) {
        setWishlist((prev) => prev.filter((item) => item._id !== id));
        Swal.fire("Removed!", "Property removed from wishlist.", "success");
      }
    } catch (error) {
      console.error("Remove error:", error);
      Swal.fire("Error", "Failed to remove property.", "error");
    }
  };

  const handleOffer = (propertyId) => {
    navigate(`/dashboard/my-offer/${propertyId}`);
  };

  if (loading)
    return (
      <div className="text-center">
        <Loading />
      </div>
    );

  return (
    <div className="min-h-screen px-4 py-8 max-w-6xl mx-auto">
      <Helmet>
        <title>Wishlist | BrickBase</title>
      </Helmet>
      <h2 className="text-3xl md:text-5xl font-bold mb-6 text-center text-gray-800">
        Your Wishlist
      </h2>

      {wishlist.length === 0 ? (
        <p className="text-center text-gray-500">
          No properties added to wishlist yet.
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          <p className="text-md md:text-2xl text-black mb-6">
            Wishlist list ({wishlist.length})
          </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((property) => {
            const isOffered = offeredProperties.includes(property._id);
            return (
              <div
                key={property._id}
                className="bg-white border border-gray-300 rounded-lg shadow-md flex flex-col overflow-hidden"
              >
                <img
                  src={property.image}
                  alt={property.title}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      {property.title}
                    </h3>
                    <p className="text-sm text-gray-600">{property.location}</p>

                    <div className="mt-3 flex items-center gap-3">
                      <img
                        src={property.agentImage}
                        alt={property.agentName}
                        className="w-9 h-9 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-700">
                          {property.agentName}
                        </p>
                        {property.status === "verified" && (
                          <p className="text-sm text-green-600 flex items-center gap-1">
                            <FaCheckCircle className="text-green-500" />
                            Verified Agent
                          </p>
                        )}
                      </div>
                    </div>

                    <p className="mt-4 text-gray-800 font-medium">
                      Price: ৳{property.minRate.toLocaleString()} - ৳
                      {property.maxRate.toLocaleString()}
                    </p>
                  </div>

                  <div className="mt-4 flex justify-between items-center gap-2">
                    <button
                      onClick={() => handleOffer(property._id)}
                      disabled={isOffered}
                      className={`flex-1 py-2 px-4 rounded font-semibold ${
                        isOffered
                          ? "bg-gray-400 text-white cursor-not-allowed"
                          : "bg-blue-500 text-white hover:bg-blue-600"
                      }`}
                    >
                      {isOffered ? "Already Offered" : "Make an Offer"}
                    </button>
                    {!isOffered && (
                      <button
                        onClick={() => handleRemove(property._id)}
                        className="py-3 px-4 text-white bg-red-500 rounded hover:bg-red-600 transition"
                        title="Remove"
                      >
                        <FaTrashAlt />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        </div>
      )}
    </div>
  );
};

export default Wishlist;