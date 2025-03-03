import React, { useEffect, useState } from "react";
import {
  getScholarships,
  deleteScholarship,
  updateScholarship,
} from "../../services/api";
import { Calendar, DollarSign, CheckCircle, Trash2, Edit } from "lucide-react";
import { toast } from "react-toastify"; 

const ManageScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [editingScholarship, setEditingScholarship] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    eligibility: "",
    deadline: "",
    funding_amount: "",
  });
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    const fetchScholarships = async () => {
      setLoading(true);
      try {
        const data = await getScholarships();
        setScholarships(data);
      } catch (error) {
        toast.error("Error fetching scholarships");
      } finally {
        setLoading(false);
      }
    };
    fetchScholarships();
  }, []);

  const handleDeleteScholarship = async (id) => {
    if (window.confirm("Are you sure you want to delete this scholarship?")) {
      setLoading(true);
      try {
        await deleteScholarship(id);
        setScholarships(
          scholarships.filter((scholarship) => scholarship.id !== id)
        );
        toast.success("Scholarship deleted successfully");
      } catch (error) {
        toast.error("Error deleting scholarship");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEditClick = (scholarship) => {
    setEditingScholarship(scholarship.id);
    setFormData(scholarship);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateScholarship = async (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to update this scholarship?")) {
      setLoading(true);
      try {
        await updateScholarship(editingScholarship, formData);
        setScholarships(
          scholarships.map((s) =>
            s.id === editingScholarship ? { ...s, ...formData } : s
          )
        );
        setEditingScholarship(null);
        toast.success("Scholarship updated successfully");
      } catch (error) {
        toast.error("Error updating scholarship");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <section className="p-8 min-h-screen  text-gray-100">
      <h2 className="text-4xl font-bold text-green-400 mb-8 text-center">
        Manage Scholarships
      </h2>

      {loading && (
        <div className="flex justify-center items-center py-6">
          <div className="spinner-border text-green-500" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {scholarships.map((scholarship) => (
          <div
            key={scholarship.id}
            className="bg-gray-800 shadow-lg rounded-xl p-6 flex flex-col justify-between h-full"
          >
            {editingScholarship === scholarship.id ? (
              <form onSubmit={handleUpdateScholarship} className="space-y-4">
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                  placeholder="Title"
                />
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                  placeholder="Description"
                />
                <input
                  type="text"
                  name="eligibility"
                  value={formData.eligibility}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                  placeholder="Eligibility"
                />
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <input
                  type="number"
                  name="funding_amount"
                  value={formData.funding_amount}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                  placeholder="Funding Amount"
                />

                <div className="flex justify-end gap-3">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingScholarship(null)}
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4 flex-grow">
                <h3 className="text-2xl font-semibold text-green-300">
                  {scholarship.title}
                </h3>
                <p className="text-gray-300">{scholarship.description}</p>

                <div className="flex items-center gap-2 text-yellow-400">
                  <CheckCircle size={18} />
                  <p>
                    <strong>Eligibility:</strong> {scholarship.eligibility}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-blue-400">
                  <Calendar size={18} />
                  <p>
                    <strong>Deadline:</strong> {scholarship.deadline}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-green-400">
                  <DollarSign size={18} />
                  <p>
                    <strong>Funding:</strong> ${scholarship.funding_amount}
                  </p>
                </div>
              </div>
            )}

            <div className="flex justify-between mt-4">
              <button
                onClick={() => handleEditClick(scholarship)}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition flex items-center gap-1"
              >
                <Edit size={16} /> Update
              </button>
              <button
                onClick={() => handleDeleteScholarship(scholarship.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition flex items-center gap-1"
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ManageScholarships;
