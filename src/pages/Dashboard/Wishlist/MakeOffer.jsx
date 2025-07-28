import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../shared/Loading/Loading";
import Swal from "sweetalert2";

const MakeOffer = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [offerAmount, setOfferAmount] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [buyingDate, setBuyingDate] = useState("");

  useEffect(() => {
    // if (!id) return;

    const fetchProperty = async () => {
      try {
        const res = await axiosSecure.get(`/offered/${id}`);
        setProperty(res.data);
      } catch (err) {
        console.error("Failed to fetch property", err);
      }
    };

    fetchProperty();
  }, [id, axiosSecure]);

  const handleOffer = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const offer = parseInt(offerAmount);

    if (offer < property.minRate || offer > property.maxRate) {
      setError("Offer must be within the specified price range.");
      Swal.fire({
        icon: "error",
        title: "Invalid Offer",
        text: "Offer must be within the specified price range.",
      });
      return;
    }

    const offerData = {
      propertyId: property.propertyId,
      title: property.title,
      location: property.location,
      image: property.image,
      agentName: property.agentName,
      agentEmail: property.agentEmail,
      buyerEmail: user.email,
      buyerName: user.displayName,
      offerAmount: offer,
      buyingDate,
    };

    try {
      await axiosSecure.post("/offers", offerData);
      setSuccess("Offer successfully submitted.");
      setOfferAmount("");
      setBuyingDate("");

      // Redirect back after a short delay
      setTimeout(() => {
        navigate(-1);
      }, 1000);

      Swal.fire({
        icon: "success",
        title: "Offer Submitted",
        text: "Your offer has been successfully submitted.",
        timer: 1800,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error(err);
      setError("Failed to submit the offer.");

      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "Something went wrong. Please try again later.",
      });
    }
  };

  if (!property)
    return (
      <div className="text-center py-20">
        <Loading></Loading>
      </div>
    );

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 py-10">
      <Helmet>
        <title>Make an Offer | BrickBase</title>
      </Helmet>
      <h2 className="text-3xl md:text-5xl font-semibold mb-6 text-center">
        Make an Offer
      </h2>
      <form onSubmit={handleOffer} className="p-6 space-y-4">
        <input
          type="text"
          readOnly
          value={property.title}
          className="input input-bordered w-full bg-white border border-gray-400"
        />
        <input
          type="text"
          readOnly
          value={property.location}
          className="input input-bordered w-full bg-white border border-gray-400"
        />
        <input
          type="text"
          readOnly
          value={property.agentName}
          className="input input-bordered w-full bg-white border border-gray-400"
        />
        <input
          type="text"
          readOnly
          value={property.agentEmail}
          className="input input-bordered w-full bg-white border border-gray-400"
        />
        <input
          type="number"
          placeholder={`Enter offer amount (between ${property.minRate} and ${property.maxRate})`}
          className="input input-bordered w-full bg-white border border-gray-400"
          value={offerAmount}
          onChange={(e) => setOfferAmount(e.target.value)}
        />
        <input
          type="email"
          readOnly
          value={user.email}
          className="input input-bordered w-full bg-white border border-gray-400"
        />
        <input
          type="text"
          readOnly
          value={user.displayName}
          className="input input-bordered w-full bg-white border border-gray-400"
        />
        <input
          type="date"
          className="input input-bordered w-full bg-white border border-gray-400"
          value={buyingDate}
          onChange={(e) => setBuyingDate(e.target.value)}
          required
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">{success}</p>}
        <div className="flex gap-4 justify-evenly">
          <button type="submit" className="btn btn-primary w-1/2">
            Offer
          </button>
          <button
            onClick={() => navigate(-1)}
            className="text-white px-4 py-2 rounded bg-gray-400 hover:bg-gray-500 w-1/2"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default MakeOffer;
