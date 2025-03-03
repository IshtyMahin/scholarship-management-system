
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import AddScholarship from "./components/Admin/AddScholarship";
import ManageScholarships from "./components/Admin/ManageScholarships";
import ManageApplications from "./components/Admin/ManageApplications";
import AvailableScholarships from "./components/User/AvailableScholarships";
import AppliedScholarships from "./components/User/AppliedScholarships";
import { createBrowserRouter, Navigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

const ProtectedRoute = ({ element, role }) => {
  const { user, setUser, refreshToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const authenticate = async () => {
      let token = localStorage.getItem("access_token");
      const storedRole = localStorage.getItem("role");

      if (!token && localStorage.getItem("refresh_token")) {
        token = await refreshToken();
      }

      if (!token || !storedRole) {
        localStorage.clear();
        navigate("/login");
        return;
      }

      if (!user) {
        setUser({ role: storedRole });
      }

      if (role && storedRole !== role) {
        navigate(
          storedRole === "admin" ? "/admin-dashboard" : "/user-dashboard"
        );
      }
    };

    authenticate();
  }, [user, setUser, refreshToken, navigate]);

  return element;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/admin-dashboard",
    element: <ProtectedRoute element={<AdminDashboard />} role="admin" />,
    children: [
      {
        path: "",
        element: <AddScholarship />,
      },
      {
        path: "add-scholarship",
        element: <AddScholarship />,
      },
      {
        path: "manage-scholarships",
        element: <ManageScholarships />,
      },
      {
        path: "manage-applications",
        element: <ManageApplications />,
      },
    ],
  },
  {
    path: "/user-dashboard",
    element: <ProtectedRoute element={<UserDashboard />} role="user" />,
    children: [
      {
        path: "",
        element: <Navigate to="available-scholarships" replace />,
      },
      {
        path: "available-scholarships",
        element: <AvailableScholarships />,
      },
      {
        path: "applied-scholarships",
        element: <AppliedScholarships />,
      },
    ],
  },
]);
