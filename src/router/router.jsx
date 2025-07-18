import {
  createBrowserRouter,
} from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import AboutUs from "../pages/AboutUs/AboutUs";
import ContactUs from "../pages/ContactUs/ContactUs";
import TermsOfUse from "../pages/TermsOfUse/TermsOfUse";
import FAQs from "../pages/FAQs/FAQs";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Authentication/Login/Login";

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
            path: 'faq',
            Component: FAQs,
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
      }
    ]
  }
]);