import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./router/router.jsx";
import { HelmetProvider } from "react-helmet-async";
import AuthProvider from "./context/AuthContext/Authprovider.jsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <div className="font-source-code-pro">
          <RouterProvider router={router} />
        </div>
        <ToastContainer position="top-right" autoClose={3000} />
      </AuthProvider>
    </HelmetProvider>
  </StrictMode>
);
