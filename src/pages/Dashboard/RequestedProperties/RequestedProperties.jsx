import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router";

const RequestedProperties = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [offers, setOffers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await axiosSecure.get(`/offers/agent?email=${user?.email}`);
        setOffers(res.data);
      } catch (error) {
        console.error("Failed to fetch offers", error);
      }
    };

    if (user?.email) fetchOffers();
  }, [user?.email, axiosSecure]);

  const handleAccept = async (offer) => {
    try {
      await axiosSecure.patch(`/offers/${offer._id}/accept`);
      setOffers((prev) =>
        prev.map((o) =>
          o._id === offer._id
            ? { ...o, status: "accepted" }
            : o.propertyId === offer.propertyId
            ? { ...o, status: "rejected" }
            : o
        )
      );
      Swal.fire("Accepted!", "The offer has been accepted.", "success");
    } catch (error) {
      console.error("Accept error", error);
      Swal.fire("Error", "Failed to accept the offer.", "error");
    }
  };

  const handleReject = async (id) => {
    try {
      await axiosSecure.patch(`/offers/${id}/reject`);
      setOffers((prev) =>
        prev.map((o) => (o._id === id ? { ...o, status: "rejected" } : o))
      );
      Swal.fire("Rejected!", "The offer has been rejected.", "info");
    } catch (error) {
      console.error("Reject error", error);
      Swal.fire("Error", "Failed to reject the offer.", "error");
    }
  };

  // Filter offers by title
  const filteredOffers = offers.filter((offer) =>
    offer.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-8 min-h-screen">
      <Helmet>
        <title>Requested Offers | BrickBase</title>
      </Helmet>

      <div className="breadcrumbs text-xs md:text-sm text-gray-800 mb-4 self-start md:self-center">
        <ul className="flex gap-2">
          <li>
            <Link to="/" className="hover:underline font-medium">
              Home
            </Link>
          </li>
          <li className="text-gray-700 font-medium">
            <Link to="/dashboard/profile">Dashboard</Link>
          </li>
          <li className="text-gray-700 font-medium">Requested Properties</li>
        </ul>
      </div>

      <h2 className="text-3xl md:text-5xl font-semibold my-8 text-center">
        Requested/Offered Properties
      </h2>

      {offers.length === 0 ? (
        <p className="text-center text-gray-500">No Offer Property Found</p>
      ) : (
        <div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <p className="text-center text-md md:text-2xl text-black">
              Offer Found ({filteredOffers.length})
            </p>

            <input
              type="text"
              placeholder="Search by property title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-400 px-4 py-2 rounded-md w-full md:w-80"
            />
          </div>

          <div className="overflow-x-auto border border-gray-400">
            <table className="min-w-full shadow rounded overflow-hidden">
              <thead className="bg-blue-200 text-black text-left">
                <tr>
                  <th className="py-3 px-4">Property Title</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Buyer Name</th>
                  <th className="py-3 px-4">Buyer Email</th>
                  <th className="py-3 px-4">Offered Price</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOffers.map((offer) => (
                  <tr
                    key={offer._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-4">{offer.title}</td>
                    <td className="py-3 px-4">{offer.location}</td>
                    <td className="py-3 px-4">{offer.buyerName}</td>
                    <td className="py-3 px-4">{offer.buyerEmail}</td>
                    <td className="py-3 px-4">${offer.offerAmount}</td>
                    <td className="py-3 px-4 capitalize font-medium text-blue-500">
                      {offer.status}
                    </td>
                    <td className="py-3 px-4 space-x-2">
                      {offer.status === "pending" && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleAccept(offer)}
                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleReject(offer._id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestedProperties;