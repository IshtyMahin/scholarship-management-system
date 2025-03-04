import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BookOpen, CheckCircle, LogOut } from "lucide-react";

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
    <div className="w-72 fixed bg-gray-800 text-white p-4 flex flex-col justify-between h-screen">
      <div>
        <h1 className="text-2xl font-bold mb-8 text-green-500">User Panel</h1>
        <ul>
          <li className="mb-4">
            <Link
              to="available-scholarships"
              className={`flex items-center gap-2 p-2 rounded ${
                location.pathname === "/user-dashboard/available-scholarships" ||
                location.pathname === "/user-dashboard"
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
              to="applied-scholarships"
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
      <div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 p-2 w-full text-left rounded bg-red-500 hover:bg-red-700 transition">
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;