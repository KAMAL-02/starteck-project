import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';

const MyCompany = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await axios.get('/companies');
        const foundCompany = response.data.find(
          (c) => c.founder._id === user._id
        );
        
        setCompany(foundCompany);
        console.log('Company data:', foundCompany);
      } catch (err) {
        setError('Failed to fetch company data');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [user._id]);

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

  if (!company) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] pt-24">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center">
      <h2 className="text-3xl font-bold text-white mb-4">
        Welcome to Starteck!
      </h2>
      <p className="text-gray-400 mb-8">
        Get started by creating your company profile.
      </p>
      <Link
        to="/dashboard/company/create"
        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        Create Company Profile
      </Link>
    </div>
  </div>
</div>

    );
  }

  return (
    // <div className="min-h-screen bg-gray-50 pt-24">
    //   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    //     <div className="bg-white rounded-lg shadow-card p-6">
    //       <div className="flex justify-between items-start mb-6">
    //         <div>
    //           <h1 className="text-3xl font-bold text-primary-950">
    //             {company.name}
    //           </h1>
    //           <p className="text-gray-600 mt-2">{company.industry}</p>
    //         </div>
    //         <Link
    //           to={`/dashboard/company/edit/${company.id}`}
    //           className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
    //         >
    //           Edit Profile
    //         </Link>
    //       </div>

    //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    //         <div>
    //           <h3 className="text-lg font-semibold mb-2">Company Details</h3>
    //           <div className="space-y-4">
    //             <div>
    //               <label className="block text-sm font-medium text-gray-500">
    //                 Location
    //               </label>
    //               <p className="mt-1">{company.location}</p>
    //             </div>
    //             <div>
    //               <label className="block text-sm font-medium text-gray-500">
    //                 Stage
    //               </label>
    //               <p className="mt-1">{company.stage}</p>
    //             </div>
    //             <div>
    //               <label className="block text-sm font-medium text-gray-500">
    //                 Website
    //               </label>
    //               <p className="mt-1">
    //                 <a
    //                   href={company.website}
    //                   target="_blank"
    //                   rel="noopener noreferrer"
    //                   className="text-accent-600 hover:text-accent-800"
    //                 >
    //                   {company.website}
    //                 </a>
    //               </p>
    //             </div>
    //           </div>
    //         </div>

    //         <div>
    //           <h3 className="text-lg font-semibold mb-2">Metrics</h3>
    //           <div className="grid grid-cols-2 gap-4">
    //             <div className="bg-gray-50 p-4 rounded-lg">
    //               <p className="text-sm text-gray-500">Team Size</p>
    //               <p className="text-2xl font-semibold">
    //                 {company.metrics?.employees || 0}
    //               </p>
    //             </div>
    //             <div className="bg-gray-50 p-4 rounded-lg">
    //               <p className="text-sm text-gray-500">Open Positions</p>
    //               <p className="text-2xl font-semibold">
    //                 {company.jobCount || 0}
    //               </p>
    //             </div>
    //             <div className="bg-gray-50 p-4 rounded-lg">
    //               <p className="text-sm text-gray-500">Revenue Range</p>
    //               <p className="text-2xl font-semibold">
    //                 {company.metrics?.revenue || 'Pre-revenue'}
    //               </p>
    //             </div>
    //             <div className="bg-gray-50 p-4 rounded-lg">
    //               <p className="text-sm text-gray-500">Growth Rate</p>
    //               <p className="text-2xl font-semibold">
    //                 {company.metrics?.growthRate || 'N/A'}
    //               </p>
    //             </div>
    //           </div>
    //         </div>
    //       </div>

    //       <div className="mt-8">
    //         <h3 className="text-lg font-semibold mb-4">Description</h3>
    //         <p className="text-gray-600 whitespace-pre-line">
    //           {company.description}
    //         </p>
    //       </div>

    //       <div className="mt-8">
    //         <div className="flex justify-between items-center mb-4">
    //           <h3 className="text-lg font-semibold">Job Listings</h3>
    //           <Link
    //             to="/dashboard/jobs/create"
    //             className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-accent-600 hover:bg-accent-700"
    //           >
    //             Post New Job
    //           </Link>
    //         </div>
    //         <Link
    //           to="/dashboard/jobs"
    //           className="text-accent-600 hover:text-accent-800"
    //         >
    //           View All Jobs →
    //         </Link>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="min-h-screen bg-zinc-950 pt-24">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="bg-zinc-900 rounded-lg shadow-card p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">{company.name}</h1>
          <p className="text-zinc-400 mt-2">{company.industry}</p>
        </div>
        <Link
          to={`/dashboard/company/edit/${company._id}`}
          className="inline-flex items-center px-4 py-2 border border-zinc-600 rounded-md text-sm font-medium text-zinc-300 bg-zinc-800 hover:bg-zinc-700"
        >
          Edit Profile
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">
            Company Details
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-400">
                Location
              </label>
              <p className="mt-1 text-zinc-300">{company.location}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400">
                Stage
              </label>
              <p className="mt-1 text-zinc-300">{company.stage}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400">
                Website
              </label>
              <p className="mt-1">
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-500 hover:text-green-400"
                >
                  {company.website}
                </a>
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Metrics</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-zinc-800 p-4 rounded-lg">
              <p className="text-sm text-zinc-400">Team Size</p>
              <p className="text-2xl font-semibold text-white">
                {company.metrics?.employees || 0}
              </p>
            </div>
            <div className="bg-zinc-800 p-4 rounded-lg">
              <p className="text-sm text-zinc-400">Open Positions</p>
              <p className="text-2xl font-semibold text-white">
                {company.jobCount || 0}
              </p>
            </div>
            <div className="bg-zinc-800 p-4 rounded-lg">
              <p className="text-sm text-zinc-400">Revenue Range</p>
              <p className="text-2xl font-semibold text-white">
                {company.metrics?.revenue || 'Pre-revenue'}
              </p>
            </div>
            <div className="bg-zinc-800 p-4 rounded-lg">
              <p className="text-sm text-zinc-400">Growth Rate</p>
              <p className="text-2xl font-semibold text-white">
                {company.metrics?.growthRate || 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold text-white mb-4">Description</h3>
        <p className="text-zinc-300 whitespace-pre-line">
          {company.description}
        </p>
      </div>

      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-white">Job Listings</h3>
          <Link
            to="/dashboard/jobs/create"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
          >
            Post New Job
          </Link>
        </div>
        <Link
          to="/dashboard/jobs"
          className="text-green-500 hover:text-green-400"
        >
          View All Jobs →
        </Link>
      </div>
    </div>
  </div>
</div>

  );
};

export default MyCompany;