import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PlusCircle, List, ClipboardCheck, LogOut } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("access_token");

    navigate("/");
  };

  return (
    <div className="w-72 bg-gray-800 text-white p-4 flex flex-col justify-between fixed h-screen">
      <div>
        <h1 className="text-2xl font-bold mb-8 text-green-500">Admin Panel</h1>
        <ul>
          <li className="mb-4">
            <Link
              to="add-scholarship"
              className={`flex items-center gap-2 p-2 rounded ${
                location.pathname === "/admin-dashboard/add-scholarship" ||
                location.pathname === "/admin-dashboard"
                  ? "bg-green-600"
                  : "hover:bg-gray-700"
              }`}
            >
              <PlusCircle size={20} />
              Add Scholarship
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="manage-scholarships"
              className={`flex items-center gap-2 p-2 rounded ${
                location.pathname === "/admin-dashboard/manage-scholarships"
                  ? "bg-green-600"
                  : "hover:bg-gray-700"
              }`}
            >
              <List size={20} />
              Manage Scholarships
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="manage-applications"
              className={`flex items-center gap-2 p-2 rounded ${
                location.pathname === "/admin-dashboard/manage-applications"
                  ? "bg-green-600"
                  : "hover:bg-gray-700"
              }`}
            >
              <ClipboardCheck size={20} />
              Manage Applications
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 p-2 w-full text-left rounded hover:bg-gray-700"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
