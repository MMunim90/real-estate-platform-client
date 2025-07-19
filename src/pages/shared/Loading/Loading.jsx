import { FaHome } from "react-icons/fa";
import "./Loading.css"; 

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="flex flex-col items-center space-y-4">
        {/* Animated Glowing Icon */}
        <div className="relative">
          <div className="absolute inline-flex h-20 w-20 rounded-full bg-blue-300 opacity-75 animate-ping"></div>
          <div className="relative text-blue-500 text-5xl drop-shadow-lg animate-bounce">
            <FaHome />
          </div>
        </div>

        {/* Stylish Text */}
        <p className="text-2xl font-bold tracking-wide animate-pulse text-blue-600">
          Loading BrickBase...
        </p>

        {/* Subtle Progress Bar */}
        <div className="w-40 h-1 bg-blue-100 rounded-full overflow-hidden relative">
          <div className="absolute h-full w-full bg-blue-500 loading-bar"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
