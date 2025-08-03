import { MdVerified } from "react-icons/md";
import { Link } from "react-router";
import { CiLocationOn } from "react-icons/ci";

const AdvertisementCard = ({ property }) => {
  return (
    <div className="bg-blue-50 rounded shadow-md border border-gray-400 overflow-hidden flex flex-col">
      <div className="relative">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-52 object-cover"
        />
        {property.installments && (
          <span className="absolute top-2 right-0 bg-blue-600 text-white text-xs px-3 py-1 rounded-l-full shadow-md">
            Monthly Installments - {property.installments}/-
          </span>
        )}
      </div>

      <div className="p-4 flex flex-col flex-grow space-y-2">
        <h1 className="text-xl font-semibold text-black">{property.title}</h1>
        <p className="text-gray-800 flex items-center">
          <CiLocationOn className="mr-1" /> {property.location}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Price Range:</span> {property.minRate} - {property.maxRate}
        </p>
        <p className="flex items-center gap-2 text-sm text-black font-semibold">
          <MdVerified className="text-blue-500 text-2xl inline" /> Verified
        </p>

        {/* Spacer pushes button to bottom */}
        <div className="mt-auto pt-3">
          <Link to={`/properties/${property.propertyId}`}>
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-all">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdvertisementCard;