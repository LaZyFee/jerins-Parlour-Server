import { NavLink, Outlet } from "react-router-dom";
import { GiNotebook } from "react-icons/gi";
import { FaHome, FaPlus, FaUserPlus } from "react-icons/fa";
import { IoGridOutline } from "react-icons/io5";

function AdminLayouts() {
  const menuItems = [
    { name: "Home", icon: <FaHome />, path: "/" },
    { name: "Order List", icon: <GiNotebook />, path: "." },
    { name: "Add Service", icon: <FaPlus />, path: "add-service" },
    { name: "Make Admin", icon: <FaUserPlus />, path: "make-admin" },
    {
      name: "Manage Service",
      icon: <IoGridOutline />,
      path: "manage-services",
    },
  ];

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
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
        <ul className="menu bg-base-200 text-base-content min-h-full w-64 p-4 text-xl place-content-center">
          {/* Sidebar content here */}
          {menuItems.map((item) => (
            <li key={item.name} className="mb-4">
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

export default AdminLayouts;
