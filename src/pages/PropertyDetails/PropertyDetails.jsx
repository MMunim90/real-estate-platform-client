import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import ReviewModal from "./ReviewModal";
import Loading from "../shared/Loading/Loading";
import { Helmet } from "react-helmet-async";
import useUserRole from "../../hooks/useUserRole";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const PropertyDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { role } = useUserRole();
  const axiosSecure = useAxiosSecure();
  const [property, setProperty] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const {user} = useAuth()

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
      } catch (err) {
        console.error("Error fetching reviews", err);
      }
    };

    fetchProperty();
    fetchReviews();
  }, [id, axiosSecure]);

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
        status: property.status
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
              className="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600"
            >
              Add to Wishlist
            </button>
          ) : (
            <button
              disabled
              title="Only user can added wishlist"
              className="bg-gray-500 text-white px-5 py-2 rounded cursor-not-allowed"
            >
              Add to Wishlist
            </button>
          )}
        </div>
      </div>

      <div className="mt-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Reviews</h2>
          <div className="flex flex-col md:flex-row gap-4">
            {role === 'user' ? (<button
              onClick={() => setShowModal(true)}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Add a Review
            </button>) : (<button
              disabled
              title="Only user can add review"
              className="bg-gray-500 text-white px-4 py-2 rounded cursor-not-allowed"
            >
              Add a Review
            </button>)}
            <div>
              <button
                onClick={() => navigate(-1)}
                className="text-white px-4 py-2 rounded bg-blue-500 hover:bg-blue-600"
              >
                Back
              </button>
            </div>
          </div>
        </div>

        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet.</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review._id} className="bg-gray-100 p-4 rounded shadow">
                <p className="text-gray-800">{review.comment}</p>
                <p className="text-sm text-gray-500">- {review.userName}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <ReviewModal
          onClose={() => setShowModal(false)}
          onSubmit={handleReviewSubmit}
        />
      )}
    </div>
  );
};

export default PropertyDetails;
