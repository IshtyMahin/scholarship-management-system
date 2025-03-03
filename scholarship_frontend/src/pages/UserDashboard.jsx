import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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
      setScholarships(data);
    };
    fetchScholarships();
  }, []);

  useEffect(() => {
    const fetchAppliedScholarships = async () => {
      const data = await getApplications(); 
      console.log(data);
      
      setAppliedScholarships(data);
    };
    fetchAppliedScholarships();
  }, []);

  const handleApply = async (scholarship, transcript, recommendationLetter) => {
    const formData = new FormData();
    formData.append("scholarship", scholarship.id);
    formData.append("transcript", transcript);
    formData.append("recommendation_letter", recommendationLetter);


    try {
      const res = await createApplication(formData);
      alert("Application submitted successfully!");
      setAppliedScholarships([...appliedScholarships, res]);
    } catch (error) {
      console.log(error);
      alert("Failed to submit application");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar />
      <div className="flex-1 p-8">
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
