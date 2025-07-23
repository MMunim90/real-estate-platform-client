import React from "react";
import { StarIcon } from "lucide-react"; 

const ReviewCard = ({ review }) => {
  const {
    userImage,
    userName,
    userEmail,
    rating,
    comment,
    propertyTitle,
  } = review;

  return (
    <div className="bg-blue-50 shadow-md rounded-2xl p-12 border border-gray-200 hover:shadow-lg transition-all">
      <div className="mb-12">
        <img
          src={userImage}
          alt={userName}
          className="w-18 h-18 rounded-full object-cover border-2 border-blue-500"
        />
      </div>
      <p className="text-md text-gray-700 my-4 italic">"{comment}"</p>

      <div className="mb-4">
          <h4 className="font-bold text-xl text-black">{userName}</h4>
          <p className="text-sm text-gray-500">{userEmail}</p>
        </div>

      <div className="flex items-center gap-1 text-yellow-500 mb-4">
        {Array.from({ length: rating }, (_, i) => (
          <StarIcon key={i} size={16} fill="currentColor" />
        ))}
      </div>

      <div className="text-sm text-gray-500 mt-2">
        <p>Property: {propertyTitle}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
