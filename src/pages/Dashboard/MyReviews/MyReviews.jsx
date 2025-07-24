import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const MyReviews = () => {
  const [reviews, setReviews] = useState([]);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/myReviews?email=${user.email}`)
        .then((res) => setReviews(res.data))
        .catch((err) => console.error("Failed to fetch reviews:", err));
    }
  }, [user?.email, axiosSecure]);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This review will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.delete(`/myReviews/${id}`);
        setReviews(reviews.filter((review) => review._id !== id));
        Swal.fire("Deleted!", "Your review has been deleted.", "success");
      } catch (err) {
        console.error("Delete failed:", err);
        Swal.fire("Error", "Something went wrong", "error");
      }
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-10">
      <Helmet>
        <title>My Reviews | BrickBase</title>
      </Helmet>

      <h2 className="text-3xl md:text-5xl font-bold mb-6 text-center">
        My Reviews
      </h2>

      {reviews.length === 0 ? (
        <p className="text-center text-gray-500">You haven't given any reviews yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="bg-white shadow-md rounded p-6 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-semibold text-black mb-1">
                  {review.propertyTitle}
                </h3>
                <p className="text-sm text-gray-600 mb-6">
                  <span className="font-medium">Agent:</span> {review.agentName}
                </p>
                <div className="text-sm text-gray-500 mb-2 flex items-center gap-2">
                  <span className="font-medium"><p className="text-xl">🗓️</p></span>{" "}
                  {new Date(review.createdAt).toLocaleString()}
                </div>
                <div className="text-gray-700 italic flex items-center gap-2"><p className="text-xl">🗨️</p>"{review.comment}"</div>
              </div>
              <button
                onClick={() => handleDelete(review._id)}
                className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md self-start transition"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReviews;
