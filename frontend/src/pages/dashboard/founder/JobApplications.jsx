import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import FounderDashboardNav from '../../../components/layout/FounderDashboardNav';

const JobApplications = () => {
  const { id } = useParams();
  const [applications, setApplications] = useState([]);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [jobRes, applicationsRes] = await Promise.all([
          axios.get(`/jobs/${id}`),
          axios.get(`/jobs/${id}/applications`),
        ]);
        
        setJob(jobRes.data);
        setApplications(applicationsRes.data);
      } catch (err) {
        setError('Failed to fetch applications');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleStatusChange = async (applicationId, newStatus) => {
    try {
      await axios.put(`/applications/${applicationId}`, { status: newStatus });
      setApplications((prevApplications) =>
        prevApplications.map((app) =>
          app._id === applicationId ? { ...app, status: newStatus } : app
        )
      );
    } catch (err) {
      console.error('Error updating application status:', err);
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

  if (error) {
    return (
      <div className="min-h-screen bg-[#121212] pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-500 text-white p-4 rounded-md">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    // <div className="min-h-screen bg-gray-50 pt-24">
    //   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    //     <FounderDashboardNav />
    //     <div className="bg-white rounded-lg shadow-card p-6">
    //       <div className="mb-8">
    //         <h1 className="text-3xl font-bold text-primary-950">
    //           Applications for {job.title}
    //         </h1>
    //         <p className="mt-2 text-gray-600">
    //           {applications.length} total applications
    //         </p>
    //       </div>

    //       {applications.length === 0 ? (
    //         <div className="text-center py-12">
    //           <p className="text-gray-500">No applications yet.</p>
    //         </div>
    //       ) : (
    //         <div className="overflow-x-auto">
    //           <table className="min-w-full divide-y divide-gray-200">
    //             <thead className="bg-gray-50">
    //               <tr>
    //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //                   Applicant
    //                 </th>
    //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //                   Applied On
    //                 </th>
    //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //                   Resume
    //                 </th>
    //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //                   Status
    //                 </th>
    //               </tr>
    //             </thead>
    //             <tbody className="bg-white divide-y divide-gray-200">
    //               {applications.map((application) => (
    //                 <tr key={application._id}>
    //                   <td className="px-6 py-4 whitespace-nowrap">
    //                     <div className="flex items-center">
    //                       <div className="flex-shrink-0 h-10 w-10">
    //                         <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
    //                           <span className="text-primary-600 font-medium">
    //                             {application.applicant.name[0]}
    //                           </span>
    //                         </div>
    //                       </div>
    //                       <div className="ml-4">
    //                         <div className="text-sm font-medium text-gray-900">
    //                           {application.applicant.name}
    //                         </div>
    //                         <div className="text-sm text-gray-500">
    //                           {application.applicant.email}
    //                         </div>
    //                       </div>
    //                     </div>
    //                   </td>
    //                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
    //                     {new Date(application.createdAt).toLocaleDateString()}
    //                   </td>
    //                   <td className="px-6 py-4 whitespace-nowrap text-sm">
    //                     <a
    //                       href={application.resumeUrl}
    //                       target="_blank"
    //                       rel="noopener noreferrer"
    //                       className="text-accent-600 hover:text-accent-800"
    //                     >
    //                       View Resume
    //                     </a>
    //                   </td>
    //                   <td className="px-6 py-4 whitespace-nowrap">
    //                     <select
    //                       value={application.status}
    //                       onChange={(e) =>
    //                         handleStatusChange(application._id, e.target.value)
    //                       }
    //                       className="text-sm border-gray-300 rounded-md shadow-sm focus:ring-accent-500 focus:border-accent-500"
    //                     >
    //                       <option value="Pending">Pending</option>
    //                       <option value="Reviewed">Reviewed</option>
    //                       <option value="Shortlisted">Shortlisted</option>
    //                       <option value="Interview">Interview</option>
    //                       <option value="Offer">Offer</option>
    //                       <option value="Rejected">Rejected</option>
    //                       <option value="Withdrawn">Withdrawn</option>
    //                     </select>
    //                   </td>
    //                 </tr>
    //               ))}
    //             </tbody>
    //           </table>
    //         </div>
    //       )}
    //     </div>
    //   </div>
    // </div>
    <div className="min-h-screen bg-zinc-900 pt-24">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <FounderDashboardNav />
    <div className="bg-zinc-800 rounded-lg shadow-md p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-green-400">
          Applications for {job.title}
        </h1>
        <p className="mt-2 text-zinc-400">
          {applications.length} total applications
        </p>
      </div>

      {applications.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-zinc-500">No applications yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-zinc-700">
            <thead className="bg-zinc-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                  Applicant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                  Applied On
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                  Resume
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-zinc-900 divide-y divide-zinc-700">
              {applications.map((application) => (
                <tr key={application._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-green-800 flex items-center justify-center">
                          <span className="text-green-200 font-medium">
                            {application.applicant.name[0]}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-zinc-200">
                          {application.applicant.name}
                        </div>
                        <div className="text-sm text-zinc-400">
                          {application.applicant.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-400">
                    {new Date(application.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <a
                      href={application.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-400 hover:text-green-300"
                    >
                      View Resume
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={application.status}
                      onChange={(e) =>
                        handleStatusChange(application._id, e.target.value)
                      }
                      className="text-sm text-zinc-100 bg-zinc-900 border border-zinc-700 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Reviewed">Reviewed</option>
                      <option value="Shortlisted">Shortlisted</option>
                      <option value="Interview">Interview</option>
                      <option value="Offer">Offer</option>
                      <option value="Rejected">Rejected</option>
                      <option value="Withdrawn">Withdrawn</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  </div>
</div>

  );
};

export default JobApplications;