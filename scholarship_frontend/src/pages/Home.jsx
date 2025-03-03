import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-800 text-gray-500">
      <nav className="navbar bg-gray-900 shadow-lg px-6 py-4 flex justify-between items-center sticky top-0 z-10 rounded-lg ">
        <Link
          to="/"
          className="text-3xl font-bold text-green-600 hover:text-green-700   transition-all"
        >
          Scholarship System
        </Link>
        <div className="space-x-6">
          <Link
            to="/login"
            className="btn btn-outline border-1 hover:bg-green-600 px-3 py-2 hover:text-white text-lg rounded-xl transition-all"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="btn btn-outline border-1 hover:bg-green-600 px-3 py-2 hover:text-white text-lg rounded-xl transition-all"
          >
            Register
          </Link>
        </div>
      </nav>

      <div className="flex-grow flex items-center justify-center text-center py-12 md:py-20">
        <div className="max-w-4xl px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight text-green-600">
            Scholarship Management System
          </h1>
          <p className="py-4 text-lg text-gray-600 md:text-xl">
            Apply for scholarships and manage your applications seamlessly.
            Start your journey today and grab the best opportunities.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <Link
              to="/login"
              className="btn btn-outline border-1 hover:bg-green-600 px-6 py-3 hover:text-white text-lg rounded-xl transition-all"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="btn btn-outline border-1 hover:bg-green-600 px-6 py-3 hover:text-white text-lg rounded-xl transition-all"
            >
              Register
            </Link>
          </div>
        </div>
      </div>

      <footer className="footer footer-center p-6 bg-gray-900 text-gray-500 text-sm rounded-tl-lg rounded-tr-lg text-center">
        <p>
          © {new Date().getFullYear()} Scholarship System. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;
