import React from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { FaUpload } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const AddProperty = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();
  const [imagePreview, setImagePreview] = useState(null);
  const imageUploadKey = import.meta.env.VITE_image_upload_key;

  const mutation = useMutation({
    mutationFn: async (data) => {
      const formData = new FormData();
      formData.append("image", data.image[0]);

      const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${imageUploadKey}`;

      // Upload image to imgbb
      const res = await axios.post(imageUploadUrl, formData);
      const imageUrl = res.data?.data?.url;

      const propertyInfo = {
        title: data.title,
        location: data.location,
        image: imageUrl,
        agentName: user.displayName,
        agentEmail: user.email,
        agentImage: user.photoURL,
        minRate: data.minRate,
        maxRate: data.maxRate,
        status: "available",
        createdAt: new Date(),
      };

      // Save property info to DB
      return await axiosSecure.post("/addProperties", propertyInfo);
    },
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Property added successfully!",
        confirmButtonColor: "#01AFF7",
      });
      reset();
      setImagePreview(null);
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to add property",
        confirmButtonColor: "#d33",
      });
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  const handleImagePreview = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center bg-blue-50">
      <Helmet>
        <title>Add Property | BrickBase</title>
      </Helmet>
      <h2 className="text-3xl lg:text-5xl font-semibold text-center mb-8 mt-8 lg:mt-8">
        Add New Property
      </h2>
      <p className="text-center text-gray-600 text-base lg:text-lg max-w-2xl mx-auto mb-6">
        Fill out the form below to list a new property. Make sure all the
        details are accurate before submission.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full mx-auto space-y-6 p-6 max-w-7xl"
      >
        {/* Title */}
        <div className="col-span-1">
          <label className="block mb-1 font-medium">Property Title</label>
          <input
            type="text"
            {...register("title", { required: true })}
            className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter property title"
          />
        </div>

        {/* Location */}
        <div className="col-span-1">
          <label className="block mb-1 font-medium">Location</label>
          <input
            type="text"
            {...register("location", { required: true })}
            className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter location (Division of the property must be given)"
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
            className="w-full text-sm file:px-4 file:py-3 border border-gray-300 rounded file:bg-blue-500 file:text-white file:cursor-pointer file:hover:bg-blue-600"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-2 rounded w-120 h-80 object-cover"
            />
          )}
        </div>

        {/* min Rate */}
        <div className="col-span-1">
          <label className="block mb-1 font-medium">Min Rate</label>
          <input
            type="number"
            {...register("minRate", { required: true })}
            className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="৳ 0.00"
          />
        </div>
        
        {/* max Rate */}
        <div className="col-span-1">
          <label className="block mb-1 font-medium">Max Rate</label>
          <input
            type="number"
            {...register("maxRate", { required: true })}
            className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="৳ 0.00"
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
            className="btn bg-blue-500 hover:bg-blue-600 border-none px-6 py-3 text-white"
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
