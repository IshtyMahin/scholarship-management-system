import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 
    setSuccess(""); 
    setLoading(true); 

    try {
      const response = await signUp(userData);
      if (response.success) {
        setSuccess(response.success);
        navigate("/login"); 
      }
    } catch (error) {
      console.error(error);
      setError(
        error.response?.data?.error || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="card w-full max-w-md bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="card-body p-8">
          <h2 className="card-title text-3xl font-semibold text-gray-800 mb-6 text-center">
            Register
          </h2>
          {success && (
            <p className="text-green-500 text-sm text-center mb-4">{success}</p>
          )}
          {error && (
            <p className="text-red-500 text-sm text-center mb-4">{error}</p>
          )}
          <form onSubmit={handleSubmit}>
            <div className="form-control mb-6">
              <label className="label text-gray-700 mb-2 block">Username</label>
              <input
                type="text"
                placeholder="Enter your username"
                className="input input-bordered w-full bg-gray-100 border-gray-300 focus:border-green-600 focus:ring-2 focus:ring-green-600 rounded-lg p-3 transition duration-200"
                value={userData.username}
                onChange={(e) =>
                  setUserData({ ...userData, username: e.target.value })
                }
                required
              />
            </div>
            <div className="form-control mb-6">
              <label className="label text-gray-700 mb-2 block">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full bg-gray-100 border-gray-300 focus:border-green-600 focus:ring-2 focus:ring-green-600 rounded-lg p-3 transition duration-200"
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
                required
              />
            </div>
            <div className="form-control mb-6">
              <label className="label text-gray-700 mb-2 block">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="input input-bordered w-full bg-gray-100 border-gray-300 focus:border-green-600 focus:ring-2 focus:ring-green-600 rounded-lg p-3 transition duration-200"
                value={userData.password}
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
                required
              />
            </div>
            <div className="form-control mb-6">
              <button
                type="submit"
                className={`btn btn-success ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                } text-white w-full rounded-xl py-3 transition-all duration-200`}
                disabled={loading}
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </div>
          </form>
          <div className="text-center mt-4">
            <span className="text-sm text-gray-600">
              Already have an account?{" "}
            </span>
            <Link to="/login" className="link link-success text-green-600">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
