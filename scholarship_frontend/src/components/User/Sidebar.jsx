import React from "react";
import { Link, useLocation } from "react-router-dom";
import { BookOpen, CheckCircle } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="w-72 bg-gray-800 text-white p-4">
      <h1 className="text-2xl font-bold mb-8 text-green-500">User Panel</h1>
      <ul>
        <li className="mb-4">
          <Link
            to="/user-dashboard/available-scholarships"
            className={`flex items-center gap-2 p-2 rounded ${
              location.pathname === "/user-dashboard/available-scholarships"
                ? "bg-green-600"
                : "hover:bg-gray-700"
            }`}
          >
            <BookOpen size={20} />
            Available Scholarships
          </Link>
        </li>
        <li className="mb-4">
          <Link
            to="/user-dashboard/applied-scholarships"
            className={`flex items-center gap-2 p-2 rounded ${
              location.pathname === "/user-dashboard/applied-scholarships"
                ? "bg-green-600"
                : "hover:bg-gray-700"
            }`}
          >
            <CheckCircle size={20} />
            Applied Scholarships
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
