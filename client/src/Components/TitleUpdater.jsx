import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function TitleUpdater() {
  const location = useLocation();

  useEffect(() => {
    // Define route titles
    const titles = {
      "/": "Home -Jerin's Parlour",
      "/team": "Our Team -Jerin's Parlour",
      "/contact": "Contact Us -Jerin's Parlour",
      "/services": "Services -Jerin's Parlour",
      "/profile": "Your Profile -Jerin's Parlour",
      "/booking": "Booking -Jerin's Parlour",
      "/booking/booking-list": "Booking List -Jerin's Parlour",
      "/booking/review": "Customer Reviews -Jerin's Parlour",
      "/booking/checkout": "Checkout -Jerin's Parlour",
      "/admin/dashboard": "Admin Dashboard -Jerin's Parlour",
      "/admin/dashboard/add-service": "Add Service -Jerin's Parlour",
      "/admin/dashboard/make-admin": "Make Admin -Jerin's Parlour",
      "/admin/dashboard/manage-services": "Manage Services -Jerin's Parlour",
      "/login": "Login -Jerin's Parlour",
      "/signup": "Sign Up -Jerin's Parlour",
    };

    // Set document title based on route
    const path = location.pathname;
    const title = titles[path] || "MyApp"; // Fallback title
    document.title = title;
  }, [location]);

  return null;
}

export default TitleUpdater;
