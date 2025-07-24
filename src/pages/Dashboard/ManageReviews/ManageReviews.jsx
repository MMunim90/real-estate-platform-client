import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../shared/Loading/Loading";
import Swal from "sweetalert2";

const ManageReviews = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch all reviews
  const { data: allReviews = [], isLoading } = useQuery({
    queryKey: ["all-reviews"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allReviews");
      return res.data;
    },
  });

  // Delete mutation
  const deleteReviewMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/myReviews/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["all-reviews"]);
      Swal.fire("Deleted!", "The review has been deleted.", "success");
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteReviewMutation.mutate(id);
      }
    });
  };

  if (isLoading) return <Loading />;

  return (
    <section className="py-10 px-4 md:px-10 bg-gray-100 min-h-screen">
      <Helmet>
        <title>Manage Reviews | BrickBase Admin</title>
      </Helmet>

      <h2 className="text-3xl md:text-5xl font-semibold text-center mb-10 ">
        Manage All Reviews
      </h2>

      {allReviews.length === 0 ? (
        <p className="text-center text-gray-500">No reviews found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {allReviews.map((review) => (
            <div
              key={review._id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition flex flex-col justify-between"
            >
              {/* Top: Reviewer Info */}
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={review.userImage}
                  alt="Reviewer"
                  className="w-12 h-12 rounded-full object-cover border-2"
                />
                <div>
                  <p className="font-semibold text-gray-800">
                    {review.userName}
                  </p>
                  <p className="text-sm text-gray-500">{review.userEmail}</p>
                </div>
              </div>

              {/* Comment */}
              <p className="text-gray-700 mb-4 flex-grow">{review.comment}</p>

              {/* Delete Button */}
              <div className="mt-auto">
                <button
                  onClick={() => handleDelete(review._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ManageReviews;
