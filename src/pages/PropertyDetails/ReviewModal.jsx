import { useForm } from "react-hook-form";
import { Dialog } from "@headlessui/react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ReviewModal = ({ isOpen, onClose, propertyId, refetch }) => {
  const [axiosSecure] = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    const review = {
      propertyId,
      reviewerName: data.reviewerName,
      comment: data.comment,
      rating: parseInt(data.rating),
      createdAt: new Date(),
    };

    try {
      await axiosSecure.post("/reviews", review);
      refetch();
      reset();
      onClose();
    } catch (error) {
      console.error("Failed to submit review", error);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed z-50 inset-0">
      <div className="min-h-screen bg-black bg-opacity-30 flex justify-center items-center">
        <Dialog.Panel className="bg-white rounded-lg p-6 w-full max-w-md">
          <Dialog.Title className="text-lg font-bold mb-4">Add a Review</Dialog.Title>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input
              {...register("reviewerName", { required: true })}
              className="w-full border p-2 rounded"
              placeholder="Your Name"
            />
            <textarea
              {...register("comment", { required: true })}
              className="w-full border p-2 rounded"
              placeholder="Your review..."
            />
            <input
              type="number"
              {...register("rating", { required: true, min: 1, max: 5 })}
              className="w-full border p-2 rounded"
              placeholder="Rating (1-5)"
            />
            <div className="flex justify-end gap-3">
              <button type="button" onClick={onClose} className="px-4 py-2 border rounded">
                Cancel
              </button>
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                Submit
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ReviewModal;
