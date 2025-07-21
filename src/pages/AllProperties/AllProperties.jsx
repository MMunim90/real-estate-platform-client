import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import PropertyCard from "./PropertyCard";
import { Helmet } from "react-helmet-async";

const AllProperties = () => {
  const axiosPublic = useAxiosPublic();

  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["verified-properties"],
    queryFn: async () => {
      const res = await axiosPublic.get("/properties/verified");
      return res.data;
    },
  });

  if (isLoading)
    return <div className="text-center py-20 text-lg">Loading...</div>;

  return (
    <section className="py-10 px-4 md:px-10 bg-blue-50 min-h-screen">
      <Helmet>
        <title>All Properties | BrickBase</title>
      </Helmet>
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-10 text-black">
        Verified Properties
      </h2>
      <p className="text-2xl text-black my-6 text-center md:text-start">
        Property list({properties.length})
      </p>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {properties.map((property) => (
          <PropertyCard key={property._id} property={property} />
        ))}
      </div>
    </section>
  );
};

export default AllProperties;
