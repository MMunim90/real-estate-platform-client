import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import Loading from "../shared/Loading/Loading";
import { Helmet } from "react-helmet-async";
import useUserRole from "../../hooks/useUserRole";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { MdOutlineStar } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import logo from '../../assets/logo.png'

const PropertyDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { role } = useUserRole();
  const axiosSecure = useAxiosSecure();
  const [property, setProperty] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuth();
  const [hasWishlisted, setHasWishlisted] = useState(false);
  const [hasReviewed, setHasReviewed] = useState(false);

  const emojiOptions = [
    { value: 5, label: "😊", title: "Excellent" },
    { value: 4, label: "🙂", title: "Good" },
    { value: 3, label: "😐", title: "Medium" },
    { value: 2, label: "☹️", title: "Poor" },
    { value: 1, label: "😞", title: "Terrible" },
  ];

  const [selectedRating, setSelectedRating] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axiosSecure.get(`/properties/${id}`);
        setProperty(res.data);
      } catch (err) {
        console.error("Error fetching property details", err);
      }
    };

    const fetchReviews = async () => {
      try {
        const res = await axiosSecure.get(`/reviews?propertyId=${id}`);
        setReviews(res.data);
        if (user) {
          const reviewed = res.data.some((r) => r.userEmail === user.email);
          setHasReviewed(reviewed);
        }
      } catch (err) {
        console.error("Error fetching reviews", err);
      }
    };

    const checkWishlist = async () => {
      try {
        if (user) {
          const res = await axiosSecure.get(`/wishlist?email=${user.email}`);
          const wishlisted = res.data.some((item) => item.propertyId === id);
          setHasWishlisted(wishlisted);
        }
      } catch (err) {
        console.error("Error checking wishlist", err);
      }
    };

    fetchProperty();
    fetchReviews();
    checkWishlist();
  }, [id, axiosSecure, user]);

  const handleWishlist = async () => {
    try {
      await axiosSecure.post("/wishlist", {
        propertyId: property._id,
        userEmail: user.email,
        title: property.title,
        image: property.image,
        location: property.location,
        minRate: property.minRate,
        maxRate: property.maxRate,
        agentName: property.agentName,
        agentImage: property.agentImage,
        status: property.status,
      });
      Swal.fire({
        title: "Added to wishlist!",
        icon: "success",
      });
    } catch (err) {
      console.error("Failed to add to wishlist", err);
    }
  };

  const handleReviewSubmit = async (reviewData) => {
    try {
      await axiosSecure.post("/reviews", {
        propertyId: id,
        ...reviewData,
      });
      setShowModal(false);
      const res = await axiosSecure.get(`/reviews?propertyId=${id}`);
      setReviews(res.data);
      setHasReviewed(true);
    } catch (err) {
      console.error("Error adding review", err);
    }
  };

  if (!property)
    return (
      <div className="text-center py-10">
        <Loading></Loading>
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col justify-center max-w-6xl mx-auto p-4 md:p-10">
      <Helmet>
        <title>Property Detail | BrickBase</title>
      </Helmet>
      <div className="grid md:grid-cols-2 gap-8">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-80 object-cover rounded"
        />

        <div className="space-y-4">
          <h1 className="text-3xl lg:text-5xl font-bold">{property.title}</h1>
          {/* <p className="text-gray-600">{property.description}</p> */}
          <p className="text-lg font-semibold text-blue-500">
            Price Range: {property.minRate} - {property.maxRate}
          </p>
          <p className="text-md text-green-600 font-medium">
            Agent: {property.agentName}
          </p>

          {role === "user" ? (
            <button
              onClick={handleWishlist}
              disabled={hasWishlisted}
              className={`${
                hasWishlisted
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              } text-white px-5 py-2 rounded`}
            >
              {hasWishlisted ? "Already in Wishlist" : "Add to Wishlist"}
            </button>
          ) : (
            <button
              disabled
              title="Only user can add to wishlist"
              className="bg-gray-400 text-white px-5 py-2 rounded cursor-not-allowed"
            >
              Wishlist (User Only)
            </button>
          )}
        </div>
      </div>

      <div className="mt-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Reviews</h2>
          <div className="flex flex-col md:flex-row gap-4">
            {role === "user" ? (
              <button
                onClick={() => setShowModal(true)}
                disabled={hasReviewed}
                className={`${
                  hasReviewed
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600"
                } text-white px-4 py-2 rounded`}
              >
                {hasReviewed ? "Review Submitted" : "Add a Review"}
              </button>
            ) : (
              <button
                disabled
                title="Only user can add review"
                className="bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed"
              >
                Review (User Only)
              </button>
            )}

            <div>
              <button
                onClick={() => navigate(-1)}
                className="hidden text-white px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 lg:block"
              >
                Back
              </button>
            </div>
          </div>
        </div>

        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet.</p>
        ) : (
          <div>
            {reviews.map((review) => (
              <div key={review._id} className="py-2">
                <p className="flex items-center gap-1">
                  {review.comment} {review.rating}
                  <MdOutlineStar />
                </p>
                <p className="text-sm">- {review.userName}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <button
        onClick={() => navigate(-1)}
        className="max-w-md w-full mx-auto mt-10 text-white px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 lg:hidden"
      >
        Back
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 px-4">
          <div className="bg-white p-6 rounded w-full max-w-md shadow-lg space-y-6 relative">
            {/* Header Bar */}
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-300">
              {/* Logo and Title */}
              <div className="flex items-center space-x-2">
                <img src={logo} alt="BrickBase Logo" className="w-8 h-8" />
                <span className="font-bold text-xl text-gray-800">
                  BrickBase
                </span>
              </div>

              {/* Close Button (X) */}
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-700 hover:text-red-600 text-2xl font-bold"
                aria-label="Close"
              >
                <RxCross2 />
              </button>
            </div>

            {/* Title and Description */}
            <h3 className="text-2xl font-semibold text-center text-gray-800">
              How are you feeling?
            </h3>
            <p className="text-center text-gray-500 text-sm">
              Let us and future buyers know what you think—your insights shape better property experiences for everyone.
            </p>

            {/* Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target;
                const comment = form.comment.value.trim();
                const rating = selectedRating;

                if (!comment || !rating) {
                  return Swal.fire(
                    "Error",
                    "Please provide comment and rating.",
                    "error"
                  );
                }

                handleReviewSubmit({
                  comment,
                  rating: parseInt(rating),
                  userEmail: user.email,
                  userName: user.displayName || "Anonymous",
                  userImage: user.photoURL,
                  propertyTitle: property.title,
                  agentName: property.agentName,
                  createdAt: new Date().toISOString(),
                });
              }}
              className="space-y-4"
            >
              {/* Emoji Rating Selection */}
              <div className="flex justify-center gap-4 mb-8">
                {emojiOptions.map((emoji) => (
                  <div key={emoji.value} className="relative group">
                    <button
                      type="button"
                      onClick={() => setSelectedRating(emoji.value)}
                      className={`
          text-3xl transition-transform duration-200
          ${
            selectedRating === emoji.value
              ? "scale-150 text-yellow-500"
              : "text-gray-500"
          }
          hover:scale-150 hover:text-yellow-500
        `}
                      title={emoji.title}
                    >
                      {emoji.label}
                    </button>
                    <span className="absolute text-sm text-gray-600 left-1/2 transform -translate-x-1/2 mt-10 opacity-0 group-hover:opacity-100 transition">
                      {emoji.title}
                    </span>
                  </div>
                ))}
              </div>

              {/* Comment Box */}
              <textarea
                name="comment"
                placeholder="Add a Comment..."
                className="w-full border border-gray-300 p-3 rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                rows="4"
                required
              ></textarea>

              {/* Submit Button Only */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="w-full py-2 rounded bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold hover:opacity-90 transition"
                >
                  Submit Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetails;
