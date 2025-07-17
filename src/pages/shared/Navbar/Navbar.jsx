import { useState } from "react";
import { Link, NavLink } from "react-router";
import { Menu, X } from "lucide-react"; // Optional: for icons, or use Heroicons
import logo from "../../../assets/logo.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        to="/properties"
        className={({ isActive }) =>
          isActive ? "text-blue-600 font-semibold" : "hover:text-blue-500"
        }
      >
        All Properties
      </NavLink>
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          isActive ? "text-blue-600 font-semibold" : "hover:text-blue-500"
        }
      >
        Dashboard
      </NavLink>
      <NavLink
        to="/login"
        className={({ isActive }) =>
          isActive ? "text-blue-600 font-semibold" : "hover:text-blue-500"
        }
      >
        Login
      </NavLink>
    </>
  );

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo & Name */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="BrickBase Logo" className="w-8 h-8" />
          <span className="text-xl font-bold text-gray-800">BrickBase</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-6 text-gray-700 text-base">
          {navLinks}
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden focus:outline-none text-black"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
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
