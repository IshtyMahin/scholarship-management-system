import React, { useEffect } from "react";
import {
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import { router } from "./router";






const App = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
};

export default App;
