import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../shared/Loading/Loading";
import { Helmet } from "react-helmet-async";

const ManageProperties = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch properties added by agents
  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["agent-properties"],
    queryFn: async () => {
      const res = await axiosSecure.get("/manage-properties");
      return res.data;
    },
  });

  // Mutation for verifying a property
  const verifyProperty = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.patch(`/properties/verify/${id}`);
    },
    onSuccess: () => {
      Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, verify it!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Verified!",
            text: "Property has been Verified!",
            icon: "success",
            confirmButtonColor: "#01AFF7",
          });
          queryClient.invalidateQueries(["agent-properties"]);
        }
      });
    },
    onError: () => {
      Swal.fire("Failed!", "Verification failed.", "error");
    },
  });

  // Mutation for rejecting a property
  const rejectProperty = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.patch(`/properties/reject/${id}`);
    },
    onSuccess: () => {
      Swal.fire("Rejected!", "Property has been rejected.", "info");
      Swal.fire({
        title: "Are you sure?",
        text: "This won't be able to revert!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, reject it!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Rejected!",
            text: "Property has been rejected.",
            icon: "info",
            confirmButtonColor: "#01AFF7",
          });

          queryClient.invalidateQueries(["agent-properties"]);
        }
      });
    },
    onError: () => {
      Swal.fire("Failed!", "Rejection failed.", "error");
    },
  });

  return (
    <div className="min-h-screen p-4 md:p-8">
      <Helmet>
        <title>Manage Properties | BrickBase</title>
      </Helmet>
      <h2 className="text-3xl lg:text-5xl font-semibold text-center mb-10">
        Manage Properties
      </h2>
      {isLoading ? (
        <div className="text-center">
          <Loading></Loading>
        </div>
      ) : (
        <div className="overflow-x-auto border-2 border-gray-300 rounded">
          <table className="table w-full border border-gray-200">
            <thead className="bg-blue-200 text-black font-bold">
              <tr>
                <th>Title</th>
                <th>Location</th>
                <th>Agent Name</th>
                <th>Agent Email</th>
                <th>Price Range</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((property) => (
                <tr key={property._id} className="border-t">
                  <td>{property.title}</td>
                  <td>{property.location}</td>
                  <td>{property.agentName}</td>
                  <td>{property.agentEmail}</td>
                  <td>{property.priceRange}</td>
                  <td className="capitalize">{property.status}</td>
                  <td>
                    {property.status === "available" && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => verifyProperty.mutate(property._id)}
                          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                          Verify
                        </button>
                        <button
                          onClick={() => rejectProperty.mutate(property._id)}
                          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                    {property.status === "verified" && (
                      <span className="text-green-600 font-semibold">
                        Verified
                      </span>
                    )}
                    {property.status === "rejected" && (
                      <span className="text-red-600 font-semibold">
                        Rejected
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageProperties;
