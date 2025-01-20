import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import NotFound from "../Pages/Shared/Notfound";
import Home from "../Pages/Outlets/Home";
import Signup from "../Pages/Authentication/Signup";
import Login from "../Pages/Authentication/Login";
import OurTeam from "../Pages/Outlets/OurTeam";
import ContactUs from "../Pages/Outlets/ContactUs";
import CustomerLayout from "../Layouts/CustomerLayout";
import Booking from "../Pages/Customer/Booking";
import BookingList from "../Pages/Customer/BookingList";
import CustomerReviews from "../Pages/Customer/CustomerReviews";
import OrderList from "../Pages/Admin/OrderList";
import AddService from "../Pages/Admin/AddService";
import MakeAdmin from "../Pages/Admin/MakeAdmin";
import ManageService from "../Pages/Admin/ManageService";
import AdminLayouts from "../Layouts/AdminLayouts";
import Services from "../Pages/Outlets/Services";
import Checkout from "../Pages/Customer/Payments/Checkout";
import Profile from "../Pages/Outlets/Profile";
import UpdateService from "../Pages/Admin/UpdateService";
import PrivateRoutes from "./PrivateRoutes";
import AdminRoutes from "./AdminRoutes";
import LoginSuccess from "../Pages/Authentication/LoginSucess";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/team", element: <OurTeam /> },
      { path: "/contact", element: <ContactUs /> },
      { path: "/services", element: <Services /> },
      { path: "/profile", element: <Profile /> },
      {
        path: "/booking",
        element: (
          <PrivateRoutes>
            {" "}
            <CustomerLayout />
          </PrivateRoutes>
        ),
        children: [
          {
            path: "",
            element: <Booking />,
          },
          {
            path: "booking-list",
            element: <BookingList />,
          },
          {
            path: "review",
            element: <CustomerReviews />,
          },
          {
            path: "checkout",
            element: <Checkout />,
          },
        ],
      },
    ],
  },
  {
    path: "/admin/dashboard",
    element: (
      <AdminRoutes>
        {" "}
        <AdminLayouts />
      </AdminRoutes>
    ),
    children: [
      {
        path: "",
        element: <OrderList />,
      },
      {
        path: "add-service",
        element: <AddService />,
      },
      {
        path: "make-admin",
        element: <MakeAdmin />,
      },
      {
        path: "manage-services",
        element: <ManageService />,
      },
      {
        path: "update-service",
        element: <UpdateService />,
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/login/success", element: <LoginSuccess /> },
  { path: "*", element: <NotFound /> },
]);
