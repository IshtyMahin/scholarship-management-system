import React, { useState } from "react";
import {
  FileText,
  DollarSign,
  Clock,
  CheckCircle,
  File,
  XCircle,
} from "lucide-react";

const AvailableScholarships = ({ scholarships, handleApply }) => {
  console.log(scholarships);
  
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [transcript, setTranscript] = useState(null);
  const [recommendationLetter, setRecommendationLetter] = useState(null);

  const handleApplicationSubmit = (e) => {
    e.preventDefault();
    if (!transcript || !recommendationLetter) {
      alert("Please upload both files");
      return;
    }

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    const maxSize = 5 * 1024 * 1024;

    if (!allowedTypes.includes(transcript.type)) {
      alert("Transcript must be a PDF or Word document");
      return;
    }

    if (!allowedTypes.includes(recommendationLetter.type)) {
      alert("Recommendation letter must be a PDF or Word document");
      return;
    }

    if (transcript.size > maxSize || recommendationLetter.size > maxSize) {
      alert("File size must be less than 5MB");
      return;
    }

    handleApply(selectedScholarship, transcript, recommendationLetter);
    setSelectedScholarship(null);
    setTranscript(null);
    setRecommendationLetter(null);
  };

  return (
    <section className="p-12 min-h-screen bg-gray-900 text-gray-100">
      {!selectedScholarship ? (
        <>
          <h2 className="text-4xl font-extrabold text-green-400 mb-12 text-center">
            Available Scholarships
          </h2>
          {Array.isArray(scholarships) && scholarships.length === 0 ? (
            <div className="text-center text-gray-300 text-xl">
              No scholarships available.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
              {scholarships.map((scholarship) => (
                <div
                  key={scholarship.id}
                  className="bg-gray-800 shadow-lg rounded-xl p-8 transition transform hover:scale-105 hover:shadow-2xl border border-gray-700 flex flex-col"
                >
                  <div className="space-y-4 flex-grow">
                    <h3 className="text-2xl font-bold text-green-300">
                      {scholarship.title}
                    </h3>
                    <p className="text-lg text-gray-300">
                      {scholarship.description}
                    </p>

                    <div className="space-y-3">
                      <p className="flex items-center gap-2 text-lg text-gray-400">
                        <CheckCircle size={20} className="text-green-300" />
                        <strong>Eligibility:</strong> {scholarship.eligibility}
                      </p>
                      <p className="flex items-center gap-2 text-lg text-gray-400">
                        <Clock size={20} className="text-yellow-400" />
                        <strong>Deadline:</strong> {scholarship.deadline}
                      </p>
                      <p className="flex items-center gap-2 text-lg text-gray-400">
                        <DollarSign size={20} className="text-blue-300" />
                        <strong>Funding:</strong> ${scholarship.funding_amount}
                      </p>
                    </div>
                  </div>

                  <div className="mt-auto flex justify-center">
                    <button
                      onClick={() => setSelectedScholarship(scholarship)}
                      className="bg-green-500 text-white hover:bg-green-600 transition px-6 py-3 rounded-lg text-lg font-semibold w-full"
                      aria-label={`Apply for ${scholarship.title}`}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="mt-12 p-10 bg-gray-800 text-white rounded-xl shadow-xl border border-gray-700 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-green-400 mb-6 text-center">
            Apply for {selectedScholarship.title}
          </h2>
          <p className="text-lg text-gray-300 text-center mb-6">
            {selectedScholarship.description}
          </p>

          <form onSubmit={handleApplicationSubmit} className="space-y-6">
            <div>
              <label className="block text-lg font-medium text-gray-300 mb-2">
                <File size={20} className="inline-block mr-2 text-green-400" />
                Upload Transcript
              </label>
              <input
                type="file"
                className="block w-full text-gray-300 border border-gray-600 rounded-lg p-3 bg-gray-700 cursor-pointer focus:ring focus:ring-green-400"
                onChange={(e) => setTranscript(e.target.files[0])}
                required
                accept=".pdf,.doc,.docx"
                aria-label="Upload transcript"
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-300 mb-2">
                <FileText
                  size={20}
                  className="inline-block mr-2 text-green-400"
                />
                Upload Recommendation Letter
              </label>
              <input
                type="file"
                className="block w-full text-gray-300 border border-gray-600 rounded-lg p-3 bg-gray-700 cursor-pointer focus:ring focus:ring-green-400"
                onChange={(e) => setRecommendationLetter(e.target.files[0])}
                required
                accept=".pdf,.doc,.docx"
                aria-label="Upload recommendation letter"
              />
            </div>

            <div className="flex justify-center mt-6 gap-2">
              <button
                type="submit"
                className="w-full bg-green-500 text-white hover:bg-green-600 transition px-6 py-3 rounded-lg text-xl font-semibold"
                aria-label="Submit application"
              >
                Submit Application
              </button>
              <button
                onClick={() => setSelectedScholarship(null)}
                className="text-center w-full bg-red-500 text-white hover:bg-red-600 transition px-6 py-3 rounded-lg text-lg font-semibold flex items-center gap-2"
                aria-label="Cancel application"
              >
                <XCircle size={20} /> Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
};

export default AvailableScholarships;
