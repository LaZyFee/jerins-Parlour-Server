import { NavLink, Outlet } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { GiNotebook } from "react-icons/gi";
import { TbMessages } from "react-icons/tb";

function CustomerLayout() {
  const menuItems = [
    { name: "Book", icon: <FiShoppingCart />, path: "." },
    { name: "Booking list", icon: <GiNotebook />, path: "booking-list" },
    { name: "Review", icon: <TbMessages />, path: "review" },
  ];

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
        {/* Page content here */}
        <Outlet />
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-64 p-4 text-xl">
          {/* Sidebar content here */}
          {menuItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) => (isActive ? "text-[#F63E7B]" : "")}
                end={item.path === "."} // Ensure exact matching for the root route
              >
                <span className="inline-flex items-center">
                  {item.icon}
                  <span className="ml-2">{item.name}</span>
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CustomerLayout;
