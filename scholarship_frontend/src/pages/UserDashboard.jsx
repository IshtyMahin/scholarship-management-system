import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  createApplication,
  getScholarships,
  getApplications,
} from "../services/api";
import AvailableScholarships from "../components/User/AvailableScholarships";
import AppliedScholarships from "../components/User/AppliedScholarships";
import Sidebar from "../components/User/Sidebar";

const UserDashboard = () => {
  const [scholarships, setScholarships] = useState([]);
  const [appliedScholarships, setAppliedScholarships] = useState([]);

  useEffect(() => {
    const fetchScholarships = async () => {
      const data = await getScholarships();
      console.log(data);
      setScholarships(data.data);
    };
    fetchScholarships();
  }, []);

  useEffect(() => {
    const fetchAppliedScholarships = async () => {
      const data = await getApplications();
      console.log(data);
      setAppliedScholarships(data.data);
    };
    fetchAppliedScholarships();
  }, []);

  const handleApply = async (scholarship, transcript, recommendationLetter) => {
    
    const isAlreadyApplied = appliedScholarships.some(
      (appliedScholarship) =>
        appliedScholarship.scholarship.id === scholarship.id
    );

    if (isAlreadyApplied) {
      toast.error("You have already applied for this scholarship.");
      return; 
    }

    const formData = new FormData();
    formData.append("scholarship", scholarship.id);
    formData.append("transcript", transcript);
    formData.append("recommendation_letter", recommendationLetter);


    try {
      const res = await createApplication(formData);

      toast.success("Application submitted successfully!");
      setAppliedScholarships([...appliedScholarships, res]);
    } catch (error) {
      toast.error("Failed to submit application");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar />
      <div className="pl-72 flex-1 p-8">
        <Routes>
          <Route
            path="available-scholarships"
            element={
              <AvailableScholarships
                scholarships={scholarships}
                handleApply={handleApply}
              />
            }
          />
          <Route
            path="applied-scholarships"
            element={
              <AppliedScholarships appliedScholarships={appliedScholarships} />
            }
          />
          <Route
            path="/"
            element={<Navigate to="available-scholarships" replace />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default UserDashboard;
