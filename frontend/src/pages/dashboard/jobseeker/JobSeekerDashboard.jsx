// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { useAuth } from '../../../context/AuthContext';
// import { getCompanyLogoUrl } from '../../../utils/imageUtils';

// const JobSeekerDashboard = () => {
//   const { user } = useAuth();
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [filters, setFilters] = useState({
//     search: '',
//     type: '',
//     location: '',
//     remote: false,
//   });

//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const response = await axios.get('/jobs', { params: filters });
//         setJobs(response.data);
//       } catch (err) {
//         setError('Failed to fetch jobs');
//         console.error('Error:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchJobs();
//   }, [filters]);

//   const handleFilterChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFilters((prev) => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 pt-24">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-center items-center h-64">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 pt-24">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="mb-10 flex justify-between items-center">
//           <div>
//             <h1 className="text-3xl font-bold text-white">
//               Welcome, <span className='text-green-400'>{user.name} </span>👋
//             </h1>
//             <p className="mt-2 text-gray-300">
//               Explore opportunities that match your skills and interests.
//             </p>
//           </div>

//           <Link
//             to="/dashboard/applications"
//             className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-[#1f1f1f] hover:bg-[#2a2a2a] border border-[#333333] hover:border-[#267d27] transition-colors focus:outline-none"
//           >
//             <span>My Applications</span>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-4 w-4 ml-2"
//               viewBox="0 0 20 20"
//               fill="currentColor"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
//                 clipRule="evenodd"
//               />
//             </svg>
//           </Link>
//         </div>

//         {/* Error Message */}
//         {error && (
//           <div className="mb-6 bg-red-100 border border-red-200 text-red-800 p-4 rounded-md">
//             {error}
//           </div>
//         )}

//         {/* Filters */}
//         <div className="bg-[#1a1a1a]rounded-xl shadow-md p-6 mb-10 border-[#2a2a2a]">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-300">
//                 Search
//               </label>
//               <input
//                 name="search"
//                 value={filters.search}
//                 onChange={handleFilterChange}
//                 placeholder="e.g. Frontend Developer"
//                 className="mt-1 block w-full rounded-md px-3 py-2 shadow-sm
//           bg-[#121212] border border-gray-400 text-gray-100 placeholder-gray-500
//           focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-[#267d27] transition-colors"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-300">
//                 Job Type
//               </label>
//               <select
//                 name="type"
//                 value={filters.type}
//                 onChange={handleFilterChange}
//                 className="mt-1 block w-full rounded-md px-3 py-2 shadow-sm
//           bg-[#121212] border border-gray-400 text-gray-100
//           focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-[#267d27] transition-colors"
//               >
//                 <option value="">All Types</option>
//                 <option value="Full-time">Full-time</option>
//                 <option value="Part-time">Part-time</option>
//                 <option value="Contract">Contract</option>
//                 <option value="Internship">Internship</option>
//                 <option value="Remote">Remote</option>
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-300">
//                 Location
//               </label>
//               <input
//                 name="location"
//                 value={filters.location}
//                 onChange={handleFilterChange}
//                 placeholder="e.g. Bangalore"
//                 className="mt-1 block w-full rounded-md px-3 py-2 shadow-sm
//           bg-[#121212] border border-gray-400 text-gray-100 placeholder-gray-300
//           focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-[#267d27] transition-colors"
//               />
//             </div>

//             <div className="flex items-center mt-8 md:mt-6">
//               <input
//                 type="checkbox"
//                 id="remote"
//                 name="remote"
//                 checked={filters.remote}
//                 onChange={handleFilterChange}
//                 className="h-4 w-4 text-[#267d27] bg-[#121212] border-gray-600 rounded focus:ring-[#267d27]"
//               />
//               <label htmlFor="remote" className="ml-2 text-sm text-gray-300">
//                 Remote Only
//               </label>
//             </div>
//           </div>
//         </div>

//         {/* Job Cards */}
//         <div className="space-y-6">
//           {jobs.map((job) => (
//             <div
//               key={job._id}
//               className="bg-[#1a1a1a] rounded-xl shadow-md border border-[#2a2a2a] transition hover:border-[#267d27]"
//             >
//               <div className="p-6">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center">
//                     <img
//                       src={getCompanyLogoUrl(job)}
//                       alt={job.company.name}
//                       className="h-12 w-12 rounded-full object-cover border border-gray-700"
//                     />
//                     <div className="ml-4">
//                       <h3 className="text-xl font-semibold text-white">
//                         {job.title}
//                       </h3>
//                       <p className="text-sm text-gray-400">
//                         {job.company.name} • {job.location}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#2c2c2c] text-green-400 border border-green-800">
//                       {job.type}
//                     </span>
//                     {job.remote && (
//                       <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#223322] text-green-300 border border-green-700">
//                         Remote
//                       </span>
//                     )}
//                   </div>
//                 </div>

//                 <p className="text-sm text-gray-300 line-clamp-2 mt-4">
//                   {job.description}
//                 </p>

//                 <div className="mt-4 flex flex-wrap gap-2">
//                   {job.skills.map((skill) => (
//                     <span
//                       key={skill}
//                       className="px-2 py-1 rounded-md text-xs font-medium text-green-300 bg-[#1f1f1f] border border-green-700"
//                     >
//                       {skill}
//                     </span>
//                   ))}
//                 </div>

//                 <div className="mt-6 flex justify-between items-center text-sm text-gray-400">
//                   <div className='flex justify-start items-center gap-2'>
//                   <span>{job.experience}</span>
//                   <span className="mx-2">•</span>
//                   <span>
//                     Posted on{' '}
//                     {new Date(job.createdAt).toLocaleDateString(undefined, {
//                       month: 'short',
//                       day: 'numeric',
//                     })}
//                   </span>
//                   </div>

//                   <Link
//                     to={`/jobs/${job._id}`}
//                     className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-[#267d27] hover:bg-[#2b962c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#267d27]"
//                   >
//                     View Details
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           ))}

