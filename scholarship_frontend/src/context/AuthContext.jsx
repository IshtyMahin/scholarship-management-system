import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role) {
      setUser({ role });
    }
  }, []);

  const refreshToken = async () => {
    try {
      const refresh = localStorage.getItem("refresh_token");
      if (!refresh) return null;

      const response = await axios.post(
        "http://127.0.0.1:8000/api/token/refresh/",
        { refresh }
      );
      localStorage.setItem("access_token", response.data.access);
      return response.data.access;
    } catch (error) {
      console.log("Refresh token failed", error);
      localStorage.clear();
      return null;
    }
  };

  const login = async (credentials, navigate) => {
    try {
      localStorage.setItem("access_token", "");
      localStorage.setItem("refresh_token", "");
      localStorage.setItem("role", "");
      const response = await axios.post(
        "http://127.0.0.1:8000/api/login/",
        credentials
      );
      console.log(response);
    const isAdmin = response.data.user.is_admin
    localStorage.setItem("access_token", response.data.tokens.access);
    localStorage.setItem("refresh_token", response.data.tokens.refresh);
    localStorage.setItem("role", isAdmin?'admin' : 'user');

      console.log(isAdmin);
      
      setUser(isAdmin ? 'admin' : 'user' );
      navigate(isAdmin ? "/admin-dashboard" : "/user-dashboard");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const signUp = async (userData, navigate) => {
    try {
      localStorage.setItem("access_token", "");
      localStorage.setItem("refresh_token", "");
      localStorage.setItem("role", "");
      const response = await axios.post(
        "http://127.0.0.1:8000/api/register/",
        userData
      );
      const isAdmin = response.data.user.is_admin
      localStorage.setItem("access_token", response.data.token.access);
      localStorage.setItem("refresh_token", response.data.token.refresh);
      localStorage.setItem("role", isAdmin ? "admin" : "user");

     setUser(isAdmin ? 'admin' : 'user' );
      navigate(isAdmin ? "/admin-dashboard" : "/user-dashboard");
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  const logout = (navigate) => {
    localStorage.clear();
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, login, signUp, logout, refreshToken, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
