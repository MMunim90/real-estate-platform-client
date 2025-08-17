import React from "react";
import ReviewCard from "./ReviewCard";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../shared/Loading/Loading";

const ReviewsSection = () => {
  const axiosPublic = useAxiosPublic();

  const { data: reviews = [], isLoading: reviewsLoading } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosPublic.get("/reviewSection");
      return res.data;
    },
  });

  const { data: propertiesData, isLoading: propertiesLoading } = useQuery({
    queryKey: ["verified-properties"],
    queryFn: async () => {
      const res = await axiosPublic.get("/properties/verified");
      return res.data;
    },
  });

  const properties = propertiesData?.properties || [];

  if (reviewsLoading || propertiesLoading) return <Loading />;

  return (
    <div className="py-10">
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-2">
        Latest User Review
      </h2>
      <p className="max-w-2xl mx-auto mb-8 text-center text-gray-400">
        Check Out the Most Recent Genuine User Reviews and Feedback from Our
        Valued Property Platform Users
      </p>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {reviews.length > 0 ? (
          reviews.map((review) => {
            const property = properties.find(
              (p) => p._id === review.propertyId
            );
            return (
              <ReviewCard
                key={review._id}
                review={review}
                property={property}
              />
            );
          })
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No reviews yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default ReviewsSection;
