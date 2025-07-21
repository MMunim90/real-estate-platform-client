import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import ReviewModal from "./ReviewModal";

const PropertyDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [property, setProperty] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [showModal, setShowModal] = useState(false);

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
        title: property.title,
        image: property.image,
        priceRange: property.priceRange,
        agentName: property.agentName,
      });
      alert("Added to wishlist!");
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

  if (!property) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-10">
      <div className="grid md:grid-cols-2 gap-8">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-80 object-cover rounded-lg"
        />

        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">{property.title}</h1>
          <p className="text-gray-600">{property.description}</p>
          <p className="text-lg font-semibold text-blue-700">
            Price Range: {property.priceRange}
          </p>
          <p className="text-md text-green-600 font-medium">
            Agent: {property.agentName}
          </p>

          <button
            onClick={handleWishlist}
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
          >
            Add to Wishlist
          </button>
        </div>
      </div>

      <div className="mt-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Reviews</h2>
          <button
            onClick={() => setShowModal(true)}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Add a Review
          </button>
        </div>

        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet.</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="bg-gray-100 p-4 rounded shadow"
              >
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
