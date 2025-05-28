import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { getCompanyLogoUrl } from "../../utils/imageUtils";

const JobDetail = () => {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [applying, setApplying] = useState(false);
  const [applicationData, setApplicationData] = useState({
    resumeUrl: "",
    coverLetter: "",
  });

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`/jobs/${id}`);
        setJob(response.data);
      } catch (err) {
        setError("Failed to fetch job details");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleApply = async (e) => {
    e.preventDefault();
    setApplying(true);

    try {
      await axios.post(`/jobs/${id}/apply`, applicationData);
      // Redirect to applications page
      window.location.href = "/dashboard/applications";
    } catch (err) {
      setError(
        err.response?.data?.msg ||
          "Failed to submit application. Please try again."
      );
    } finally {
      setApplying(false);
    }
  };

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

  if (error || !job) {
    return (
      <div className="min-h-screen bg-[#121212] pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-500 text-white p-4 rounded-md">
            {error || "Job not found"}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Job Header */}
            <div className="bg-[#1e1e1e] rounded-lg shadow-card p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {/* <img
                    src={getCompanyLogoUrl(job.company.logo)}
                    alt={job.company.name}
                    className="h-16 w-16 rounded-full object-cover"
                  /> */}
                  <div className="h-10 w-10 rounded-full bg-green-800 flex items-center justify-center">
                          <span className="text-green-200 font-medium">
                            {job.company.name[0]}
                          </span>
                        </div>
                  <div className="ml-4">
                    <h1 className="text-3xl font-bold text-white">
                      {job.title}
                    </h1>
                    <p className="text-sm text-gray-400">
                      {job.company.name} • {job.location}
                      {job.remote && " (Remote)"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-800/20 text-green-400">
                    {job.type}
                  </span>
                  {job.remote && (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-800/20 text-green-400">
                      Remote
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Job Description */}
            {/* <div className="bg-white rounded-lg shadow-card p-6">
              <h2 className="text-xl font-semibold text-primary-950 mb-4">
                Description
              </h2>
              <p className="text-gray-600 whitespace-pre-line mb-6">
                {job.description}
              </p>

              <h3 className="text-lg font-semibold text-primary-950 mb-2">
                Requirements
              </h3>
              <ul className="list-disc list-inside text-gray-600 mb-6">
                {job.requirements.map((req, index) => (
                  <li key={index} className="mb-2">
                    {req}
                  </li>
                ))}
              </ul>

              <h3 className="text-lg font-semibold text-primary-950 mb-2">
                Responsibilities
              </h3>
              <ul className="list-disc list-inside text-gray-600">
                {job.responsibilities.map((resp, index) => (
                  <li key={index} className="mb-2">
                    {resp}
                  </li>
                ))}
              </ul>
            </div> */}
            <div className="bg-[#1e1e1e] rounded-lg shadow-card p-6">
              <h2 className="text-xl font-semibold text-white mb-4">
                Description
              </h2>
              <p className="text-gray-400 whitespace-pre-line mb-6">
                {job.description}
              </p>

              <h3 className="text-lg font-semibold text-white mb-2">
                Requirements
              </h3>
              <ul className="list-disc list-inside text-gray-400 mb-6">
                {job.requirements.map((req, index) => (
                  <li key={index} className="mb-2">
                    {req}
                  </li>
                ))}
              </ul>

              <h3 className="text-lg font-semibold text-white mb-2">
                Responsibilities
              </h3>
              <ul className="list-disc list-inside text-gray-400">
                {job.responsibilities.map((resp, index) => (
                  <li key={index} className="mb-2">
                    {resp}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Apply Button */}
            {/* <div className="bg-white rounded-lg shadow-card p-6">
              {!isAuthenticated ? (
                <div className="text-center">
                  <p className="text-gray-600 mb-4">
                    Sign in to apply for this position
                  </p>
                  <Link
                    to="/login"
                    className="block w-full bg-accent-600 text-white py-2 px-4 rounded-md hover:bg-accent-700 transition-colors"
                  >
                    Sign In
                  </Link>
                </div>
              ) : user?.role === "jobseeker" ? (
                <form onSubmit={handleApply}>
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="resumeUrl"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Resume URL *
                      </label>
                      <input
                        type="url"
                        id="resumeUrl"
                        name="resumeUrl"
                        required
                        value={applicationData.resumeUrl}
                        onChange={(e) =>
                          setApplicationData((prev) => ({
                            ...prev,
                            resumeUrl: e.target.value,
                          }))
                        }
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-accent-500 focus:border-accent-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="coverLetter"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Cover Letter
                      </label>
                      <textarea
                        id="coverLetter"
                        name="coverLetter"
                        rows={4}
                        value={applicationData.coverLetter}
                        onChange={(e) =>
                          setApplicationData((prev) => ({
                            ...prev,
                            coverLetter: e.target.value,
                          }))
                        }
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-accent-500 focus:border-accent-500"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={applying}
                      className={`w-full bg-accent-600 text-white py-2 px-4 rounded-md hover:bg-accent-700 transition-colors ${
                        applying ? "opacity-75 cursor-not-allowed" : ""
                      }`}
                    >
                      {applying ? "Applying..." : "Apply Now"}
                    </button>
                  </div>
                </form>
              ) : (
                <p className="text-center text-gray-600">
                  Only job seekers can apply for positions
                </p>
              )}
            </div> */}
            <div className="bg-[#1E1E1E] rounded-lg shadow-card p-6">
  {!isAuthenticated ? (
    <div className="text-center">
      <p className="text-[#A0A0A0] mb-4">
        Sign in to apply for this position
      </p>
      <Link
        to="/login"
        className="block w-full bg-[#00FF9C] text-black py-2 px-4 rounded-md hover:bg-[#00CC88] transition-colors"
      >
        Sign In
      </Link>
    </div>
  ) : user?.role === "jobseeker" ? (
    <form onSubmit={handleApply}>
      <div className="space-y-4">
        <div>
          <label
            htmlFor="resumeUrl"
            className="block text-sm font-medium text-[#E0E0E0]"
          >
            Resume URL *
          </label>
          <input
            type="url"
            id="resumeUrl"
            name="resumeUrl"
            required
            value={applicationData.resumeUrl}
            onChange={(e) =>
              setApplicationData((prev) => ({
                ...prev,
                resumeUrl: e.target.value,
              }))
            }
            className="mt-1 block w-full bg-[#121212] border border-[#267d27] rounded-md shadow-sm py-2 px-3 text-[#E0E0E0] placeholder-[#A0A0A0] focus:outline-none focus:ring-[#00FF9C] focus:border-[#00FF9C]"
          />
        </div>
        <div>
          <label
            htmlFor="coverLetter"
            className="block text-sm font-medium text-[#E0E0E0]"
          >
            Cover Letter
          </label>
          <textarea
            id="coverLetter"
            name="coverLetter"
            rows={4}
            value={applicationData.coverLetter}
            onChange={(e) =>
              setApplicationData((prev) => ({
                ...prev,
                coverLetter: e.target.value,
              }))
            }
            className="mt-1 block w-full bg-[#121212] border border-[#267d27] rounded-md shadow-sm py-2 px-3 text-[#E0E0E0] placeholder-[#A0A0A0] focus:outline-none focus:ring-[#00FF9C] focus:border-[#00FF9C]"
          />
        </div>
        <button
          type="submit"
          disabled={applying}
          className={`w-full text-black font-bold py-2 px-4 rounded-md bg-green-600 hover:bg-[#2b962c] transition-colors ${
            applying ? "opacity-75 cursor-not-allowed" : ""
          }`}
        >
          {applying ? "Applying..." : "Apply Now"}
        </button>
      </div>
    </form>
  ) : (
    <p className="text-center text-[#A0A0A0]">
      Only job seekers can apply for positions
    </p>
  )}
</div>

            

            {/* Job Details */}
            {/* <div className="bg-white rounded-lg shadow-card p-6">
              <h2 className="text-xl font-semibold text-primary-950 mb-4">
                Job Details
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Experience Level</p>
                  <p className="font-medium">{job.experience}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Education</p>
                  <p className="font-medium">{job.education}</p>
                </div>
                {job.salary.isVisible && (
                  <div>
                    <p className="text-sm text-gray-500">Salary Range</p>
                    <p className="font-medium">
                      {job.salary.currency} {job.salary.min.toLocaleString()} -{" "}
                      {job.salary.max.toLocaleString()}
                    </p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-500">Required Skills</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {job.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div> */}
            <div className="bg-[#1E1E1E] rounded-lg shadow-card p-6">
  <h2 className="text-xl font-semibold text-[#E0E0E0] mb-4">
    Job Details
  </h2>
  <div className="space-y-4">
    <div>
      <p className="text-sm text-[#A0A0A0]">Experience Level</p>
      <p className="font-medium text-[#E0E0E0]">{job.experience}</p>
    </div>
    <div>
      <p className="text-sm text-[#A0A0A0]">Education</p>
      <p className="font-medium text-[#E0E0E0]">{job.education}</p>
    </div>
    {job.salary.isVisible && (
      <div>
        <p className="text-sm text-[#A0A0A0]">Salary Range</p>
        <p className="font-medium text-[#E0E0E0]">
          {job.salary.currency} {job.salary.min.toLocaleString()} -{" "}
          {job.salary.max.toLocaleString()}
        </p>
      </div>
    )}
    <div>
      <p className="text-sm text-[#A0A0A0]">Required Skills</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {job.skills.map((skill) => (
          <span
            key={skill}
            className="px-2 py-1 rounded-md text-xs font-medium bg-[#267d27] text-black hover:bg-[#2b962c] transition-colors"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  </div>
</div>


            {/* Company Info */}
            {/* <div className="bg-white rounded-lg shadow-card p-6">
              <h2 className="text-xl font-semibold text-primary-950 mb-4">
                About {job.company.name}
              </h2>
              <div className="space-y-4">
                <p className="text-gray-600">{job.company.description}</p>
                <div>
                  <p className="text-sm text-gray-500">Industry</p>
                  <p className="font-medium">{job.company.industry}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Company Size</p>
                  <p className="font-medium">{job.company.companySize}</p>
                </div>
                <Link
                  to={`/companies/${job.company._id}`}
                  className="text-accent-600 hover:text-accent-800"
                >
                  Learn more about {job.company.name} →
                </Link>
              </div>
            </div> */}
            <div className="bg-[#1E1E1E] rounded-lg shadow-card p-6">
  <h2 className="text-xl font-semibold text-[#E0E0E0] mb-4">
    About {job.company.name}
  </h2>
  <div className="space-y-4">
    <p className="text-[#A0A0A0]">{job.company.description}</p>
    <div>
      <p className="text-sm text-[#A0A0A0]">Industry</p>
      <p className="font-medium text-[#E0E0E0]">{job.company.industry}</p>
    </div>
    <div>
      <p className="text-sm text-[#A0A0A0]">Company Size</p>
      <p className="font-medium text-[#E0E0E0]">{job.company.companySize}</p>
    </div>
    <Link
      to={`/companies/${job.company._id}`}
      className="text-[#00FF9C] hover:text-[#00CC88] transition-colors"
    >
      Learn more about {job.company.name} →
    </Link>
  </div>
</div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
