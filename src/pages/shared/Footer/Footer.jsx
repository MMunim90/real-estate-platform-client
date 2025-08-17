import { Link, useLocation } from "react-router";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import logo from "../../../assets/logo.png";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext/AuthContext";

const Footer = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  const getLinkClass = (path) =>
    location.pathname === path
      ? "text-blue-600 font-semibold"
      : "hover:text-blue-600";

  return (
    <footer className="bg-white text-gray-700">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* Logo & Description */}
        <div className="flex flex-col items-start gap-3">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="BrickBase Logo" className="w-8 h-8" />
            <span className="text-xl font-bold text-gray-800">BrickBase</span>
          </Link>
          <p className="text-sm text-gray-600">
            Your trusted platform for buying, renting, and listing properties.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-gray-800 mb-2">Quick Links</h3>
          <Link to="/" className={getLinkClass("/")}>Home</Link>
          <Link to="/allProperties" className={getLinkClass("/allProperties")}>All Properties</Link>
          <Link to="/branches" className={getLinkClass("/branches")}>Branches</Link>
          {user && <Link to="/dashboard/profile" className={getLinkClass("/dashboard/profile")}>Dashboard</Link>}
          {!user && <Link to="/login" className={getLinkClass("/login")}>Login</Link>}
        </div>

        {/* Company Links */}
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-gray-800 mb-2">Company</h3>
          <Link to="/about" className={getLinkClass("/about")}>About Us</Link>
          <Link to="/contact" className={getLinkClass("/contact")}>Contact Us</Link>
          <Link to="/terms" className={getLinkClass("/terms")}>Terms of Use</Link>
          <Link to="/privacyPolicy" className={getLinkClass("/privacyPolicy")}>Privacy Policy</Link>
        </div>

        {/* Social Links */}
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-gray-800 mb-2">Follow Us</h3>
          <div className="flex gap-4">
            <a href="https://www.facebook.com/munim9munim" target="_blank" rel="noreferrer" className="hover:text-blue-600">
              <FaFacebookF size={20} />
            </a>
            <a href="https://x.com/__munim__" target="_blank" rel="noreferrer" className="hover:text-blue-500">
              <FaTwitter size={20} />
            </a>
            <a href="https://www.linkedin.com/in/m-munim/" target="_blank" rel="noreferrer" className="hover:text-blue-700">
              <FaLinkedinIn size={20} />
            </a>
            <a href="https://instagram.com/_mmunim_" target="_blank" rel="noreferrer" className="hover:text-pink-500">
              <FaInstagram size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 py-4 border-t">
        &copy; {new Date().getFullYear()} BrickBase. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
