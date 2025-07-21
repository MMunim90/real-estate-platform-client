import { MdVerified } from "react-icons/md";
import { Link } from "react-router";

const AdvertisementCard = ({ property }) => {
  return (
    <div className="bg-blue-50 rounded shadow-md border border-gray-400 overflow-hidden">
      <img
        src={property.image}
        alt={property.title}
        className="w-full h-52 object-cover"
      />

      <div className="p-4 space-y-2">
        <h1 className="text-xl font-semibold text-black">{property.title}</h1>
        <p className="text-md text-gray-800">
          {property.location}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Price Range:</span>{" "}
          {property.priceRange}
        </p>

        <p className="flex items-center gap-2 text-sm text-black font-semibold">
          <MdVerified className="text-blue-500 text-2xl inline" /> Verified
        </p>

        <div className="pt-3">
          <Link to={`/properties/${property._id}`}>
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
