import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';
import FounderDashboardNav from '../../../components/layout/FounderDashboardNav';

const ManageJobs = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('/jobs');
        const userJobs = response.data.filter(
          (job) => job.postedBy === user._id
        );
        setJobs(userJobs);
      } catch (err) {
        setError('Failed to fetch jobs');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [user._id]);

  const handleStatusChange = async (jobId, newStatus) => {
    try {
      await axios.put(`/jobs/${jobId}`, { status: newStatus });
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job._id === jobId ? { ...job, status: newStatus } : job
        )
      );
    } catch (err) {
      console.error('Error updating job status:', err);
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (!window.confirm('Are you sure you want to delete this job?')) {
      return;
    }

    try {
      await axios.delete(`/jobs/${jobId}`);
      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
    } catch (err) {
      console.error('Error deleting job:', err);
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

  return (
    // <div className="min-h-screen bg-gray-50 pt-24">
    //   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    //     <FounderDashboardNav />
    //     <div className="flex justify-between items-center mb-8">
    //       <h1 className="text-3xl font-bold text-primary-950">Manage Jobs</h1>
    //       <Link
    //         to="/dashboard/jobs/create"
    //         className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-accent-600 hover:bg-accent-700"
    //       >
    //         Post New Job
    //       </Link>
    //     </div>

    //     {error && (
    //       <div className="mb-6 bg-red-50 text-red-800 p-4 rounded-md">
    //         {error}
    //       </div>
    //     )}

    //     {jobs.length === 0 ? (
    //       <div className="bg-white rounded-lg shadow-card p-6 text-center">
    //         <p className="text-gray-600 mb-4">
    //           You haven't posted any jobs yet.
    //         </p>
    //         <Link
    //           to="/dashboard/jobs/create"
    //           className="text-accent-600 hover:text-accent-800"
    //         >
    //           Post your first job →
    //         </Link>
    //       </div>
    //     ) : (
    //       <div className="bg-white rounded-lg shadow-card overflow-hidden">
    //         <div className="overflow-x-auto">
    //           <table className="min-w-full divide-y divide-gray-200">
    //             <thead className="bg-gray-50">
    //               <tr>
    //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //                   Job Title
    //                 </th>
    //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //                   Type
    //                 </th>
    //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //                   Applications
    //                 </th>
    //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //                   Status
    //                 </th>
    //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //                   Actions
    //                 </th>
    //               </tr>
    //             </thead>
    //             <tbody className="bg-white divide-y divide-gray-200">
    //               {jobs.map((job) => (
    //                 <tr key={job._id}>
    //                   <td className="px-6 py-4 whitespace-nowrap">
    //                     <div className="text-sm font-medium text-primary-950">
    //                       {job.title}
    //                     </div>
    //                     <div className="text-sm text-gray-500">
    //                       {job.location}
    //                     </div>
    //                   </td>
    //                   <td className="px-6 py-4 whitespace-nowrap">
    //                     <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
    //                       {job.type}
    //                     </span>
    //                   </td>
    //                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
    //                     <Link
    //                       to={`/dashboard/jobs/applications/${job._id}`}
    //                       className="text-accent-600 hover:text-accent-800"
    //                     >
    //                       {job.applicationCount} applications
    //                     </Link>
    //                   </td>
    //                   <td className="px-6 py-4 whitespace-nowrap">
    //                     <select
    //                       value={job.status}
    //                       onChange={(e) =>
    //                         handleStatusChange(job._id, e.target.value)
    //                       }
    //                       className="text-sm border-gray-300 rounded-md shadow-sm focus:ring-accent-500 focus:border-accent-500"
    //                     >
    //                       <option value="Open">Open</option>
    //                       <option value="Filled">Filled</option>
    //                       <option value="Closed">Closed</option>
    //                     </select>
    //                   </td>
    //                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
    //                     <div className="flex space-x-3">
    //                       <Link
    //                         to={`/dashboard/jobs/edit/${job._id}`}
    //                         className="text-accent-600 hover:text-accent-800"
    //                       >
    //                         Edit
    //                       </Link>
    //                       <button
    //                         onClick={() => handleDeleteJob(job._id)}
    //                         className="text-red-600 hover:text-red-800"
    //                       >
    //                         Delete
    //                       </button>
    //                     </div>
    //                   </td>
    //                 </tr>
    //               ))}
    //             </tbody>
    //           </table>
    //         </div>
    //       </div>
    //     )}
    //   </div>
    // </div>
    <div className="min-h-screen bg-zinc-900 pt-24">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <FounderDashboardNav />
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold text-green-400">Manage Jobs</h1>
      <Link
        to="/dashboard/jobs/create"
        className="inline-flex items-center px-4 py-2 rounded-md shadow-sm text-sm font-medium text-white bg-green-800 hover:bg-green-700"
      >
        Post New Job
      </Link>
    </div>

    {error && (
      <div className="mb-6 bg-red-900 text-red-200 p-4 rounded-md border border-red-700">
        {error}
      </div>
    )}

    {jobs.length === 0 ? (
      <div className="bg-zinc-800 rounded-lg shadow p-6 text-center">
        <p className="text-zinc-400 mb-4">
          You haven't posted any jobs yet.
        </p>
        <Link
          to="/dashboard/jobs/create"
          className="text-green-400 hover:text-green-300"
        >
          Post your first job →
        </Link>
      </div>
    ) : (
      <div className="bg-zinc-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-zinc-700">
            <thead className="bg-zinc-800">
              <tr>
                {["Job Title", "Type", "Applications", "Status", "Actions"].map((title) => (
                  <th
                    key={title}
                    className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider"
                  >
                    {title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-zinc-900 divide-y divide-zinc-800">
              {jobs.map((job) => (
                <tr key={job._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-zinc-100">{job.title}</div>
                    <div className="text-sm text-zinc-400">{job.location}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-900 text-green-300">
                      {job.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Link
                      to={`/dashboard/jobs/applications/${job._id}`}
                      className="text-green-400 hover:text-green-300"
                    >
                      {job.applicationCount} applications
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={job.status}
                      onChange={(e) =>
                        handleStatusChange(job._id, e.target.value)
                      }
                      className="bg-zinc-800 text-zinc-300 border border-zinc-700 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 text-sm"
                    >
                      <option value="Open">Open</option>
                      <option value="Filled">Filled</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-3">
                      <Link
                        to={`/dashboard/jobs/edit/${job._id}`}
                        className="text-green-400 hover:text-green-300"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteJob(job._id)}
                        className="text-red-500 hover:text-red-400"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )}
  </div>
</div>

  );
};

export default ManageJobs;