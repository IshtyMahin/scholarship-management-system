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

    if (response?.data?.success) {
      const data = response.data.data;
      const isAdmin = data?.user.is_admin;
      localStorage.setItem("access_token", data.tokens.access);
      localStorage.setItem("refresh_token", data.tokens.refresh);
      localStorage.setItem("role", isAdmin ? "admin" : "user");

      setUser(isAdmin ? "admin" : "user");

      navigate(isAdmin ? "/admin-dashboard" : "/user-dashboard");
    }

    return response.data;
  } catch (error) {
    console.log(error);

    return error.response;
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
    console.log(response);
    const res =  response.data
    if (res.success) {
      console.log("asdfsadfsd");
      console.log(res);
      
      const isAdmin =res.data.user.is_admin;
      console.log(isAdmin);
      
      localStorage.setItem("access_token", res.data.tokens.access);
      localStorage.setItem("refresh_token", res.data.tokens.refresh);
      localStorage.setItem("role", isAdmin ? "admin" : "user");

      setUser(isAdmin ? "admin" : "user");

      navigate(isAdmin ? "/admin-dashboard" : "/user-dashboard");
    }
    return res;
  } catch (error) {
    return error.response;
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
