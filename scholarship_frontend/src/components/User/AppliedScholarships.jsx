import React from "react";

const AppliedScholarships = ({ appliedScholarships }) => {
  return (
    <section className="p-10 min-h-screen bg-gray-900 text-gray-100">
      <h2 className="text-4xl font-extrabold text-green-400 mb-10 text-center">
        Applied Scholarships
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {appliedScholarships.map((application) => (
          <div
            key={application.id}
            className="bg-gray-800 shadow-lg rounded-2xl p-7 flex flex-col justify-between h-full"
          >
            <div className="space-y-5">
              {/* Scholarship Title */}
              <h3 className="text-2xl font-semibold text-green-300">
                {application.scholarship.title}
              </h3>

              {/* Scholarship Description */}
              <p className="text-lg text-gray-300">
                {application.scholarship.description}
              </p>

              {/* Scholarship Details */}
              <div className="text-lg text-gray-400 space-y-2">
                <p>
                  <strong className="text-green-400">Eligibility:</strong>{" "}
                  {application.scholarship.eligibility}
                </p>

                <div className="flex justify-between items-center">
                  <p className="text-yellow-400">
                    <strong>Deadline:</strong>{" "}
                    {application.scholarship.deadline}
                  </p>
                  <p className="text-blue-400">
                    <strong>Funding:</strong> $
                    {application.scholarship.funding_amount}
                  </p>
                </div>
              </div>

              {/* Application Status */}
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

            {/* Document Links */}
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

            {/* Submission Date */}
            <div className="mt-4 text-sm text-gray-500 text-center">
              🕒 Submitted on:{" "}
              {new Date(application.submitted_at).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AppliedScholarships;
