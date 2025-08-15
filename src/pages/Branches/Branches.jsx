import React, { useState } from "react";
import { useLoaderData } from "react-router";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const greenIcon = new L.Icon({
  iconUrl: "https://i.ibb.co.com/5HcwKBq/marker.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [60, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [91, 51],
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
    <div className="min-h-screen py-12 px-4 md:px-12 w-full">
      <h2 className="text-3xl md:text-6xl font-bold text-start mb-8">
        We are available in 64 districts
      </h2>

      <div className="h-[500px] mx-auto rounded-3xl border-3 border-blue-400 shadow-md overflow-hidden relative">
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
    </div>
  );
};

export default Branches;
