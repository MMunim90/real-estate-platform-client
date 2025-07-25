import { createBrowserRouter } from "react-router";
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
import DashboardLayout from "../layouts/DashboardLayout";
import Forbidden from "../pages/Forbidden/Forbidden";
import AgentRoute from "../routes/AgentRoute";
import AddProperty from "../pages/Dashboard/AddProperty/AddProperty";
import AllProperties from "../pages/AllProperties/AllProperties";
import AdminRoute from "../routes/AdminRoute";
import ManageProperties from "../pages/Dashboard/ManageProperties/ManageProperties";
import ManageUsers from "../pages/Dashboard/ManageUsers/ManageUsers";
import ManageReviews from "../pages/Dashboard/ManageReviews/ManageReviews";
import Wishlist from "../pages/Dashboard/Wishlist/Wishlist";
import PropertyBought from "../pages/Dashboard/PropertyBought/PropertyBought";
import MyReviews from "../pages/Dashboard/MyReviews/MyReviews";
import MyProperties from "../pages/Dashboard/MyProperties/MyProperties";
import SoldProperties from "../pages/Dashboard/SoldProperties/SoldProperties";
import RequestedProperties from "../pages/Dashboard/RequestedProperties/RequestedProperties";
import UserRoute from "../routes/UserRoute";
import PropertyDetails from "../pages/PropertyDetails/PropertyDetails";
import UpdateProperty from "../pages/Dashboard/MyProperties/UpdateProperty";
import MakeOffer from "../pages/Dashboard/Wishlist/MakeOffer";
import AdvertiseProperty from "../pages/Dashboard/AdvertiseProperty/AdvertiseProperty";
import ReportedProperty from "../pages/Dashboard/ReportedProperty/ReportedProperty";
import SellingStatistics from "../pages/Dashboard/SellingStatistics/SellingStatistics";

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
        path: "about",
        Component: AboutUs,
      },
      {
        path: "contact",
        Component: ContactUs,
      },
      {
        path: "terms",
        Component: TermsOfUse,
      },
      {
        path: "privacyPolicy",
        Component: PrivacyPolicy,
      },
      {
        path: "/*",
        Component: ErrorPage,
      },
      {
        path: "forbidden",
        Component: Forbidden,
      },
      {
        path: "allProperties",
        element: <PrivateRoute>
          <AllProperties></AllProperties>
        </PrivateRoute>
      },
      {
        path: "properties/:id",
        element: <PrivateRoute>
          <PropertyDetails></PropertyDetails>
        </PrivateRoute>
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/reset",
        Component: ResetPassword,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      //common route
      {
        path: "profile",
        Component: Profile,
      },

      //user only route
      {
        path: "wishlist",
        element: <UserRoute>
          <Wishlist></Wishlist>
        </UserRoute>
      },
      {
        path: "/dashboard/my-offer/:id",
        element: <UserRoute>
          <MakeOffer></MakeOffer>
        </UserRoute>
      },
      {
        path: "propertyBought",
        element: <UserRoute>
          <PropertyBought></PropertyBought>
        </UserRoute>
      },
      {
        path: "myReviews",
        element: <UserRoute>
          <MyReviews></MyReviews>
        </UserRoute>
      },

      //admin only route
      {
        path: "manageProperties",
        element: <AdminRoute>
          <ManageProperties></ManageProperties>
        </AdminRoute>
      },
      {
        path: "manageUsers",
        element: <AdminRoute>
          <ManageUsers></ManageUsers>
        </AdminRoute>
      },
      {
        path: "manageReviews",
        element: <AdminRoute>
          <ManageReviews></ManageReviews>
        </AdminRoute>
      },
      {
        path: "advertise",
        element: <AdminRoute>
          <AdvertiseProperty></AdvertiseProperty>
        </AdminRoute>
      },
      {
        path: "report",
        element: <AdminRoute>
          <ReportedProperty></ReportedProperty>
        </AdminRoute>
      },

      //agent only route
      {
        path: "addProperty",
        element: <AgentRoute>
          <AddProperty></AddProperty>
        </AgentRoute>
      },
      {
        path: "myProperties",
        element: <AgentRoute>
          <MyProperties></MyProperties>
        </AgentRoute>
      },
      {
        path: "/dashboard/update-property/:id",
        element: <AgentRoute>
          <UpdateProperty></UpdateProperty>
        </AgentRoute>
      },
      {
        path: "soldProperties",
        element: <AgentRoute>
          <SoldProperties></SoldProperties>
        </AgentRoute>
      },
      {
        path: "requestedProperties",
        element: <AgentRoute>
          <RequestedProperties></RequestedProperties>
        </AgentRoute>
      },
      {
        path: "statistics",
        element: <AgentRoute>
          <SellingStatistics></SellingStatistics>
        </AgentRoute>
      },
    ],
  },
]);
