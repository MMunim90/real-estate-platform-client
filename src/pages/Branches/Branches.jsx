import React, { useState } from "react";
import { Link, useLoaderData } from "react-router";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import logo from "../../assets/logo.png"

const greenIcon = new L.Icon({
  iconUrl: logo,
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 35],
  iconAnchor: [12, 20],
  popupAnchor: [1, -34],
  shadowSize: [38, 38],
});

const MapMover = ({ target }) => {
  const map = useMap();
  React.useEffect(() => {
    if (target) {
      map.flyTo([target.latitude, target.longitude], 15, {
        animate: true,
        duration: 2,
      });
    }
  }, [target, map]);
  return null;
};

const Branches = () => {
  const branches = useLoaderData();
  const [searchTerm, setSearchTerm] = useState("");
  const [targetBranch, setTargetBranch] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    const filtered = branches.filter((branch) =>
      branch.district.toLowerCase().includes(value.toLowerCase())
    );

    setSuggestions(value ? filtered.slice(0, 5) : []);
    setHighlightedIndex(-1); // reset selection
  };

  const handleGo = (districtName = null) => {
    const input = districtName || searchTerm;
    const found = branches.find((branch) =>
      branch.district.toLowerCase().includes(input.toLowerCase())
    );
    if (found) {
      setTargetBranch(found);
      setSearchTerm(found.district);
      setSuggestions([]);
      setHighlightedIndex(-1);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : suggestions.length - 1
      );
    } else if (e.key === "Enter") {
      if (highlightedIndex >= 0 && suggestions[highlightedIndex]) {
        handleGo(suggestions[highlightedIndex].district);
      } else {
        handleGo();
      }
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 md:px-12 w-full bg-blue-50">

      <div className="breadcrumbs text-sm text-black mb-2">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>Branches</li>
        </ul>
      </div>
      
      <h2 className="text-3xl md:text-6xl font-bold text-start mb-1 text-black">
        Find Our Offline Branches 
      </h2>

      <p className="mb-8 text-gray-700 max-w-7xl text-start">
        At Brickbase, we believe in building trust through real connections. Along with our online services, we have multiple offline branches across Bangladesh where you can meet our team in person. Whether you need property advice, want to explore investment opportunities, or require assistance with buying, selling, or renting, our branch offices are ready to help. Visit your nearest Brickbase branch to experience our dedicated service firsthand.
      </p>

      <div className="h-[500px] lg:h-[700px] mx-auto rounded-lg border-3 border-blue-400 shadow-md overflow-hidden relative">
        {/* Search Input and Suggestions */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 w-[90%] sm:w-[400px]">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
              placeholder="🔍 Search district name..."
              className="input input-bordered w-full border-2 border-blue-400 rounded-full pr-24"
            />
            <button
              onClick={() => handleGo()}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-blue-400 hover:bg-blue-500 text-white font-semibold px-5 py-1 rounded-full text-sm z-10"
            >
              Go
            </button>

            {suggestions.length > 0 && (
              <ul className="absolute top-full mt-2 left-0 right-0 bg-white text-black border border-blue-400 rounded-lg max-h-48 overflow-auto shadow-lg z-50">
                {suggestions.map((branch, idx) => (
                  <li
                    key={idx}
                    onClick={() => handleGo(branch.district)}
                    className={`px-4 py-2 cursor-pointer ${
                      idx === highlightedIndex
                        ? "bg-blue-400 text-black"
                        : "hover:bg-blue-400 hover:text-black"
                    }`}
                  >
                    {branch.district}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Map Container */}
        <MapContainer
          center={[23.8103, 90.4125]}
          zoom={7}
          scrollWheelZoom={true}
          className="h-full w-full z-0"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          />

          {branches.map((branch, idx) => (
            <Marker
              key={idx}
              position={[branch.latitude, branch.longitude]}
              icon={greenIcon}
            >
              <Popup>
                <strong>{branch.district}</strong>
                <br />
                {branch.covered_area.join(", ")}
              </Popup>
            </Marker>
          ))}

          <MapMover target={targetBranch} />
        </MapContainer>
      </div>


        {/* Additional Content Section */}
      <div className="mt-12 max-w-7xl mx-auto text-center">
        <h3 className="text-2xl md:text-4xl font-bold text-black mb-4">
          Why Visit Our Branches?
        </h3>
        <p className="text-gray-700 mb-6">
          Our offline branches are designed to bring you closer to your property goals. 
          Whether you want one-on-one guidance, local insights, or quick assistance, 
          our expert team is available to support you in person. 
          We make sure you feel confident and informed at every step.
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="p-6 bg-white shadow-md rounded-xl border border-blue-100">
            <h4 className="text-lg font-semibold mb-2 text-blue-500">
              Personalized Consultation
            </h4>
            <p className="text-gray-600">
              Meet with our advisors directly and get tailored property solutions 
              based on your budget and preferences.
            </p>
          </div>
          <div className="p-6 bg-white shadow-md rounded-xl border border-blue-100">
            <h4 className="text-lg font-semibold mb-2 text-blue-500">
              Local Market Insights
            </h4>
            <p className="text-gray-600">
              Our branch teams have deep knowledge of the local property market 
              and can help you make smarter investment choices.
            </p>
          </div>
          <div className="p-6 bg-white shadow-md rounded-xl border border-blue-100">
            <h4 className="text-lg font-semibold mb-2 text-blue-500">
              Quick Assistance
            </h4>
            <p className="text-gray-600">
              Get instant support for documentation, legal queries, and property visits 
              without waiting for online responses.
            </p>
          </div>
        </div>

        <div className="mt-10">
          <Link
            to="/contact"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-3 rounded-full shadow-md transition"
          >
            Contact Our Nearest Branch
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Branches;
