import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import Loading from "../../shared/Loading/Loading";

const UpdateProperty = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [property, setProperty] = useState(null);

  // Fetch property by ID
  useEffect(() => {
    axiosSecure.get(`/properties/${id}`).then((res) => {
      setProperty(res.data);
    });
  }, [id, axiosSecure]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedProperty = {
      title: form.title.value,
      location: form.location.value,
      installments: form.installments.value,
      image: form.image.value,
      minRate: form.minRate,
      maxRate: form.maxRate,
    };

    try {
      await axiosSecure.patch(`/properties/${id}`, updatedProperty);
      Swal.fire("Success", "Property updated successfully", "success");
    } catch (error) {
      Swal.fire("Error", "Failed to update property", "error");
    }
  };

  if (!property)
    return (
      <div className="text-center mt-10">
        <Loading></Loading>
      </div>
    );

  return (
    <div className="p-4 md:p-8 my-8">
      <Helmet>
        <title>Update Property | BrickBase</title>
      </Helmet>
      <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-center mb-6">
        Update Property
      </h2>
      <form
        onSubmit={handleUpdate}
        className="space-y-6 w-full mx-auto p-6 max-w-7xl"
      >
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block mb-2 text-sm font-medium">
              Property Image URL
            </label>
            <input
              type="text"
              name="image"
              defaultValue={property.image}
              className="w-full px-4 py-2 border border-gray-400 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">
              Property Title
            </label>
            <input
              type="text"
              name="title"
              defaultValue={property.title}
              className="w-full px-4 py-2 border border-gray-400 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Location</label>
            <input
              type="text"
              name="location"
              defaultValue={property.location}
              className="w-full px-4 py-2 border border-gray-400 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">
              Monthly Installments
            </label>
            <input
              type="number"
              name="installments"
              className="w-full px-4 py-2 border border-gray-400 rounded"
              defaultValue={property.installments || ""}
              placeholder="Enter Estimated Monthly installments"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Agent Name</label>
            <input
              type="text"
              name="agentName"
              defaultValue={property.agentName}
              readOnly
              className="w-full px-4 py-2 border border-gray-400 rounded bg-gray-100"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">
              Agent Email
            </label>
            <input
              type="email"
              name="agentEmail"
              defaultValue={property.agentEmail}
              readOnly
              className="w-full px-4 py-2 border border-gray-400 rounded bg-gray-100"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium">
                Minimum Price
              </label>
              <input
                type="number"
                name="minPrice"
                defaultValue={property.minRate}
                className="w-full px-4 py-2 border border-gray-400 rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">
                Maximum Price
              </label>
              <input
                type="number"
                name="maxPrice"
                defaultValue={property.maxRate}
                className="w-full px-4 py-2 border border-gray-400 rounded"
                required
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center space-x-3">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Update
          </button>
          <div
            onClick={() => navigate(-1)}
            className="text-white px-6 py-2 rounded bg-gray-500 hover:bg-gray-600"
          >
            Cancel
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateProperty;
