import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaUpload } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const AddProperty = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();
  const [imagePreview, setImagePreview] = useState(null);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);

    try {
      // Upload image to your server or cloud service
      const uploadRes = await axiosSecure.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const imageUrl = uploadRes.data?.url;

      const propertyInfo = {
        title: data.title,
        location: data.location,
        image: imageUrl,
        agentName: user.displayName,
        agentEmail: user.email,
        priceRange: data.priceRange,
        status: "available",
        createdAt: new Date(),
      };

      await axiosSecure.post("/properties", propertyInfo);
      toast.success("Property added successfully!");
      reset();
      setImagePreview(null);
    } catch (error) {
      console.error(error);
      toast.error("Failed to add property");
    }
  };

  const handleImagePreview = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center bg-blue-50">
      <h2 className="text-3xl lg:text-5xl font-semibold text-center mb-8 mt-8 lg:mt-4">
        Add New Property
      </h2>
      <p className="text-center text-gray-600 text-base lg:text-lg max-w-2xl mx-auto mb-6">
        Fill out the form below to list a new property. Make sure all the
        details are accurate before submission.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 p-6"
      >
        {/* Title */}
        <div className="col-span-1">
          <label className="block mb-1 font-medium">Property Title</label>
          <input
            type="text"
            {...register("title", { required: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter property title"
          />
        </div>

        {/* Location */}
        <div className="col-span-1">
          <label className="block mb-1 font-medium">Location</label>
          <input
            type="text"
            {...register("location", { required: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter location"
          />
        </div>

        {/* Image Upload */}
        <div className="col-span-1">
          <label className="block mb-1 font-medium">Property Image</label>
          <input
            type="file"
            accept="image/*"
            {...register("image", { required: true })}
            onChange={handleImagePreview}
            className="w-full text-sm file:px-4 file:py-2 border border-gray-300 rounded file:bg-blue-500 file:text-white file:cursor-pointer file:hover:bg-blue-600"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-2 rounded w-full h-40 object-cover"
            />
          )}
        </div>

        {/* Price Range */}
        <div className="col-span-1">
          <label className="block mb-1 font-medium">Price Range</label>
          <input
            type="text"
            {...register("priceRange", { required: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ex: $100,000 - $150,000"
          />
        </div>

        {/* Agent Name */}
        <div className="col-span-1">
          <label className="block mb-1 font-medium">Agent Name</label>
          <input
            type="text"
            value={user?.displayName}
            readOnly
            className="w-full input input-bordered bg-gray-100 border border-gray-300"
          />
        </div>

        {/* Agent Email */}
        <div className="col-span-1">
          <label className="block mb-1 font-medium">Agent Email</label>
          <input
            type="email"
            value={user?.email}
            readOnly
            className="w-full input input-bordered bg-gray-100 border border-gray-300"
          />
        </div>

        {/* Submit Button */}
        <div className="col-span-1 md:col-span-2 text-center mt-4">
          <button
            type="submit"
            className="btn bg-blue-500 hover:bg-blue-600 border-none px-6 py-2 text-white"
          >
            <FaUpload className="mr-2" />
            Add Property
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProperty;
