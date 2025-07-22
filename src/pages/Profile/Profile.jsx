import React, { useEffect, useState } from "react";
import banner from "../../assets/banner.jpg";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import { Helmet } from "react-helmet-async";
import useUserRole from "../../hooks/useUserRole";
import useAxios from "../../hooks/useAxios";
import { useForm } from "react-hook-form";
import { FaFacebook, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router";
import Loading from "../shared/Loading/Loading";

const Profile = () => {
  const { user, setUser, updateUserProfile } = useAuth();
  const [socials, setSocials] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const axiosInstance = useAxios();
  const { role } = useUserRole();
  const { register, handleSubmit } = useForm();
  const formatDate = (dateString) => dayjs(dateString).format("DD/MM/YYYY");

  const handleUpdateUser = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const photoURL = form.photoURL.value;
    console.log(photoURL);

    updateUserProfile({
      displayName: name,
      photoURL: photoURL,
    })
      .then(() => {
        setUser({ ...user, displayName: name, photoURL: photoURL });
        Swal.fire({
          title: "Great!",
          text: "You update your profile successfully!",
          icon: "success",
          confirmButtonColor: "#01AFF7",
        });
      })
      .catch((error) => {
        //console.log(error);
        toast.error(error);
        setUser(user);
      });
  };

  const handleApplyFromSubmit = async (data) => {
    const application = {
      applicant: user.email,
      facebook: data.facebook,
      twitter: data.twitter,
      whatsapp: data.whatsapp,
    };

    try {
      const res = await axiosInstance.patch("/users", application);
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Media links submitted",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update media links.");
    }
  };

  useEffect(() => {
    if (!user?.email) return;

    const fetchSocialLinks = async () => {
      try {
        const res = await axiosInstance.get(
          `/users/socials?email=${user.email}`
        );
        setSocials(res.data); 
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch social links");
      } finally {
        setLoading(false);
      }
    };

    fetchSocialLinks();
  }, [user?.email, axiosInstance]);

  if (loading)
    return (
      <div className="text-center mt-4">
        <Loading></Loading>
      </div>
    );
  if (error) return <p className="text-red-500 text-center mt-4">{error}</p>;

  return (
    <div className="w-full min-h-screen bg-blue-50">
      <Helmet>
        <title>Profile | BrickBase</title>
      </Helmet>
      {/* Banner Section */}
      <div className="w-full h-64 md:h-80 lg:h-96 relative">
        <img src={banner} alt="Banner" className="w-full h-full object-cover" />
        {/* Profile Image */}
        <div className="absolute left-1/2 transform -translate-x-1/2 md:left-32 md:translate-x-0 -bottom-16 lg:-bottom-20">
          <img
            src={user?.photoURL || "https://i.ibb.co/F4BxGnK2/user.png"}
            alt="Profile"
            className="w-32 h-32 md:w-36 md:h-36 lg:w-44 lg:h-44 rounded-full border-4 border-white shadow-md object-cover"
          />
        </div>
      </div>

      <div className="py-6 md:py-12">
        {/* Profile Info */}
        <div className="mt-20 md:mt-12 px-4 md:pl-40 text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
            {user.displayName}
          </h1>

          <div className="flex gap-4 justify-center md:justify-start my-2">
            {socials?.facebook && (
              <a
                href={socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook className="text-blue-600 text-2xl" />
              </a>
            )}
            {socials?.twitter && (
              <a
                href={socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter className="text-sky-500 text-2xl" />
              </a>
            )}
            {socials?.whatsapp && (
              <a
                href={socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp className="text-green-500 text-2xl" />
              </a>
            )}
          </div>

          <p className="text-gray-700 mt-4">
            Hey there, {role}! 👋 Your account "{user.email}" was created on{" "}
            {formatDate(user.metadata.creationTime)} <br /> and you last signed
            in on {formatDate(user.metadata.lastSignInTime)}. Glad to have you
            back—feel free to update your info or explore your dashboard!
          </p>
        </div>

        <div className="flex flex-col">
          {/* Update Profile Form */}
          <div className="mt-10 px-4 md:pl-40 max-w-7xl mb-10">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Update Profile
            </h2>
            <form
              onSubmit={handleUpdateUser}
              className="space-y-6"
            >
              <input
                type="text"
                name="name"
                id="username"
                placeholder="New Username"
                required
                className="w-full px-4 py-3 rounded-md border border-gray-300 bg-gray-50 text-black"
              />

              <input
                type="text"
                name="photoURL"
                id="photoURL"
                placeholder="New Photo URL"
                required
                className="w-full px-4 py-3 rounded-md border border-gray-300 bg-gray-50 text-black"
              />

              <button
                type="submit"
                className="block w-full p-3 text-white text-center rounded-sm text-xl bg-blue-500 hover:bg-blue-600 cursor-pointer"
              >
                Save
              </button>
            </form>
          </div>

          {/* Add Social Media Links Form */}
          <div className="mt-10 px-4 md:pl-40 max-w-7xl">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Add Media Links
            </h2>
            <form
              onSubmit={handleSubmit(handleApplyFromSubmit)}
              className="space-y-6"
            >
              <input
                type="url"
                {...register("facebook")}
                className="w-full px-4 py-3 rounded-md border border-gray-300 bg-gray-50 text-black"
                placeholder="Facebook Profile Link"
              />

              <input
                type="url"
                {...register("twitter")}
                className="w-full px-4 py-3 rounded-md border border-gray-300 bg-gray-50 text-black"
                placeholder="Twitter Profile Link"
              />

              <input
                type="url"
                {...register("whatsapp")}
                className="w-full px-4 py-3 rounded-md border border-gray-300 bg-gray-50 text-black"
                placeholder="WhatsApp Link"
              />

              <button
                type="submit"
                className="block w-full p-3 text-white text-center rounded-sm text-xl bg-blue-500 hover:bg-blue-600 cursor-pointer"
              >
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
