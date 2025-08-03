import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
// import { useNavigate } from "react-router";
import { BsFillShieldLockFill } from "react-icons/bs";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";

const PaymentForm = ({ property }) => {
  const stripe = useStripe();
  const elements = useElements();
    const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [error, setError] = useState("");

  const { isPending, data: propertyInfo = {} } = useQuery({
    queryKey: ["property", property.propertyId],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/offers/accepted/${property.propertyId}`
      );
      return res.data;
    },
  });

  if (isPending) {
    return <span className="loading loading-spinner text-info"></span>;
  }

  //console.log(propertyInfo);
  const amount = propertyInfo.offerAmount;
  const amountInCents = amount * 100;
  //console.log(amountInCents);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
    } else {
      setError("");
      //console.log("Payment method:", paymentMethod);
      //   navigate("/payment-success");
    }
    //create payment intent
    const res = await axiosSecure.post("/create-payment-intent", {
      amountInCents,
      propertyId: property.propertyId,
    });
    //console.log("response from intent", res);

    const clientSecret = res.data.clientSecret;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: user.displayName,
          email: user.email,
        },
      },
    });

    //console.log(result)

    if (result.error) {
      setError(result.error.message);
    } else {
      setError("");
      if (result.paymentIntent.status === "succeeded") {
        // console.log("Payment succeeded!");
        //console.log(result);

        // mark parcel paid also create payment history
        const paymentData = {
          propertyId: property.propertyId,
          email: user.email,
          amount,
          transactionId: result.paymentIntent.id,
          paymentMethod: result.paymentIntent.payment_method_types,
        };

        const paymentRes = await axiosSecure.post("/payments", paymentData);
        if (paymentRes.data.insertResult) {
          Swal.fire({
            title: "Payment succeeded!",
            html: `<strong>Transaction Id:</strong><code> ${result.paymentIntent.id}</code>`,
            icon: "success",
            confirmButtonColor: "#01AFF7",
            confirmButtonText: "Done",
            draggable: true,
          }).then(() => {
            navigate(-1);
          });
        }
      }
    }
  };

  return (
    <div className="w-full lg:w-1/2 bg-gray-200 p-6 space-y-6 rounded border border-gray-300">
      <div className="flex lg:flex-col gap-6 items-center text-sm text-gray-800 bg-white p-6 rounded border-2 border-gray-400">
        <BsFillShieldLockFill size={80} />
        <p className="text-md md:text-lg text-center font-semibold">
          Your payment is 100% safe and secure. We use encryption and verified
          payment gateways.
        </p>
      </div>

      <div className="p-4 rounded shadow bg-blue-100 border-2 border-blue-400">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Pay Offered Price
        </h2>
        <p className="text-4xl font-bold text-blue-500 mb-4">
          ৳ {property.offerAmount}
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-between text-sm text-gray-700">
            <span>Service Charge:</span>
            <span>৳ 2500.00</span>
          </div>
          <div className="flex justify-between text-sm text-gray-700">
            <span>Property Reg. Fees:</span>
            <span>৳ 10000.00</span>
          </div>

          <CardElement className="p-4 bg-white border border-gray-400 rounded" />

          <button
            type="submit"
            disabled={!stripe}
            className="w-full md:bg-gradient-to-r md:from-blue-400 md:to-blue-800 md:text-white text-gray-400 border border-gray-300 md:border-none py-3 rounded font-semibold hover:opacity-90"
          >
            Pay <MdOutlineKeyboardArrowRight size={25} className="inline" />
          </button>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
