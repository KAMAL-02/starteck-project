import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { getCompanyLogoUrl } from '../../utils/imageUtils';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    location: '',
    remote: false,
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('/jobs', { params: filters });
        setJobs(response.data);
      } catch (err) {
        setError('Failed to fetch jobs');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
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

  return (
    <div className="min-h-screen bg-[#121212] pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">
            Find Your Next Opportunity
          </h1>
          <p className="mt-2 text-gray-400">
            Discover jobs at innovative startups
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-red-500 text-white p-4 rounded-md">
            {error}
          </div>
        )}

        {/* <div className="bg-white rounded-lg shadow-card p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label
                htmlFor="search"
                className="block text-sm font-medium text-gray-700"
              >
                Search
              </label>
              <input
                type="text"
                id="search"
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                placeholder="Search jobs..."
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-accent-500 focus:border-accent-500"
              />
            </div>

            <div>
              <label
                htmlFor="type"
                className="block text-sm font-medium text-gray-700"
              >
                Job Type
              </label>
              <select
                id="type"
                name="type"
                value={filters.type}
                onChange={handleFilterChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-accent-500 focus:border-accent-500"
              >
                <option value="">All Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
                <option value="Remote">Remote</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700"
              >
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
                placeholder="Enter location"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-accent-500 focus:border-accent-500"
              />
            </div>

            <div className="flex items-center mt-8">
              <input
                type="checkbox"
                id="remote"
                name="remote"
                checked={filters.remote}
                onChange={handleFilterChange}
                className="h-4 w-4 text-accent-600 focus:ring-accent-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remote"
                className="ml-2 block text-sm text-gray-700"
              >
                Remote only
              </label>
            </div>
          </div>
        </div> */}
        <div className="bg-[#1a1a1a] rounded-lg shadow-md p-6 mb-8 border border-[#2a2a2a]">
  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
    <div>
      <label htmlFor="search" className="block text-sm font-medium text-gray-300">
        Search
      </label>
      <input
        type="text"
        id="search"
        name="search"
        value={filters.search}
        onChange={handleFilterChange}
        placeholder="Search jobs..."
        className="mt-1 block w-full rounded-md px-3 py-2 shadow-sm
          bg-[#121212] border border-gray-400 text-gray-100 placeholder-gray-500
          focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-[#267d27] transition-colors"
      />
    </div>

    <div>
      <label htmlFor="type" className="block text-sm font-medium text-gray-300">
        Job Type
      </label>
      <select
        id="type"
        name="type"
        value={filters.type}
        onChange={handleFilterChange}
        className="mt-1 block w-full rounded-md px-3 py-2 shadow-sm
          bg-[#121212] border border-gray-400 text-gray-100
          focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-[#267d27] transition-colors"
      >
        <option value="">All Types</option>
        <option value="Full-time">Full-time</option>
        <option value="Part-time">Part-time</option>
        <option value="Contract">Contract</option>
        <option value="Internship">Internship</option>
        <option value="Remote">Remote</option>
      </select>
    </div>

    <div>
      <label htmlFor="location" className="block text-sm font-medium text-gray-300">
        Location
      </label>
      <input
        type="text"
        id="location"
        name="location"
        value={filters.location}
        onChange={handleFilterChange}
        placeholder="Enter location"
        className="mt-1 block w-full rounded-md px-3 py-2 shadow-sm
          bg-[#121212] border border-gray-400 text-gray-100 placeholder-gray-500
          focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-[#267d27] transition-colors"
      />
    </div>

    <div className="flex items-center mt-8">
      <input
        type="checkbox"
        id="remote"
        name="remote"
        checked={filters.remote}
        onChange={handleFilterChange}
        className="h-4 w-4 text-[#267d27] bg-[#121212] border-gray-600 rounded focus:ring-[#267d27]"
      />
      <label htmlFor="remote" className="ml-2 block text-sm text-gray-300">
        Remote only
      </label>
    </div>
  </div>
</div>


        {/* <div className="space-y-6">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white rounded-lg shadow-card overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      src={getCompanyLogoUrl(job.company.logo)}
                      alt={job.company.name}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-primary-950">
                        {job.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {job.company.name} • {job.location}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {job.type}
                    </span>
                    {job.remote && (
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Remote
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {job.description}
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {job.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>{job.experience}</span>
                    <span>•</span>
                    <span>
                      Posted{' '}
                      {new Date(job.createdAt).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  <Link
                    to={`/jobs/${job._id}`}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-accent-600 hover:bg-accent-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {jobs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No jobs match your criteria.</p>
            </div>
          )}
        </div> */}
        <div className="space-y-6">
  {jobs.map((job) => (
    <div
      key={job._id}
      className="bg-[#1a1a1a] rounded-xl shadow-md border border-[#2a2a2a] transition hover:border-[#267d27]"
    >
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {/* <img
              src={getCompanyLogoUrl(job.company.logo)}
              alt={job.company.name}
              className="h-12 w-12 rounded-full object-cover border border-gray-700"
            /> */}
            <div className="h-10 w-10 rounded-full bg-green-800 flex items-center justify-center">
                          <span className="text-green-200 font-medium">
                            {job.company.name[0]}
                          </span>
                        </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-white">{job.title}</h3>
              <p className="text-sm text-gray-400">
                {job.company.name} • {job.location}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#2c2c2c] text-green-400 border border-green-800">
              {job.type}
            </span>
            {job.remote && (
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#223322] text-green-300 border border-green-700">
                Remote
              </span>
            )}
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm text-gray-300 line-clamp-2">
            {job.description}
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {job.skills.map((skill) => (
            <span
              key={skill}
              className="px-2 py-1 rounded-md text-xs font-medium text-green-300 bg-[#1f1f1f] border border-green-700"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <span>{job.experience}</span>
            <span>•</span>
            <span>
              Posted{' '}
              {new Date(job.createdAt).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </div>
          <Link
            to={`/jobs/${job._id}`}
            className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-[#267d27] hover:bg-[#2b962c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#267d27]"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  ))}
</div>

      </div>
    </div>
  );
};

export default JobList;