//           {jobs.length === 0 && (
//             <div className="text-center py-16 text-gray-300">
//               No jobs match your criteria.
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default JobSeekerDashboard;

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';
import { getCompanyLogoUrl } from '../../../utils/imageUtils';

const JobSeekerDashboard = () => {
  const { user } = useAuth();
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
    <div className="min-h-screen bg-[#121212] pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Welcome, <span className='text-green-400'>{user.name} </span>👋
            </h1>
            <p className="mt-2 text-gray-300">
              Explore opportunities that match your skills and interests.
            </p>
          </div>

          <Link
            to="/dashboard/applications"
            className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-[#1f1f1f] hover:bg-[#2a2a2a] border border-[#333333] hover:border-[#267d27] transition-colors focus:outline-none"
          >
            <span>My Applications</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-100 border border-red-200 text-red-800 p-4 rounded-md">
            {error}
          </div>
        )}

        {/* Filters */}
        <div className="bg-[#1a1a1a]rounded-xl shadow-md p-6 mb-10 border-[#2a2a2a]">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Search
              </label>
              <input
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                placeholder="e.g. Frontend Developer"
                className="mt-1 block w-full rounded-md px-3 py-2 shadow-sm
          bg-[#121212] border border-gray-400 text-gray-100 placeholder-gray-500
          focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-[#267d27] transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">
                Job Type
              </label>
              <select
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
              <label className="block text-sm font-medium text-gray-300">
                Location
              </label>
              <input
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
                placeholder="e.g. Bangalore"
                className="mt-1 block w-full rounded-md px-3 py-2 shadow-sm
          bg-[#121212] border border-gray-400 text-gray-100 placeholder-gray-300
          focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-[#267d27] transition-colors"
              />
            </div>

            <div className="flex items-center mt-8 md:mt-6">
              <input
                type="checkbox"
                id="remote"
                name="remote"
                checked={filters.remote}
                onChange={handleFilterChange}
                className="h-4 w-4 text-[#267d27] bg-[#121212] border-gray-600 rounded focus:ring-[#267d27]"
              />
              <label htmlFor="remote" className="ml-2 text-sm text-gray-300">
                Remote Only
              </label>
            </div>
          </div>
        </div>

        {/* Job Cards */}
        <div className="space-y-6">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-[#1a1a1a] rounded-xl shadow-md border border-[#2a2a2a] transition hover:border-[#267d27]"
            >
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-green-800 flex items-center justify-center">
                          <span className="text-green-200 font-medium">
                            {job.company.name[0]}
                          </span>
                        </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold text-white">
                        {job.title}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {job.company.name} • {job.location}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
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

                <p className="text-sm text-gray-300 line-clamp-2 mt-4">
                  {job.description}
                </p>

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

                <div className="mt-6 flex justify-between items-center text-sm text-gray-400">
                  <div className='flex justify-start items-center gap-2'>
                  <span>{job.experience}</span>
                  <span className="mx-2">•</span>
                  <span>
                    Posted on{' '}
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

          {jobs.length === 0 && (
            <div className="text-center py-16 text-gray-300">
              No jobs match your criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobSeekerDashboard;
