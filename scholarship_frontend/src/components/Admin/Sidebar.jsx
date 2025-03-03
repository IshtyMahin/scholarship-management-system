import React from "react";
import { Link, useLocation } from "react-router-dom";
import { PlusCircle, List, ClipboardCheck } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="w-72 bg-gray-800 text-white p-4">
      <h1 className="text-2xl font-bold mb-8 text-green-500">Admin Panel</h1>
      <ul>
        <li className="mb-4">
          <Link
            to="/admin-dashboard/add-scholarship"
            className={`flex items-center gap-2 p-2 rounded ${
              location.pathname === "/admin-dashboard/add-scholarship"
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
            to="/admin-dashboard/manage-scholarships"
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
            to="/admin-dashboard/manage-applications"
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
  );
};

export default Sidebar;
