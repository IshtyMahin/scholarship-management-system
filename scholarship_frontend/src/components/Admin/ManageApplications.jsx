import React, { useEffect, useState } from "react";
import { deleteApplication, getApplications, updateApplicationStatus } from "../../services/api";
import { toast } from "react-toastify"; 

const ManageApplications = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [scholarshipFilter, setScholarshipFilter] = useState("All");
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const data = await getApplications();
        setApplications(data);
        setFilteredApplications(data); 
      } catch (error) {
        toast.error("Failed to fetch applications");
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  const handleUpdateApplicationStatus = async (id, status) => {
    const confirmUpdate = window.confirm("Are you sure you want to update the application status?");
    if (!confirmUpdate) return;

    try {
      setLoading(true);
      await updateApplicationStatus(id, status);

      const updateStatus = (prevData) => prevData.map((application) =>
        application.id === id ? { ...application, status } : application
      );

      setApplications(updateStatus);
      setFilteredApplications(updateStatus);

      toast.success("Application status updated successfully!");
    } catch (error) {
      toast.error("Error updating application status");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteApplication = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this application?");
    if (!confirmDelete) return;

    try {
      setLoading(true);
      console.log(id);
      
      await deleteApplication(id);

      const deleteApp = (prevData) => prevData.filter((application) => application.id !== id);

      setApplications(deleteApp);
      setFilteredApplications(deleteApp);

      toast.success("Application deleted successfully!");
    } catch (error) {
      console.log(error);
      
      toast.error("Error deleting application");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (status, scholarship) => {
    setStatusFilter(status);
    setScholarshipFilter(scholarship);
    filterApplications(status, scholarship);
  };

  const filterApplications = (status, scholarship) => {
    let filtered = applications;

    if (status !== "All") {
      filtered = filtered.filter((application) => application.status === status);
    }

    if (scholarship !== "All") {
      filtered = filtered.filter((application) => application.scholarship.title === scholarship);
    }

    setFilteredApplications(filtered);
  };

  const uniqueScholarships = [
    "All",
    ...new Set(applications.map((application) => application.scholarship.title)),
  ];

  return (
    <section className="p-8 bg-gray-900 min-h-screen">
      <h2 className="text-3xl font-bold text-green-500 mb-6">Manage Applications</h2>

      <div className="mb-6 flex justify-between">
        <select
          onChange={(e) => handleFilterChange(e.target.value, scholarshipFilter)}
          value={statusFilter}
          className="bg-gray-800 text-gray-300 px-4 py-2 rounded-md"
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>

        <select
          onChange={(e) => handleFilterChange(statusFilter, e.target.value)}
          value={scholarshipFilter}
          className="bg-gray-800 text-gray-300 px-4 py-2 rounded-md"
        >
          {uniqueScholarships.map((scholarship) => (
            <option key={scholarship} value={scholarship}>
              {scholarship}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredApplications.map((application) => (
          <div
            key={application.id}
            className="bg-gray-800 shadow-lg rounded-2xl p-7 flex flex-col justify-between h-full"
          >
            <div className="space-y-5">
              <h3 className="text-2xl font-semibold text-green-300">{application.scholarship.title}</h3>

              <p className="text-lg text-gray-300">Student: {application.student.username}</p>

              <div className="flex justify-center">
                <span
                  className={`px-4 py-2 text-lg font-semibold rounded-xl ${
                    application.status === "Pending"
                      ? "bg-yellow-600 text-yellow-200"
                      : application.status === "Approved"
                      ? "bg-green-600 text-green-200"
                      : "bg-red-600 text-red-200"
                  }`}
                >
                  {application.status}
                </span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => handleUpdateApplicationStatus(application.id, "Approved")}
                  className="bg-green-600 text-white hover:bg-green-700 transition duration-300 px-4 py-2 rounded-md text-sm"
                  disabled={loading}
                >
                  Approve
                </button>
                <button
                  onClick={() => handleUpdateApplicationStatus(application.id, "Rejected")}
                  className="bg-red-600 text-white hover:bg-red-700 transition duration-300 px-4 py-2 rounded-md text-sm"
                  disabled={loading}
                >
                  Reject
                </button>
                <button
                  onClick={() => handleDeleteApplication(application.id)}
                  className="bg-red-800 text-white hover:bg-red-900 transition duration-300 px-4 py-2 rounded-md text-sm"
                  disabled={loading}
                >
                  Delete
                </button>
              </div>
            </div>

            <div className="mt-6 space-y-3 border-t border-gray-700 pt-4">
              <a
                href={application.transcript}
                className="block text-lg text-green-400 hover:text-green-500 hover:underline transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                📄 View Transcript
              </a>
              <a
                href={application.recommendation_letter}
                className="block text-lg text-green-400 hover:text-green-500 hover:underline transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                📜 View Recommendation Letter
              </a>
            </div>

            <div className="mt-4 text-sm text-gray-500 text-center">
              🕒 Submitted on: {new Date(application.submitted_at).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ManageApplications;
