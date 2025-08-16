import React, { useEffect, useState } from "react";
import { FaBullhorn, FaCameraRetro, FaRocket, FaSearch } from "react-icons/fa";
import { Typewriter } from "react-simple-typewriter";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router";
import { GoArrowUpLeft } from "react-icons/go";
import "./SearchBar.css";

const FeatureSection = () => {
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(-1);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleClose = () => {
    setSearch("");
    setSearchData([]);
    setSelectedItem(-1);
  };

  const handleKeyDown = (e) => {
    if (selectedItem < searchData.length) {
      if (e.key === "ArrowUp" && selectedItem > 0) {
        setSelectedItem((prev) => prev - 1);
      } else if (
        e.key === "ArrowDown" &&
        selectedItem < searchData.length - 1
      ) {
        setSelectedItem((prev) => prev + 1);
      } else if (e.key === "Enter" && selectedItem >= 0) {
        const selected = searchData[selectedItem];
        if (selected && selected._id) {
          window.open(`/properties/${selected._id}`, "_self");
        }
      }
    } else {
      setSelectedItem(-1);
    }
  };

  useEffect(() => {
    if (search !== "") {
      fetch(`${import.meta.env.VITE_API_URL}/properties/verified`)
        .then((res) => {
          if (!res.ok) throw new Error("Server returned error");
          return res.json();
        })
        .then((data) => {
          const properties = Array.isArray(data) ? data : data.properties || [];

          const filtered = properties.filter((property) =>
            property.location?.toLowerCase().includes(search.toLowerCase())
          );
          setSearchData(filtered);
        })

        .catch((error) => console.error("Fetch error:", error));
    } else {
      setSearchData([]);
    }
  }, [search]);

  return (
    <div
      className="relative bg-cover bg-center text-white py-16 px-4 md:px-16"
      style={{
        backgroundImage:
          "url('https://www.outsourcinghubindia.com/wp-content/uploads/2021/10/commercial-real-estate-covid.jpeg')",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative z-10 max-w-7xl mx-auto text-center">
        <h2 className="text-3xl lg:text-5xl font-bold mb-4">
          BrickBase{" "}
          <Typewriter
            words={[
              "Listings Sell Faster",
              "Listings Rent Faster",
              "Homes Reach Buyers",
              "Properties Get Views",
              "Rentals Get Noticed",
              "Listings Move Quickly",
            ]}
            loop={Infinity}
            typeSpeed={70}
            delaySpeed={5000}
            cursor
            cursorStyle="|"
            deleteSpeed={70}
          />
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 text-left">
          <div className="flex flex-col items-start">
            <FaBullhorn className="text-4xl mb-3" />
            <h3 className="text-xl font-semibold mb-1">Targeted Exposure</h3>
            <p>
              Showcase your properties to thousands of active renters & buyers
              across Bangladesh.
            </p>
          </div>

          <div className="flex flex-col items-start">
            <FaCameraRetro className="text-4xl mb-3" />
            <h3 className="text-xl font-semibold mb-1">Engaging Media</h3>
            <p>
              Use stunning images, 3D views, and walkthroughs to captivate
              potential clients.
            </p>
          </div>

          <div className="flex flex-col items-start">
            <FaRocket className="text-4xl mb-3" />
            <h3 className="text-xl font-semibold mb-1">Faster Transactions</h3>
            <p>
              Connect with serious buyers and renters faster through smart
              algorithms.
            </p>
          </div>
        </div>

        <div className="search_section mt-10 max-w-2xl mx-auto">
          <div className="search_input_div flex items-center bg-white rounded overflow-hidden">
            <input
              type="text"
              placeholder="Search properties by city or location..."
              className="w-full px-4 py-3 text-black placeholder-gray-500 focus:outline-none search_input"
              autoComplete="off"
              onChange={handleChange}
              value={search}
              onKeyDown={handleKeyDown}
            />
            <button className="bg-gray-800 hover:bg-gray-700 text-white px-5 py-4 cursor-pointer">
              {search === "" ? (
                <FaSearch />
              ) : (
                <IoMdClose onClick={handleClose} />
              )}
            </button>
          </div>
          <div className="search_result">
            {searchData.map((data, index) => {
              return (
                <Link
                  key={index}
                  className={
                    selectedItem === index
                      ? "search_suggestion_line active"
                      : "search_suggestion_line"
                  }
                  to={`/properties/${data._id}`}
                >
                  {data ? (
                    <div>
                      <GoArrowUpLeft className="inline mr-2" />{" "}
                      {data.show?.location || data.location}
                    </div>
                  ) : (
                    "Nothing match to search input"
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        <p className="mt-4 text-sm opacity-80">
          *Based on internal analysis comparing listings with and without
          enhanced marketing.
        </p>
      </div>
    </div>
  );
};

export default FeatureSection;
