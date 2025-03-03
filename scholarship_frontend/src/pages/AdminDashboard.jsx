import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Sidebar from "../components/Admin/Sidebar";
import AddScholarship from "../components/Admin/AddScholarship";
import ManageApplications from "../components/Admin/ManageApplications";
import ManageScholarships from "../components/Admin/ManageScholarships";

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar />
      <div className="pl-72 flex-1 p-8">
        <Outlet/>
      </div>
    </div>
  );
};

export default AdminDashboard;
