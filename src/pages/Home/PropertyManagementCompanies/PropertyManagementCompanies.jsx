import React from "react";
import Marquee from "react-fast-marquee";

const companies = [
  {
    name: "EliteHabitat",
    logo: "https://storage.googleapis.com/static.inmoweb.es/clients/319/logo/logo.png",
  },
  {
    name: "PrimeStay",
    logo: "https://www.propertyfinder.ae/broker/0/520/400/MODE/fee9ef/4415-180dao.jpg?ctr=ae",
  },
  {
    name: "SkylineGroup",
    logo: "https://i.ibb.co/NgkRHdpT/Skyline-Group.png",
  },
  {
    name: "MetroLiving",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXDjp9CHTBvZUJ-u0x69agQA9rYO4_sSXwbg&s",
  },
  {
    name: "HavenCare",
    logo: "https://lirp.cdn-website.com/57813e26/dms3rep/multi/opt/Have+Care+Logo-640w.jpg",
  },
  {
    name: "GreenLeaf PM",
    logo: "https://i.ibb.co/ync8xD1h/Green-Leaf-PM.png",
  },
  {
    name: "Zenith Homes",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzEed2faq-Nb0bMnVFyeqXlWMP4gf1atVi_Q&s",
  },
  {
    name: "Oakwood Realty",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJGWzyO3WWfjLty0H9Nkpv3CkTb-tkiDIzxA&s",
  },
  {
    name: "UrbanNest",
    logo: "https://i.ibb.co/6ctBBP3f/Urban-Nest.png",
  },
  {
    name: "VistaResidences",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrh9E2S45WNeyI9oFraNPaKfJpTWN291XDwg&s",
  },
  {
    name: "BluePeak Realty",
    logo: "https://framerusercontent.com/images/u31SR9O51qRdsHRp0me1U9PE.png",
  },
];

const PropertyManagementCompanies = () => {
  return (
    <div className="py-12">
      <h2 className="text-3xl font-bold text-center mb-6">
        Trusted Property Management Companies
      </h2>
      <Marquee gradient={false} speed={50} pauseOnHover>
        {companies.map((company, index) => (
          <div
            key={index}
            className="mx-6 flex flex-col items-center text-center"
          >
            <img
              src={company.logo}
              alt={company.name}
              className="h-16 w-auto object-contain"
            />
            <p className="text-sm mt-2 text-gray-400">{company.name}</p>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default PropertyManagementCompanies;
