import React from "react";
import banner from "../../assets/banner.jpg";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import dayjs from "dayjs";

const Profile = () => {
  const { user, setUser, updateUserProfile } = useAuth();
  const formatDate = (dateString) => dayjs(dateString).format('DD/MM/YYYY');

  const handleUpdateUser = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const photoURL = form.photoURL.value;

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
  return (
    <div className="w-full min-h-screen bg-gray-100">
      {/* Banner Section */}
      <div className="w-full h-64 md:h-80 lg:h-96 relative">
        <img src={banner} alt="Banner" className="w-full h-full object-cover" />
        {/* Profile Image */}
        <div className="absolute left-1/2 transform -translate-x-1/2 md:left-32 md:translate-x-0 -bottom-16">
          <img
            src={user?.photoURL}
            alt="Profile"
            className="w-32 h-32 md:w-36 md:h-36 rounded-full border-4 border-white shadow-md object-cover"
          />
        </div>
      </div>

      <div className="py-6 md:py-12">
        {/* Profile Info */}
        <div className="mt-20 md:mt-12 px-4 md:pl-40 text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
            {user.displayName}
          </h1>
          <p className="text-gray-700 mt-4">Hey there, [User Role]! 👋 Your account "{user.email}" was created on {formatDate(user.metadata.creationTime)} <br /> and you last signed in on {formatDate(user.metadata.lastSignInTime)}. Glad to have you back—feel free to update your info or explore your dashboard!</p>
        </div>

        {/* Update Profile Form */}
        <div className="mt-10 px-4 md:pl-40 max-w-2xl">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Update Profile
          </h2>
          <form
            onSubmit={handleUpdateUser}
            className="border border-black p-10 rounded-2xl space-y-6"
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
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
