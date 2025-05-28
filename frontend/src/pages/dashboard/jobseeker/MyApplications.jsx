import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
import { getCompanyLogoUrl } from "../../../utils/imageUtils";

const MyApplications = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get("/applications/me");
        setApplications(response.data);
      } catch (err) {
        setError("Failed to fetch applications");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#121212] pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#267d27]"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">My Applications</h1>
          <p className="mt-2 text-gray-300">
            Track the status of your job applications
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-red-500 text-white p-4 rounded-md">
            {error}
          </div>
        )}

        {/* {applications.length === 0 ? (
          <div className="bg-white rounded-lg shadow-card p-6 text-center">
            <p className="text-gray-600 mb-4">
              You havent applied to any jobs yet.
            </p>
            <Link
              to="/jobs"
              className="text-accent-600 hover:text-accent-800"
            >
              Browse open positions →
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {applications.map((application) => (
              <div
                key={application._id}
                className="bg-white rounded-lg shadow-card overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img
                        src={getCompanyLogoUrl(application.company.logo)}
                        alt={application.company.name}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold text-primary-950">
                          {application.job.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {application.company.name}
                        </p>
                      </div>
                    </div>
                    <div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          application.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : application.status === 'Reviewed'
                            ? 'bg-blue-100 text-blue-800'
                            : application.status === 'Shortlisted'
                            ? 'bg-purple-100 text-purple-800'
                            : application.status === 'Interview'
                            ? 'bg-indigo-100 text-indigo-800'
                            : application.status === 'Offer'
                            ? 'bg-green-100 text-green-800'
                            : application.status === 'Rejected'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {application.status}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Applied on</p>
                      <p className="font-medium">
                        {new Date(application.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Resume</p>
                      <a
                        href={application.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent-600 hover:text-accent-800"
                      >
                        View Resume
                      </a>
                    </div>
                  </div>

                  {application.coverLetter && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-500">Cover Letter</p>
                      <p className="mt-1 text-sm text-gray-600">
                        {application.coverLetter}
                      </p>
                    </div>
                  )}

                  <div className="mt-6">
                    <Link
                      to={`/jobs/${application.job._id}`}
                      className="text-accent-600 hover:text-accent-800"
                    >
                      View Job Details →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )} */}
        {applications.length === 0 ? (
          <div className="bg-[#1E1E1E] rounded-lg shadow-card p-6 text-center">
            <p className="text-[#A0A0A0] mb-4">
              You haven't applied to any jobs yet.
            </p>
            <Link
              to="/jobs"
              className="text-[#00FF9C] hover:text-[#00CC88] transition-colors"
            >
              Browse open positions →
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {applications.map((application) => (
              <div
                key={application._id}
                className="bg-[#1E1E1E] rounded-lg shadow-card overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img
                        src={getCompanyLogoUrl(application.company.logo)}
                        alt={application.company.name}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold text-[#E0E0E0]">
                          {application.job.title}
                        </h3>
                        <p className="text-sm text-[#A0A0A0]">
                          {application.company.name}
                        </p>
                      </div>
                    </div>
                    <div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          application.status === "Pending"
                            ? "bg-yellow-500/10 text-yellow-400"
                            : application.status === "Reviewed"
                            ? "bg-blue-500/10 text-blue-400"
                            : application.status === "Shortlisted"
                            ? "bg-purple-500/10 text-purple-400"
                            : application.status === "Interview"
                            ? "bg-indigo-500/10 text-indigo-400"
                            : application.status === "Offer"
                            ? "bg-[#267d27]/20 text-[#2b962c]"
                            : application.status === "Rejected"
                            ? "bg-red-500/10 text-red-400"
                            : "bg-[#181818] text-[#A0A0A0]"
                        }`}
                      >
                        {application.status}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-[#A0A0A0]">Applied on</p>
                      <p className="font-medium text-[#E0E0E0]">
                        {new Date(application.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-[#A0A0A0]">Resume</p>
                      <a
                        href={application.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#00FF9C] hover:text-[#00CC88] transition-colors"
                      >
                        View Resume
                      </a>
                    </div>
                  </div>

                  {application.coverLetter && (
                    <div className="mt-4">
                      <p className="text-sm text-[#A0A0A0]">Cover Letter</p>
                      <p className="mt-1 text-sm text-[#E0E0E0]">
                        {application.coverLetter}
                      </p>
                    </div>
                  )}

                  <div className="mt-6">
                    <Link
                      to={`/jobs/${application.job._id}`}
                      className="text-[#00FF9C] hover:text-[#00CC88] transition-colors"
                    >
                      View Job Details →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyApplications;
