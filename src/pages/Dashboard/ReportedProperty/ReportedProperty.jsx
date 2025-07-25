import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router";
import { GoLinkExternal } from "react-icons/go";

const ReportedProperty = () => {
  const axiosSecure = useAxiosSecure();
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axiosSecure.get("/reports");
        setReports(res.data || []);
      } catch (error) {
        console.error("Failed to fetch reports", error);
      }
    };
    fetchReports();
  }, [axiosSecure]);

  const handleRemoveProperty = async (propertyId) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This will delete the property, its reviews, reports, ads, and wishlists!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
      });

      if (!result.isConfirmed) return;

      // Send one DELETE request to handle all deletions
      const res = await axiosSecure.delete(
        `/admin/remove-property/${propertyId}`
      );

      if (res.data.success) {
        Swal.fire(
          "Deleted!",
          `Property, ${res.data.reviewsDeleted} reviews, ${res.data.reportsDeleted} reports, ${res.data.adsDeleted} ads, and ${res.data.wishlistsDeleted} wishlist items deleted.`,
          "success"
        );
        setReports((prev) => prev.filter((r) => r.propertyId !== propertyId));
      } else {
        Swal.fire("Error", "Property not found or already deleted.", "error");
      }
    } catch (error) {
      console.error("Failed to remove property", error);
      Swal.fire("Failed", "Something went wrong while deleting.", "error");
    }
  };

  const handleRemoveReport = async (reportId) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This will delete the report only.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
      });

      if (!result.isConfirmed) return;

      const res = await axiosSecure.delete(`/reports/${reportId}`);
      if (res.data.success) {
        Swal.fire("Deleted!", "Report has been removed.", "success");
        setReports((prev) => prev.filter((r) => r._id !== reportId));
      } else {
        Swal.fire("Error", "Report not found or already deleted.", "error");
      }
    } catch (err) {
      console.error("Failed to delete report", err);
      Swal.fire("Failed", "Something went wrong while deleting.", "error");
    }
  };

  return (
    <div className="p-4 md:p-8 bg-blue-50 min-h-screen">
      <Helmet>
        <title>Reported Properties | Admin Panel</title>
      </Helmet>
      <h2 className="text-3xl md:text-5xl font-semibold mb-6 text-center">
        Reported Properties
      </h2>

      {reports.length === 0 ? (
        <p className="text-center text-gray-500">
          No reported properties found.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report) => (
            <div
              key={report._id}
              className="bg-white p-4 rounded-xl shadow-md border border-gray-200"
            >
              <div className="flex justify-between items-center">
                <p>
                  <span className="font-semibold">Reporter:</span>{" "}
                  {report.userName} ({report.userEmail})
                </p>

                <Link
                  to={`/properties/${report.propertyId}`}
                  className="text-blue-500 hover:text-blue-600"
                >
                  <GoLinkExternal size={20} />
                </Link>
              </div>
              <p>
                <span className="font-semibold">Property:</span>{" "}
                {report.propertyTitle}
              </p>
              <p>
                <span className="font-semibold">Agent:</span> {report.agentName}
              </p>
              <p>
                <span className="font-semibold">Reason:</span> {report.reason}
              </p>
              <div className="flex gap-4">
                <button
                onClick={() => handleRemoveProperty(report.propertyId)}
                className="mt-4 w-full py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Remove property
              </button>

              <button
                onClick={() => handleRemoveReport(report._id)}
                className="mt-4 w-full py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
              >
                Remove report
              </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReportedProperty;
