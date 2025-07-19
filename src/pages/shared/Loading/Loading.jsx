import { FaHome } from "react-icons/fa";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-[60vh] w-full">
      <div className="flex flex-col items-center space-y-4 animate-pulse">
        <div className="text-blue-600 text-5xl animate-spin">
          <FaHome />
        </div>
        <p className="text-xl font-semibold">Loading, please wait...</p>
      </div>
    </div>
  );
};

export default Loading;
