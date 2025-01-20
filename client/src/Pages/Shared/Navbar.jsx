import { Link, NavLink, useNavigate } from "react-router-dom";
import NavLogo from "/assets/images/logo.png";
import { useAuth } from "../../Store/AuthStore";
import noImageFound from "/assets/images/user.jpg";
import { toast } from "react-hot-toast";

function Navbar() {
  const navigate = useNavigate();
  const { user, logout, isAdmin } = useAuth();
  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Our Team", path: "/team" },
    { name: "Contact Us", path: "/contact" },
    { name: "My Bookings", path: "/booking/booking-list" },
    ...(isAdmin ? [{ name: "Dashboard", path: "/admin/dashboard" }] : []),
  ].map((item) => (
    <NavLink
      key={item.name}
      to={item.path}
      className={({ isActive }) =>
        isActive
          ? "border-b-4 border-b-red-500 font-extrabold"
          : "hover:border-b-4 hover:border-b-gray-500 transition duration-300"
      }
    >
      {item.name}
    </NavLink>
  ));

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      toast.success("Logout successfully");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="navbar p-5 shadow-2xl">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={1}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {menuItems}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl normal-case">
          <img src={NavLogo} alt="logo" className="w-24 h-8 lg:w-36 lg:h-12" />
        </Link>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0 gap-4">{menuItems}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  src={
                    user.profilePic?.startsWith("https")
                      ? user.profilePic // Absolute URL
                      : user.profilePic
                      ? `${import.meta.env.VITE_API_URL}/${user.profilePic}` // Relative path
                      : noImageFound // Fallback image
                  }
                  className="w-10 rounded-full"
                  alt={user.name || "user profile"}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                </Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/login" className="btn">
            Login
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
