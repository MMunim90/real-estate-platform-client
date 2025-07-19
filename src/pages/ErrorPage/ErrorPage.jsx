import { Link, useRouteError } from "react-router";
import { FaExclamationTriangle } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center px-6">
      <Helmet>
        <title>Error</title>
      </Helmet>
      {/* Icon */}
      <div className="bg-[#FFFBEA] p-6 rounded-full mb-6 shadow-md">
        <FaExclamationTriangle className="text-yellow-500 text-5xl animate-pulse" />
      </div>

      {/* Heading */}
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
        Oops! Something Went Wrong
      </h1>

      {/* Error message */}
      <p className="text-gray-600 max-w-xl mb-2">
        {error?.statusText ||
          error?.message ||
          "We couldn't process your request right now."}
      </p>

      {/* Optional error code */}
      {error?.status && (
        <p className="text-sm text-gray-500 mb-6">Error Code: {error.status}</p>
      )}

      {/* Back to home button */}
      <Link
        to="/"
        className="inline-block px-6 py-3 bg-blue-400 hover:bg-blue-500 font-semibold rounded-lg transition text-white"
      >
        🔙 Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
