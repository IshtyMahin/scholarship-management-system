import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";

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
        navigate(storedRole === "admin" ? "/admin-dashboard" : "/user-dashboard");
      }
    };

    authenticate();
  }, [user, setUser, refreshToken, navigate]);

  return element;
};

const App = () => {
  return (
    <>
      <ToastContainer />
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/admin-dashboard/*"
              element={
                <ProtectedRoute element={<AdminDashboard />} role="admin" />
              }
            />
            <Route
              path="/user-dashboard/*"
              element={
                <ProtectedRoute element={<UserDashboard />} role="user" />
              }
            />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
};

export default App;
