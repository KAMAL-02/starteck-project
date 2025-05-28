import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';

const CreateCompany = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    industry: '',
    description: '',
    website: '',
    location: '',
    stage: 'Idea',
    companySize: '1-10',
    metrics: {
      employees: 1,
      revenue: 'Pre-revenue',
    },
  });

  const stageOptions = [
    'Idea',
    'Pre-seed',
    'Seed',
    'Series A',
    'Series B',
    'Series C',
    'Series D+',
    'Profitable',
  ];

  const companySizeOptions = [
    '1-10',
    '11-50',
    '51-200',
    '201-500',
    '501-1000',
    '1001+',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await axios.post('/companies', formData);
      navigate('/dashboard/company');
    } catch (err) {
      setError(
        err.response?.data?.msg || 'Failed to create company. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    // <div className="min-h-screen bg-gray-50 pt-24">
    //   <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
    //     <div className="bg-white rounded-lg shadow-card p-6">
    //       <h1 className="text-3xl font-bold text-primary-950 mb-8">
    //         Create Your Company Profile
    //       </h1>

    //       {error && (
    //         <div className="mb-6 bg-red-50 text-red-800 p-4 rounded-md">
    //           {error}
    //         </div>
    //       )}

    //       <form onSubmit={handleSubmit} className="space-y-6">
    //         <div>
    //           <label
    //             htmlFor="name"
    //             className="block text-sm font-medium text-gray-700"
    //           >
    //             Company Name *
    //           </label>
    //           <input
    //             type="text"
    //             id="name"
    //             name="name"
    //             required
    //             value={formData.name}
    //             onChange={handleChange}
    //             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-accent-500 focus:border-accent-500"
    //           />
    //         </div>

    //         <div>
    //           <label
    //             htmlFor="industry"
    //             className="block text-sm font-medium text-gray-700"
    //           >
    //             Industry *
    //           </label>
    //           <input
    //             type="text"
    //             id="industry"
    //             name="industry"
    //             required
    //             value={formData.industry}
    //             onChange={handleChange}
    //             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-accent-500 focus:border-accent-500"
    //           />
    //         </div>

    //         <div>
    //           <label
    //             htmlFor="description"
    //             className="block text-sm font-medium text-gray-700"
    //           >
    //             Description *
    //           </label>
    //           <textarea
    //             id="description"
    //             name="description"
    //             required
    //             rows={4}
    //             value={formData.description}
    //             onChange={handleChange}
    //             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-accent-500 focus:border-accent-500"
    //           />
    //         </div>

    //         <div>
    //           <label
    //             htmlFor="website"
    //             className="block text-sm font-medium text-gray-700"
    //           >
    //             Website
    //           </label>
    //           <input
    //             type="url"
    //             id="website"
    //             name="website"
    //             value={formData.website}
    //             onChange={handleChange}
    //             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-accent-500 focus:border-accent-500"
    //           />
    //         </div>

    //         <div>
    //           <label
    //             htmlFor="location"
    //             className="block text-sm font-medium text-gray-700"
    //           >
    //             Location *
    //           </label>
    //           <input
    //             type="text"
    //             id="location"
    //             name="location"
    //             required
    //             value={formData.location}
    //             onChange={handleChange}
    //             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-accent-500 focus:border-accent-500"
    //           />
    //         </div>

    //         <div>
    //           <label
    //             htmlFor="stage"
    //             className="block text-sm font-medium text-gray-700"
    //           >
    //             Stage *
    //           </label>
    //           <select
    //             id="stage"
    //             name="stage"
    //             required
    //             value={formData.stage}
    //             onChange={handleChange}
    //             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-accent-500 focus:border-accent-500"
    //           >
    //             {stageOptions.map((stage) => (
    //               <option key={stage} value={stage}>
    //                 {stage}
    //               </option>
    //             ))}
    //           </select>
    //         </div>

    //         <div>
    //           <label
    //             htmlFor="companySize"
    //             className="block text-sm font-medium text-gray-700"
    //           >
    //             Company Size *
    //           </label>
    //           <select
    //             id="companySize"
    //             name="companySize"
    //             required
    //             value={formData.companySize}
    //             onChange={handleChange}
    //             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-accent-500 focus:border-accent-500"
    //           >
    //             {companySizeOptions.map((size) => (
    //               <option key={size} value={size}>
    //                 {size} employees
    //               </option>
    //             ))}
    //           </select>
    //         </div>

    //         <div>
    //           <label
    //             htmlFor="metrics.revenue"
    //             className="block text-sm font-medium text-gray-700"
    //           >
    //             Revenue Range
    //           </label>
    //           <select
    //             id="metrics.revenue"
    //             name="metrics.revenue"
    //             value={formData.metrics.revenue}
    //             onChange={handleChange}
    //             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-accent-500 focus:border-accent-500"
    //           >
    //             <option value="Pre-revenue">Pre-revenue</option>
    //             <option value="$1-$10K">$1-$10K</option>
    //             <option value="$10K-$50K">$10K-$50K</option>
    //             <option value="$50K-$100K">$50K-$100K</option>
    //             <option value="$100K-$500K">$100K-$500K</option>
    //             <option value="$500K-$1M">$500K-$1M</option>
    //             <option value="$1M-$5M">$1M-$5M</option>
    //             <option value="$5M+">$5M+</option>
    //           </select>
    //         </div>

    //         <div className="pt-4">
    //           <button
    //             type="submit"
    //             disabled={loading}
    //             className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-accent-600 hover:bg-accent-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500 ${
    //               loading ? 'opacity-75 cursor-not-allowed' : ''
    //             }`}
    //           >
    //             {loading ? (
    //               <div className="flex items-center">
    //                 <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
    //                 Creating...
    //               </div>
    //             ) : (
    //               'Create Company'
    //             )}
    //           </button>
    //         </div>
    //       </form>
    //     </div>
    //   </div>
    // </div>
    <div className="min-h-screen bg-[#0f0f0f] pt-24 text-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
      
      {/* Left Side Heading */}
      <div className='flex flex-col justify-center mt-32'>
        <h1 className="text-4xl font-bold mb-6 text-green-400">
          Create Your Company Profile
        </h1>
        <p className="text-gray-400">
          Provide details about your startup to get started with Starteck. This info helps us tailor your dashboard and recommendations.
        </p>
      </div>

      {/* Right Side Form */}
      <div className="bg-[#1a1a1a] rounded-lg shadow-card p-6">
        {error && (
          <div className="mb-6 bg-red-600/10 text-red-400 p-4 rounded-md border border-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {[
            { label: 'Company Name *', id: 'name', type: 'text' },
            { label: 'Industry *', id: 'industry', type: 'text' },
            { label: 'Website', id: 'website', type: 'url' },
            { label: 'Location *', id: 'location', type: 'text' },
          ].map(({ label, id, type }) => (
            <div key={id}>
              <label htmlFor={id} className="block text-sm font-medium text-gray-300">
                {label}
              </label>
              <input
                type={type}
                id={id}
                name={id}
                required={label.includes('*')}
                value={formData[id]}
                onChange={handleChange}
                className="mt-1 block w-full bg-[#262626] border border-gray-700 text-white rounded-md py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>
          ))}

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full bg-[#262626] border border-gray-700 text-white rounded-md py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* Selects */}
          {[
            { id: 'stage', label: 'Stage *', options: stageOptions },
            { id: 'companySize', label: 'Company Size *', options: companySizeOptions },
            {
              id: 'metrics.revenue',
              label: 'Revenue Range',
              options: [
                'Pre-revenue',
                '$1-$10K',
                '$10K-$50K',
                '$50K-$100K',
                '$100K-$500K',
                '$500K-$1M',
                '$1M-$5M',
                '$5M+',
              ],
            },
          ].map(({ id, label, options }) => (
            <div key={id}>
              <label htmlFor={id} className="block text-sm font-medium text-gray-300">
                {label}
              </label>
              <select
                id={id}
                name={id}
                required={label.includes('*')}
                value={id.includes('.') ? formData.metrics.revenue : formData[id]}
                onChange={handleChange}
                className="mt-1 block w-full bg-[#262626] border border-gray-700 text-white rounded-md py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
              >
                {options.map((option) => (
                  <option key={option} value={option}>
                    {option.includes('employees') ? option : option}
                  </option>
                ))}
              </select>
            </div>
          ))}

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
                loading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                  Creating...
                </div>
              ) : (
                'Create Company'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

  );
};

export default CreateCompany;