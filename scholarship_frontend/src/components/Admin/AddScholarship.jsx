import React, { useState } from "react";
import { createScholarship } from "../../services/api";
import { toast } from "react-toastify"; 

const AddScholarship = () => {
  const [newScholarship, setNewScholarship] = useState({
    title: "",
    description: "",
    eligibility: "",
    deadline: "",
    funding_amount: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleAddScholarship = async () => {
    if (
      !newScholarship.title ||
      !newScholarship.description ||
      !newScholarship.eligibility ||
      !newScholarship.deadline ||
      !newScholarship.funding_amount
    ) {
      setError("⚠️ Please fill in all fields.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await createScholarship(newScholarship);
      setSuccess("✅ Scholarship added successfully!");
      toast.success("Scholarship added successfully!"); 
      setNewScholarship({
        title: "",
        description: "",
        eligibility: "",
        deadline: "",
        funding_amount: "",
      });
    } catch (error) {
      setError("❌ Failed to add scholarship. Try again.");
      toast.error("Failed to add scholarship. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="p-8  rounded-xl shadow-lg max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-green-600 text-center mb-6">
        🎓 Add New Scholarship
      </h2>

      {success && (
        <p className="p-4 bg-green-600 border border-green-400 text-white rounded-md text-center">
          {success}
        </p>
      )}

      {error && (
        <p className="p-4 bg-red-600 border border-red-400 text-white rounded-md text-center">
          {error}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <InputField
          label="Title"
          type="text"
          placeholder="Scholarship title"
          value={newScholarship.title}
          onChange={(val) =>
            setNewScholarship({ ...newScholarship, title: val })
          }
        />
        <InputField
          label="Deadline"
          type="date"
          value={newScholarship.deadline}
          onChange={(val) =>
            setNewScholarship({ ...newScholarship, deadline: val })
          }
        />
        <TextareaField
          label="Description"
          placeholder="Scholarship details"
          value={newScholarship.description}
          onChange={(val) =>
            setNewScholarship({ ...newScholarship, description: val })
          }
        />
        <TextareaField
          label="Eligibility"
          placeholder="Eligibility criteria"
          value={newScholarship.eligibility}
          onChange={(val) =>
            setNewScholarship({ ...newScholarship, eligibility: val })
          }
        />
        <InputField
          label="Funding Amount ($)"
          type="number"
          placeholder="Enter amount"
          value={newScholarship.funding_amount}
          onChange={(val) =>
            setNewScholarship({ ...newScholarship, funding_amount: val })
          }
        />
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={handleAddScholarship}
          className={`btn w-full md:w-auto px-6 py-3 font-medium rounded-lg bg-green-600 text-white hover:bg-green-700 transition duration-200 ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="loading loading-spinner mr-2"></span>
              Adding...
            </>
          ) : (
            "Add Scholarship"
          )}
        </button>
      </div>
    </section>
  );
};

const InputField = ({ label, type, placeholder, value, onChange }) => (
  <div className="flex flex-col">
    <label className="text-sm font-medium text-white">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      className="input w-full px-4 py-2 border border-gray-600 rounded-lg focus:border-green-500 focus:ring-1 focus:ring-green-400 text-white bg-gray-700 transition duration-200 hover:border-green-500"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

const TextareaField = ({ label, placeholder, value, onChange }) => (
  <div className="flex flex-col md:col-span-2">
    <label className="text-sm font-medium text-white">{label}</label>
    <textarea
      placeholder={placeholder}
      className="textarea w-full px-4 py-2 border border-gray-600 rounded-lg focus:border-green-500 focus:ring-1 focus:ring-green-400 text-white bg-gray-700 transition duration-200 hover:border-green-500"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={3}
    />
  </div>
);

export default AddScholarship;
