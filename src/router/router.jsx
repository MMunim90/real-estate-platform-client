import {
  createBrowserRouter,
} from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import AboutUs from "../pages/AboutUs/AboutUs";
import ContactUs from "../pages/ContactUs/ContactUs";
import TermsOfUse from "../pages/TermsOfUse/TermsOfUse";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Authentication/Login/Login";
import Register from "../pages/Authentication/Register/Register";
import PrivacyPolicy from "../pages/PrivacyPolicy/PrivacyPolicy";
import ResetPassword from "../pages/Authentication/ResetPassword/ResetPassword";
import PrivateRoute from "../routes/PrivateRoute";
import Profile from "../pages/Profile/Profile";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
        {
            index: true,
            Component: Home,
        },
        {
            path: 'about',
            Component: AboutUs,
        },
        {
            path: 'contact',
            Component: ContactUs,
        },
        {
            path: 'terms',
            Component: TermsOfUse,
        },
        {
            path: 'privacyPolicy',
            Component: PrivacyPolicy,
        },
        {
          path: '/*',
          Component: ErrorPage,
        },
        {
          path: 'profile',
          element: <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        }
    ]
  },
  {
    path: '/',
    Component: AuthLayout,
    children: [
      {
        path: '/login',
        Component: Login,
      },
      {
        path: '/register',
        Component: Register,
      },
      {
        path: '/reset',
        Component: ResetPassword,
      },
    ]
  }
]);