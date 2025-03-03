import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import toast from "daisyui/components/toast";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    
    try {
      const response = await login(credentials, navigate);
      console.log(response);
      if (response?.success) {
        toast.success(response.message);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.log(error);
      
      setError(error.message || "Invalid username or password"); 
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center py-12 px-4">
      <div className="card w-full max-w-md bg-gray-900 shadow-xl rounded-lg overflow-hidden">
        <div className="card-body p-8">
          <h2 className="card-title text-3xl font-semibold text-green-600 mb-6 text-center">
            Login
          </h2>
          {success && (
            <p className="text-green-500 text-sm text-center mt-2">{success}</p>
          )}
          {error && (
            <p className="text-red-500 text-sm text-center mt-2">{error}</p>
          )}
          <form onSubmit={handleSubmit}>
            <div className="form-control mb-6">
              <label className="label text-gray-400 mb-2 block">Username</label>
              <input
                type="text"
                placeholder="Enter your username"
                className="input input-bordered w-full bg-gray-100 border-gray-300 focus:border-green-600 focus:ring-2 focus:ring-green-600 rounded-lg p-3 transition duration-200"
                value={credentials.username}
                onChange={(e) =>
                  setCredentials({ ...credentials, username: e.target.value })
                }
                required
              />
            </div>
            <div className="form-control mb-6">
              <label className="label text-gray-400 mb-2 block">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="input input-bordered w-full bg-gray-100 border-gray-300 focus:border-green-600 focus:ring-2 focus:ring-green-600 rounded-lg p-3 transition duration-200"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
                required
              />
            </div>
            <div className="form-control mb-6">
              <button
                type="submit"
                className="btn btn-success bg-green-600 hover:bg-green-700 text-white w-full rounded-xl py-3 transition-all duration-200"
              >
                Login
              </button>
            </div>
          </form>
          <div className="text-center mt-4">
            <span className="text-sm text-gray-600">
              Don't have an account?{" "}
            </span>
            <Link to="/register" className="link link-success text-green-600">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
