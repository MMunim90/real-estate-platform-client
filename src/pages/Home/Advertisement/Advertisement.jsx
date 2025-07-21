import React from "react";
import { useEffect, useState } from "react";
import AdvertisementCard from "./AdvertisementCard";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { Link } from "react-router";
import { GoArrowUpLeft } from "react-icons/go";

const Advertisement = () => {
  const axiosPublic = useAxiosPublic();
  const [ads, setAds] = useState([]);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await axiosPublic.get("/properties/verified");
        const verifiedProperties = res.data || [];
        const randomAds = verifiedProperties
          .sort(() => 0.5 - Math.random())
          .slice(0, 4);
        setAds(randomAds);
      } catch (err) {
        console.error("Failed to load advertisement properties", err);
      }
    };
    fetchAds();
  }, [axiosPublic]);
  return (
    <section className="py-12 px-4 md:px-8 lg:px-16">
      <h2 className="text-3xl lg:text-5xl font-bold text-center mb-8">
        Advertisement Properties
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {ads.map((property) => (
          <AdvertisementCard key={property._id} property={property} />
        ))}
      </div>

      <Link to='/allProperties' className="flex items-center gap-2 justify-center mt-10 text-base md:text-2xl font-semibold"><GoArrowUpLeft className="text-xl md:text-3xl font-semibold"/>View All Verified Properties</Link>
    </section>
  );
};

export default Advertisement;
