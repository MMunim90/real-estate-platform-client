import { Link } from "react-router";
import { MdVerified } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";

const PropertyCard = ({ property }) => {
  return (
    <div className="bg-white rounded shadow-lg overflow-hidden border border-gray-400">
      <img src={property.image} alt={property.title} className="w-full h-56 object-cover" />

      <div className="p-5 space-y-2">
        <h3 className="text-xl font-semibold text-black">{property.title}</h3>
        <p className="text-gray-600 flex items-center space-x-2">
          <span className="font-medium">Location:</span> <CiLocationOn className="mr-1" /> {property.location}
        </p>

        <div className="flex items-center gap-3 mt-2">
          <img
            src={property.agentImage}
            alt="Agent"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-medium text-black">{property.agentName}</p>
            <p className="text-xs text-green-600 font-semibold">Verified Agent</p>
          </div>
        </div>

        <p className="text-sm text-gray-700">
          <span className="font-medium">Price Range:</span> {property.minRate} - {property.maxRate}
        </p>

        <p className="flex items-center gap-2 text-sm text-black font-semibold"><MdVerified className="text-blue-500 text-2xl inline"/> Verified</p>

        <div className="pt-4">
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

export default PropertyCard;
