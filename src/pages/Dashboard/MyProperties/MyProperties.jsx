import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const MyProperties = () => {
  const { user } = useAuth();
  const [properties, setProperties] = useState([]);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/properties?agentEmail=${user.email}`).then((res) => {
        setProperties(res.data);
      });
    }
  }, [user, axiosSecure]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/properties/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Your property has been deleted.", "success");
            setProperties(properties.filter((p) => p._id !== id));
          }
        });
      }
    });
  };

  const handleUpdate = (id) => {
    navigate(`/dashboard/update-property/${id}`);
  };
  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold my-12 text-center">
        My Added Properties
      </h2>

      {properties.length === 0 ? (
        <p className="text-center text-gray-500">
          You haven't added any properties yet.
        </p>
      ) : (
        <div>
          <p className="text-md md:text-2xl text-black mb-6">
            Property Added({properties.length})
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <div
                key={property._id}
                className="bg-white rounded shadow-md overflow-hidden flex flex-col border border-gray-400"
              >
                <img
                  src={property.image}
                  alt={property.title}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold">{property.title}</h3>
                    <p className="text-sm text-gray-600">{property.location}</p>

                    <div className="flex items-center gap-2 mt-2">
                      <img
                        src={property.agentImage}
                        alt={property.agentName}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="text-sm text-gray-700">
                        {property.agentName}
                      </span>
                    </div>

                    <p className="mt-2 text-sm">
                      <span className="font-medium">Status:</span>{" "}
                      <span
                        className={`px-2 py-1 rounded-full text-white text-xs ${
                          property.status === "verified"
                            ? "badge badge-success"
                            : property.status === "available"
                            ? "badge badge-warning"
                            : "badge badge-error"
                        }`}
                      >
                        {property.status === "available" ? "pending" : property.status}
                      </span>
                    </p>

                    <p className="mt-2 text-sm">
                      <span className="font-medium">Price Range: </span>
                      {property.minRate}৳ - {property.maxRate}৳
                    </p>
                  </div>

                  <div className="mt-4 flex justify-between gap-2">
                    {property.status !== "rejected" && (
                      <button
                        onClick={() => handleUpdate(property._id)}
                        className="flex-1 bg-blue-500 text-white py-1 rounded hover:bg-blue-600 text-sm"
                      >
                        Update
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(property._id)}
                      className="flex-1 bg-red-500 text-white py-1 rounded hover:bg-red-600 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProperties;
