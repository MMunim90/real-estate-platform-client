import React, { useEffect, useState } from "react";
import { Link, NavLink, Outlet } from "react-router";
import {
  FaBuilding,
  FaBullhorn,
  FaChartLine,
  FaCheckCircle,
  FaClipboardList,
  FaCommentDots,
  FaExclamationTriangle,
  FaFacebook,
  FaHandHoldingUsd,
  FaHeart,
  FaListAlt,
  FaPlusSquare,
  FaStar,
  FaTwitter,
  FaUserCircle,
  FaUserCog,
  FaUsers,
  FaUserTie,
  FaWhatsapp,
} from "react-icons/fa";
import logo from "../assets/logo.png";
import useAuth from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";
import useAxios from "../hooks/useAxios";

const DashboardLayout = () => {
  const { user } = useAuth();
  const { role, loading } = useUserRole();
  const [socials, setSocials] = useState({});
  const [error, setError] = useState(null);
  const axiosInstance = useAxios();

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
      }
    };

    fetchSocialLinks();
  }, [user?.email, axiosInstance]);

  if (error) return <p className="text-red-500 text-center mt-4">{error}</p>;

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col bg-blue-50 text-black">
        {/* Navbar */}
        <div className="navbar bg-white text-black w-full lg:hidden">
          <div className="flex-none">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2 lg:hidden font-semibold">
            Dashboard
          </div>
        </div>
        {/* Page content here */}
        <Outlet></Outlet>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="flex flex-col justify-between menu bg-white text-black min-h-full w-auto p-8">
          {/* Sidebar content here */}
          <div>
            <div className="text-center">
              <img
                src={user?.photoURL || "https://i.ibb.co/F4BxGnK2/user.png"}
                alt="profile"
                className="w-28 h-28 object-cover rounded-full mx-auto border-4 border-blue-400 mb-4"
              />
              <h2 className="font-semibold my-2">{user.displayName}</h2>
              <p className="text-sm text-gray-500 mb-2">{user.email}</p>

              <div className="flex gap-4 justify-center mb-4">
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
            </div>
            <div className="border border-blue-400 text-black mb-4"></div>

            {/* user link */}
            {!loading && role === "user" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/profile"
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-3 py-2 rounded ${
                        isActive
                          ? "text-blue-600 font-semibold"
                          : "hover:text-blue-500"
                      }`
                    }
                  >
                    <FaUserCircle /> My Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/wishlist"
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-3 py-2 rounded ${
                        isActive
                          ? "text-blue-600 font-semibold"
                          : "hover:text-blue-500"
                      }`
                    }
                  >
                    <FaHeart /> Wishlist
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/propertyBought"
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-3 py-2 rounded ${
                        isActive
                          ? "text-blue-600 font-semibold"
                          : "hover:text-blue-500"
                      }`
                    }
                  >
                    <FaCheckCircle /> Property Bought
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/myReviews"
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-3 py-2 rounded ${
                        isActive
                          ? "text-blue-600 font-semibold"
                          : "hover:text-blue-500"
                      }`
                    }
                  >
                    <FaStar /> My Reviews
                  </NavLink>
                </li>
              </>
            )}

            {/* admin link */}
            {!loading && role === "admin" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/profile"
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-3 py-2 rounded ${
                        isActive
                          ? "text-blue-600 font-semibold"
                          : "hover:text-blue-500"
                      }`
                    }
                  >
                    <FaUserCog /> Admin Profile
                  </NavLink>
                </li>

                {/* Manage Properties */}
                <li>
                  <NavLink
                    to="/dashboard/manageProperties"
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-3 py-2 rounded ${
                        isActive
                          ? "text-blue-600 font-semibold"
                          : "hover:text-blue-500"
                      }`
                    }
                  >
                    <FaBuilding /> Manage Properties
                  </NavLink>
                </li>

                {/* Manage Users */}
                <li>
                  <NavLink
                    to="/dashboard/manageUsers"
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-3 py-2 rounded ${
                        isActive
                          ? "text-blue-600 font-semibold"
                          : "hover:text-blue-500"
                      }`
                    }
                  >
                    <FaUsers /> Manage Users
                  </NavLink>
                </li>

                {/* Manage Reviews */}
                <li>
                  <NavLink
                    to="/dashboard/manageReviews"
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-3 py-2 rounded ${
                        isActive
                          ? "text-blue-600 font-semibold"
                          : "hover:text-blue-500"
                      }`
                    }
                  >
                    <FaCommentDots /> Manage Reviews
                  </NavLink>
                </li>

                {/* Advertise Property */}
                <li>
                  <NavLink
                    to="/dashboard/advertise"
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-3 py-2 rounded ${
                        isActive
                          ? "text-blue-600 font-semibold"
                          : "hover:text-blue-500"
                      }`
                    }
                  >
                    <FaBullhorn /> Advertise Property
                  </NavLink>
                </li>

                {/* Reported Property */}
                <li>
                  <NavLink
                    to="/dashboard/report"
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-3 py-2 rounded ${
                        isActive
                          ? "text-blue-600 font-semibold"
                          : "hover:text-blue-500"
                      }`
                    }
                  >
                    <FaExclamationTriangle /> Reported Property
                  </NavLink>
                </li>
              </>
            )}

            {/* agent link */}
            {!loading && role === "agent" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/profile"
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-3 py-2 rounded ${
                        isActive
                          ? "text-blue-600 font-semibold"
                          : "hover:text-blue-500"
                      }`
                    }
                  >
                    <FaUserTie /> Agent Profile
                  </NavLink>
                </li>

                {/* Add Property */}
                <li>
                  <NavLink
                    to="/dashboard/addProperty"
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-3 py-2 rounded ${
                        isActive
                          ? "text-blue-600 font-semibold"
                          : "hover:text-blue-500"
                      }`
                    }
                  >
                    <FaPlusSquare /> Add Property
                  </NavLink>
                </li>

                {/* My Added Properties */}
                <li>
                  <NavLink
                    to="/dashboard/myProperties"
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-3 py-2 rounded ${
                        isActive
                          ? "text-blue-600 font-semibold"
                          : "hover:text-blue-500"
                      }`
                    }
                  >
                    <FaListAlt /> My Properties
                  </NavLink>
                </li>

                {/* My Sold Properties */}
                <li>
                  <NavLink
                    to="/dashboard/soldProperties"
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-3 py-2 rounded ${
                        isActive
                          ? "text-blue-600 font-semibold"
                          : "hover:text-blue-500"
                      }`
                    }
                  >
                    <FaHandHoldingUsd /> Sold Properties
                  </NavLink>
                </li>

                {/* Requested Properties */}
                <li>
                  <NavLink
                    to="/dashboard/requestedProperties"
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-3 py-2 rounded ${
                        isActive
                          ? "text-blue-600 font-semibold"
                          : "hover:text-blue-500"
                      }`
                    }
                  >
                    <FaClipboardList /> Requested Properties
                  </NavLink>
                </li>

                {/* Selling Statistics */}
                <li>
                  <NavLink
                    to="/dashboard/statistics"
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-3 py-2 rounded ${
                        isActive
                          ? "text-blue-600 font-semibold"
                          : "hover:text-blue-500"
                      }`
                    }
                  >
                    <FaChartLine /> Selling Statistics
                  </NavLink>
                </li>
              </>
            )}
          </div>

          <div>
            <Link
              to="/"
              className="flex items-center gap-2 mt-20 md:mt-36 lg:mt-0 ml-0 lg:ml-4"
            >
              <img src={logo} alt="BrickBase Logo" className="w-8 h-8" />
              <span className="text-xl font-bold">BrickBase</span>
            </Link>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
