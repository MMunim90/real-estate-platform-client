import { Link } from "react-router"; 
import { FaLock } from "react-icons/fa";

const Forbidden = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 text-center">
      <FaLock className="text-6xl text-blue-500 mb-4" />
      <h1 className="text-4xl font-bold text-blue-600 mb-2">403 - Forbidden</h1>
      <p className="text-blue-600 mb-6">
        Sorry, you don’t have permission to access this page.
      </p>
      <Link
        to="/"
        className="inline-block px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
      >
        🔙 Home
      </Link>
    </div>
  );
};

export default Forbidden;
