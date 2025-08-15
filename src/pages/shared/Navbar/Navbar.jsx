import { useContext, useState } from "react";
import { Link, NavLink } from "react-router";
import { Menu, X, LogOut, Phone, Info } from "lucide-react";
import logo from "../../../assets/logo.png";
import { AuthContext } from "../../../context/AuthContext/AuthContext";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          title: "Log Out Successfully!",
          icon: "success",
          confirmButtonColor: "#01AFF7",
        });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const navLinks = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "text-blue-600 font-semibold" : "hover:text-blue-500"
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/allProperties"
        className={({ isActive }) =>
          isActive ? "text-blue-600 font-semibold" : "hover:text-blue-500"
        }
      >
        All Properties
      </NavLink>
      <NavLink
        to="/branches"
        className={({ isActive }) =>
          isActive ? "text-blue-600 font-semibold" : "hover:text-blue-500"
        }
      >
        Branches
      </NavLink>
      {user && (
        <NavLink
          to="/dashboard/profile"
          className={({ isActive }) =>
            isActive ? "text-blue-600 font-semibold" : "hover:text-blue-500"
          }
        >
          Dashboard
        </NavLink>
      )}
      {!user && (
        <NavLink
          to="/login"
          className={({ isActive }) =>
            isActive ? "text-blue-600 font-semibold" : "hover:text-blue-500"
          }
        >
          Login
        </NavLink>
      )}
    </>
  );

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 lg:px-0 py-3 flex items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="BrickBase Logo" className="w-8 h-8" />
          <span className="text-xl font-bold text-gray-800">BrickBase</span>
        </Link>

        {/* Right Side: nav links + profile + menu toggle */}
        <div className="ml-auto flex items-center gap-4">
          {/* Desktop Nav Links */}
          <nav className="hidden md:flex gap-6 text-gray-700 text-base items-center">
            {navLinks}
          </nav>

          {/* Profile (visible on all devices) */}
          {user && (
            <div className="relative">
              <img
                src={user?.photoURL || "https://i.ibb.co/F4BxGnK2/user.png"}
                alt="Profile"
                className="w-9 h-9 rounded-full cursor-pointer border-2 border-blue-400 object-cover"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border rounded-md shadow-lg z-50 text-black">
                  <div className="px-4 py-2 border-b">
                    <p className="font-semibold text-lg">
                      {user?.displayName || "User"}
                    </p>
                    <p className="text-xs">{user?.email}</p>
                  </div>
                  <Link
                    to="/about"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Info className="w-4 h-4 mr-2" /> About Us
                  </Link>
                  <Link
                    to="/contact"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Phone className="w-4 h-4 mr-2" /> Contact
                  </Link>
                  <button
                    onClick={handleLogOut}
                    className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    <LogOut className="w-4 h-4 mr-2" /> Log Out
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mobile Toggle */}
          <button
            className="md:hidden focus:outline-none text-black"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md px-4 pb-4 space-y-2 text-gray-700 text-base flex flex-col">
          {navLinks}
        </div>
      )}
    </header>
  );
};

export default Navbar;
