import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { Helmet } from "react-helmet-async";
import Loading from "../../shared/Loading/Loading";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.email) return;

    const fetchWishlist = async () => {
      try {
        const res = await axiosSecure.get(`/wishlist?email=${user.email}`);
        setWishlist(res.data);
      } catch (error) {
        console.error("Failed to fetch wishlist", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [user?.email, axiosSecure]);

  const handleRemove = async (id) => {
    try {
      const res = await axiosSecure.delete(`/wishlist/${id}`);
      if (res.data.deletedCount > 0) {
        setWishlist((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (error) {
      console.error("Failed to remove from wishlist", error);
    }
  };

  const handleOffer = (propertyId) => {
    navigate(`/dashboard/my-offer/${propertyId}`);
  };

  if (loading) return <div className="text-center mt-10"><Loading></Loading></div>;

  return (
    <div className="px-4 py-8 max-w-6xl mx-auto">
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
        <div className="flex flex-col gap-6">
            <p className="text-md md:text-2xl text-black mb-6">
              Wishlist list({wishlist.length})
            </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-between mb-6 gap-4">
            {wishlist.map((property) => (
              <div
                key={property._id}
                className="bg-white shadow rounded overflow-hidden flex flex-col border border-gray-400"
              >
                <img
                  src={property.image}
                  alt={property.title}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {property.title}
                    </h3>
                    <p className="text-gray-500 text-sm">{property.location}</p>

                    <div className="mt-3 flex items-center gap-3">
                      <img
                        src={property.agentImage}
                        alt={property.agentName}
                        className="w-9 h-9 rounded-full"
                      />
                      <div>
                        <p className="font-medium text-gray-700">
                          {property.agentName}
                        </p>
                        <p className="text-sm text-green-600 flex items-center gap-1">
                          {property.status === "verified" && (
                            <>
                              <FaCheckCircle className="text-green-500" />
                              Verified Agent
                            </>
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="text-gray-800 font-semibold">
                        Price: ৳{property.minRate.toLocaleString()} - ৳
                        {property.maxRate.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-between items-center gap-2">
                    <button
                      onClick={() => handleOffer(property._id)}
                      className="flex-1 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                    >
                      Make an Offer
                    </button>
                    <button
                      onClick={() => handleRemove(property._id)}
                      className="py-2 px-4 text-white bg-red-500 rounded hover:bg-red-600 transition"
                      title="Remove"
                    >
                      <FaTrashAlt size={24} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
