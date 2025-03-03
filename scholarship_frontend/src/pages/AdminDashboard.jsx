import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "../components/Admin/Sidebar";
import AddScholarship from "../components/Admin/AddScholarship";
import ManageApplications from "../components/Admin/ManageApplications";
import ManageScholarships from "../components/Admin/ManageScholarships";

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar />
      <div className="flex-1 p-8">
        <Routes>
          <Route
            path="add-scholarship" 
            element={<AddScholarship />}
          />
          <Route
            path="manage-scholarships" 
            element={<ManageScholarships />}
          />
          <Route
            path="manage-applications" 
            element={<ManageApplications />}
          />
          <Route path="/" element={<Navigate to="add-scholarship" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
