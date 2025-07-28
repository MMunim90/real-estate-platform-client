import React from "react";
import { Helmet } from "react-helmet-async";
import logo from "../../../assets/logo.png";
import FadeIn from "react-fade-in";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";
import { useLocation, useNavigate } from "react-router";

const stripePromise = loadStripe(import.meta.env.VITE_payment_Key);

const Payment = () => {
  const { state } = useLocation();
  const property = state?.property;

  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center p-4 my-8 justify-center">
      <Helmet>
        <title>Brick Pay | BrickBase</title>
      </Helmet>

      <div className="w-full max-w-7xl flex items-center justify-between mb-6">
        <div
          onClick={() => navigate(-1)}
          className="flex items-center space-x-3 cursor-pointer"
        >
          <img src={logo} alt="BrickBase Logo" className="h-8" />
          <span className="text-xl md:text-3xl font-bold">Brick Pay</span>
        </div>
        <h1 className="text-xl md:text-3xl font-bold">Secure Payment</h1>
      </div>

      <div className="w-full max-w-7xl flex flex-col md:flex-row overflow-hidden mt-6">
        {/* Left Section */}
        <div className="w-full lg:w-1/2 p-6">
          <FadeIn className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Choose one of the payment options
            </h2>

            <button className="w-full border py-3 rounded flex items-center justify-center hover:bg-gray-100">
              <FaApple className="text-xl mr-2" /> Apple Pay
            </button>

            <button className="w-full border py-3 rounded flex items-center justify-center hover:bg-gray-100">
              <FcGoogle className="text-xl mr-2" /> Google Pay
            </button>

            <div className="border-2 border-green-400 bg-green-100 rounded p-4 flex items-center space-x-4">
              <span className="text-xl">💳</span>
              <div>
                <p className="font-bold">Pay by card</p>
                <p className="text-sm text-gray-600">
                  Enter VISA, MasterCard or Maestro card info.
                </p>
              </div>
            </div>

            <div className="border rounded p-4 flex items-center space-x-4 hover:bg-gray-50">
              <span className="text-xl">🏦</span>
              <div>
                <p className="font-bold">Pay via internet banking</p>
                <p className="text-sm text-gray-600">
                  Select your bank and pay immediately.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Right Section - Wrapped with Elements */}
        <Elements stripe={stripePromise}>
          {property ? (
            <PaymentForm property={property} />
          ) : (
            <div className="text-center text-gray-600 font-semibold">
              No property selected for payment.
            </div>
          )}
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
