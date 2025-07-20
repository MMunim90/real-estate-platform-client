import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import {
    FaCheckCircle,
    FaHeart,
  FaStar,
  FaUserCircle,
} from "react-icons/fa";
import logo from "../assets/logo.png";
import useAuth from "../hooks/useAuth";

const DashboardLayout = () => {
  const { user } = useAuth();
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col bg-gray-200 text-black">
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
          <div className="mx-2 flex-1 px-2 lg:hidden font-semibold">Dashboard</div>
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
        <ul className="flex flex-col justify-between menu bg-white text-black min-h-full w-60 p-8">
          {/* Sidebar content here */}
          <div>
            <div className="text-center">
              <img
                src={user?.photoURL || "https://i.ibb.co/F4BxGnK2/user.png"}
                alt="profile"
                className="w-28 h-28 object-cover rounded-full mx-auto border-4 border-blue-400 mb-4"
              />
              <h2 className="font-semibold my-2">{user.displayName}</h2>
              <p className="text-sm text-gray-500 mb-4">{user.email}</p>
            </div>
            <div className="border border-blue-400 text-black mb-2"></div>

            {/* user link */}
            <li>
              <NavLink
                to="/dashboard/profile"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded ${
                    isActive ? "text-blue-600 font-semibold" : "hover:text-blue-500"
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
                    isActive ? "text-blue-600 font-semibold" : "hover:text-blue-500"
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
                    isActive ? "text-blue-600 font-semibold" : "hover:text-blue-500"
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
                    isActive ? "text-blue-600 font-semibold" : "hover:text-blue-500"
                  }`
                }
              >
                <FaStar /> My Reviews
              </NavLink>
            </li>

            {/* admin link */}

            {/* riders link */}
          </div>

          <div>
            <Link
              to="/"
              className="flex items-center gap-2 mt-0 md:mt-36 lg:mt-0"
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
