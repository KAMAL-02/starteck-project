import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { getCompanyLogoUrl } from '../../../utils/imageUtils';

const InvestorDashboard = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    industry: '',
    stage: '',
    location: '',
  });

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get('/companies');
        setCompanies(response.data);
      } catch (err) {
        setError('Failed to fetch companies');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const filteredCompanies = companies.filter((company) => {
    return (
      (!filters.industry || company.industry.includes(filters.industry)) &&
      (!filters.stage || company.stage === filters.stage) &&
      (!filters.location || company.location.includes(filters.location))
    );
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">
            Investment Opportunities
          </h1>
          <p className="mt-2 text-gray-300">
            Discover and connect with promising startups
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 text-red-800 p-4 rounded-md">
            {error}
          </div>
        )}

        <div className="bg-[#1e1e1e] rounded-lg shadow-card p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="industry"
                className="block text-sm font-medium text-gray-300"
              >
                Industry
              </label>
              <input
                type="text"
                id="industry"
                name="industry"
                value={filters.industry}
                onChange={handleFilterChange}
                placeholder="Search by industry"
                className="mt-1 block w-full rounded-md px-3 py-2 shadow-sm
          bg-[#121212] border border-gray-400 text-gray-100 placeholder-gray-500
          focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-[#267d27] transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="stage"
                className="block text-sm font-medium text-gray-300"
              >
                Stage
              </label>
              <select
                id="stage"
                name="stage"
                value={filters.stage}
                onChange={handleFilterChange}
                className="mt-1 block w-full rounded-md px-3 py-2 shadow-sm
          bg-[#121212] border border-gray-400 text-gray-100 placeholder-gray-500
          focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-[#267d27] transition-colors"
              >
                <option value="">All Stages</option>
                <option value="Idea">Idea</option>
                <option value="Pre-seed">Pre-seed</option>
                <option value="Seed">Seed</option>
                <option value="Series A">Series A</option>
                <option value="Series B">Series B</option>
                <option value="Series C">Series C</option>
                <option value="Series D+">Series D+</option>
                <option value="Profitable">Profitable</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-300"
              >
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
                placeholder="Search by location"
                className="mt-1 block w-full rounded-md px-3 py-2 shadow-sm
          bg-[#121212] border border-gray-400 text-gray-100 placeholder-gray-500
          focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-[#267d27] transition-colors"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.map((company) => (
            <div
              key={company._id}
              className="bg-[#1a1a1a] rounded-lg shadow-md border border-[#2a2a2a] transition hover:border-[#267d27]"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={getCompanyLogoUrl(company.logo)}
                    alt={company.name}
                    className="h-12 w-12 rounded-full object-cover border border-gray-700"
                  />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-white">
                      {company.name}
                    </h3>
                    <p className="text-sm text-gray-400">{company.location}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-300 line-clamp-3">
                    {company.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-400">Industry</p>
                    <p className="font-medium text-gray-300">{company.industry}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Stage</p>
                    <p className="font-medium text-gray-300">{company.stage}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Team Size</p>
                    <p className="font-medium text-gray-300">{company.companySize}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Revenue</p>
                    <p className="font-medium text-gray-300">
                      {company.metrics?.revenue || 'Pre-revenue'}
                    </p>
                  </div>
                </div>

                <Link
                  to={`/companies/${company._id}`}
                  className="block w-full text-center py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-[#267d27] hover:bg-[#2b962c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#267d27]"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredCompanies.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No companies match your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvestorDashboard;