import React, { useState } from "react";
import { Link } from "react-router";
import { Helmet } from "react-helmet-async";
import Lottie from "lottie-react";
import FadeIn from "react-fade-in";
import { useForm } from "react-hook-form";
import logo from "../../../assets/logo.png";
import resetLottie from "../../../assets/lottie/reset.json";

const ResetPassword = () => {
  const { register, handleSubmit } = useForm();
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <Helmet>
        <title>Password Reset | BrickBase</title>
      </Helmet>

      {/* Left: Form Section */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex-1 flex items-center justify-center p-8 bg-white text-black"
      >
        <div className="w-full max-w-md">
          <FadeIn>
            {/* Logo */}
            <div className="mb-8">
              <Link to="/" className="flex items-center gap-2">
                <img src={logo} alt="BrickBase Logo" className="w-8 h-8" />
                <span className="text-xl font-bold text-gray-800">
                  BrickBase
                </span>
              </Link>
            </div>

            {/* Title */}
            <h2 className="text-3xl font-bold mb-2 text-gray-800">
              Reset your password
            </h2>
            <p className="text-gray-600 mb-6">
              Enter your email to receive reset instructions
            </p>

            {/* Email */}
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Email address"
              className="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition"
            >
              Send Reset Link
            </button>

            {/* Message after submit */}
            {submitted && (
              <p className="mt-4 text-green-600 text-sm text-center">
                If this email exists in our system, a reset link has been sent.
              </p>
            )}

            {/* Back to login */}
            <p className="text-center text-sm text-gray-600 mt-6">
              Remember your password?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                Sign in
              </Link>
            </p>
          </FadeIn>
        </div>
      </form>

      {/* Right: Lottie Section */}
      <div className="hidden flex-1 bg-blue-100 md:flex items-center justify-center p-4">
        <div className="flex items-center justify-center">
          <Lottie animationData={resetLottie} loop={true} />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
