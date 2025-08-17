import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router";

const SoldProperties = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [soldProperties, setSoldProperties] = useState([]);
  const [totalSoldAmount, setTotalSoldAmount] = useState(0);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/sold-properties?agentEmail=${user.email}`)
        .then((res) => {
          setSoldProperties(res.data);

          // Calculate total sold amount
          const total = res.data.reduce(
            (sum, property) => sum + (property.soldPrice || 0),
            0
          );
          setTotalSoldAmount(total);
        })
        .catch((err) => console.error("Failed to fetch sold properties", err));
    }
  }, [user, axiosSecure]);

  return (
    <div className="min-h-screen px-4 md:px-10 py-6">
      <Helmet>
        <title>My Sold Properties | Dashboard</title>
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
          <li className="text-gray-700 font-medium">My Sold Properties</li>
        </ul>
      </div>

      <h2 className="text-3xl md:text-5xl font-semibold text-gray-800 mb-6">
        My Sold Properties
      </h2>

      {/* Total Sold Amount */}
      <div className="mb-6 bg-green-100 text-green-800 border border-green-400 rounded p-4 text-lg font-medium shadow">
        Total Sold Amount: <span className="font-bold">৳ {totalSoldAmount}</span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded shadow-lg bg-white border border-gray-400">
        <table className="min-w-full text-left text-sm text-gray-700">
          <thead className="bg-blue-200 text-gray-800">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Buyer Name</th>
              <th className="px-4 py-3">Buyer Email</th>
              <th className="px-4 py-3">Sold Price</th>
            </tr>
          </thead>
          <tbody>
            {soldProperties.length > 0 ? (
              soldProperties.map((property) => (
                <tr
                  key={property.propertyId}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3">{property.title}</td>
                  <td className="px-4 py-3">{property.location}</td>
                  <td className="px-4 py-3">{property.buyerName}</td>
                  <td className="px-4 py-3">{property.buyerEmail}</td>
                  <td className="px-4 py-3">${property.soldPrice}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No sold properties found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SoldProperties;
