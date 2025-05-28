import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { getCompanyLogoUrl } from "../../utils/imageUtils";

const CompanyDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [company, setCompany] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [companyRes, jobsRes] = await Promise.all([
          axios.get(`/companies/${id}`),
          axios.get(`/jobs?company=${id}`),
        ]);

        setCompany(companyRes.data);
        setJobs(jobsRes.data);
      } catch (err) {
        setError("Failed to fetch company details");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

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

  if (error || !company) {
    return (
      <div className="min-h-screen bg-[#121212] pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-500 text-white p-4 rounded-md">
            {error || "Company not found"}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Company Header */}
        {/* <div className="bg-[#1e1e1e] rounded-lg shadow-card p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                src={getCompanyLogoUrl(company.logo)}
                alt={company.name}
                className="h-16 w-16 rounded-full object-cover"
              />
              <div className="ml-4">
                <h1 className="text-3xl font-bold text-primary-950">
                  {company.name}
                </h1>
                <p className="text-gray-600">{company.location}</p>
              </div>
            </div>
            {company.website && (
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Visit Website
              </a>
            )}
          </div>
        </div> */}
        <div className="bg-[#1E1E1E] rounded-lg shadow-card p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {/* <img
                src={getCompanyLogoUrl(company.logo)}
                alt={company.name}
                className="h-16 w-16 rounded-full object-cover"
              /> */}
              <div className="h-10 w-10 rounded-full bg-green-800 flex items-center justify-center">
                          <span className="text-green-200 font-medium">
                            {company.name[0]}
                          </span>
                        </div>
              <div className="ml-4">
                <h1 className="text-3xl font-bold text-[#E0E0E0]">
                  {company.name}
                </h1>
                <p className="text-[#A0A0A0]">{company.location}</p>
              </div>
            </div>
            {company.website && (
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-[#00CC88] rounded-md text-sm font-medium text-[#00FF9C] bg-[#121212] hover:bg-[#181818] transition-colors"
              >
                Visit Website
              </a>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
  {/* Main Content */}
  <div className="lg:col-span-2 space-y-8">
    {/* About */}
    <div className="bg-[#1E1E1E] rounded-lg shadow-card p-6">
      <h2 className="text-xl font-semibold text-[#E0E0E0] mb-4">About</h2>
      <p className="text-[#A0A0A0] whitespace-pre-line">{company.description}</p>
    </div>

    {/* Team */}
    {company.team && company.team.length > 0 && (
      <div className="bg-[#1E1E1E] rounded-lg shadow-card p-6">
        <h2 className="text-xl font-semibold text-[#E0E0E0] mb-4">Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {company.team.map((member, index) => (
            <div key={index} className="flex items-start">
              <div className="flex-1">
                <h3 className="font-medium text-[#E0E0E0]">{member.name}</h3>
                <p className="text-sm text-[#A0A0A0]">{member.role}</p>
                {member.linkedIn && (
                  <a
                    href={member.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#00FF9C] hover:text-[#00CC88]"
                  >
                    LinkedIn Profile
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Open Positions */}
    {jobs.length > 0 && (
      <div className="bg-[#1E1E1E] rounded-lg shadow-card p-6">
        <h2 className="text-xl font-semibold text-[#E0E0E0] mb-4">Open Positions</h2>
        <div className="space-y-4">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="border border-[#333] rounded-md p-4 bg-[#121212]"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-[#E0E0E0]">{job.title}</h3>
                  <p className="text-sm text-[#A0A0A0]">
                    {job.type} • {job.location}
                    {job.remote && " (Remote)"}
                  </p>
                </div>
                <Link
                  to={`/jobs/${job._id}`}
                  className="text-sm text-[#00FF9C] hover:text-[#00CC88]"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>

  {/* Sidebar */}
  <div className="space-y-8">
    {/* Company Info */}
    <div className="bg-[#1E1E1E] rounded-lg shadow-card p-6">
      <h2 className="text-xl font-semibold text-[#E0E0E0] mb-4">Company Info</h2>
      <div className="space-y-4">
        <div>
          <p className="text-sm text-[#888]">Industry</p>
          <p className="font-medium text-[#E0E0E0]">{company.industry}</p>
        </div>
        <div>
          <p className="text-sm text-[#888]">Stage</p>
          <p className="font-medium text-[#E0E0E0]">{company.stage}</p>
        </div>
        <div>
          <p className="text-sm text-[#888]">Company Size</p>
          <p className="font-medium text-[#E0E0E0]">{company.companySize}</p>
        </div>
        <div>
          <p className="text-sm text-[#888]">Founded</p>
          <p className="font-medium text-[#E0E0E0]">
            {company.founded ? new Date(company.founded).getFullYear() : "N/A"}
          </p>
        </div>
      </div>
    </div>

    {/* Funding Info */}
    {company.funding && (
      <div className="bg-[#1E1E1E] rounded-lg shadow-card p-6">
        <h2 className="text-xl font-semibold text-[#E0E0E0] mb-4">Funding</h2>
        <div className="space-y-4">
          {company.funding.hasFunding && (
            <>
              <div>
                <p className="text-sm text-[#888]">Total Raised</p>
                <p className="font-medium text-[#E0E0E0]">
                  {company.funding.currency}{" "}
                  {company.funding.totalRaised.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-[#888]">Last Round</p>
                <p className="font-medium text-[#E0E0E0]">
                  {company.funding.lastRound}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    )}

    {/* Contact */}
    {user?.role === "investor" && (
      <div className="bg-[#1E1E1E] rounded-lg shadow-card p-6">
        <h2 className="text-xl font-semibold text-[#E0E0E0] mb-4">Contact</h2>
        <button className="w-full bg-[#267d27] hover:bg-[#2b962c] text-white py-2 px-4 rounded-md transition-colors">
          Connect with Founder
        </button>
      </div>
    )}
  </div>
</div>

      </div>
    </div>
  );
};

export default CompanyDetail;
