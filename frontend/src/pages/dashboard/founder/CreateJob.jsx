import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';
import FounderDashboardNav from '../../../components/layout/FounderDashboardNav';

const CreateJob = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
   const [companyId, setCompanyId] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    responsibilities: '',
    type: 'Full-time',
    location: '',
    remote: false,
    salary: {
      min: '',
      max: '',
      currency: 'USD',
      isVisible: true,
    },
    skills: '',
    experience: 'Entry Level',
    education: 'Not Required',
    applicationProcess: 'Internal',
    applicationLink: '',
  });

    useEffect(() => {
    const fetchUserCompany = async () => {
      try {
        const response = await axios.get('/companies');
        const foundCompany = response.data.find(
          (c) => c.founder._id === user._id
        );
        
        if (foundCompany) {
          setCompanyId(foundCompany._id);
        } else {
          setError("You need to create a company first before posting a job.");
        }
      } catch (err) {
        setError('Failed to fetch company data');
      }
    };
    fetchUserCompany();
  }, [user._id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Convert comma-separated strings to arrays
    const processedData = {
      ...formData,
      company: companyId,
      requirements: formData.requirements.split('\n').filter(Boolean),
      responsibilities: formData.responsibilities.split('\n').filter(Boolean),
      skills: formData.skills.split(',').map((skill) => skill.trim()),
    };

    try {
      await axios.post('/jobs', processedData);
      navigate('/dashboard/jobs');
    } catch (err) {
      setError(
        err.response?.data?.msg || 'Failed to create job. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    // <div className="min-h-screen bg-gray-50 pt-24">
    //   <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
    //     <FounderDashboardNav />
    //     <div className="bg-white rounded-lg shadow-card p-6">
    //       <h1 className="text-3xl font-bold text-primary-950 mb-8">
    //         Post a New Job
    //       </h1>

    //       {error && (
    //         <div className="mb-6 bg-red-50 text-red-800 p-4 rounded-md">
    //           {error}
    //         </div>
    //       )}

    //       <form onSubmit={handleSubmit} className="space-y-6">
    //         <div>
    //           <label
    //             htmlFor="title"
    //             className="block text-sm font-medium text-gray-700"
    //           >
    //             Job Title *
    //           </label>
    //           <input
    //             type="text"
    //             id="title"
    //             name="title"
    //             required
    //             value={formData.title}
    //             onChange={handleChange}
    //             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-accent-500 focus:border-accent-500"
    //           />
    //         </div>

    //         <div>
    //           <label
    //             htmlFor="description"
    //             className="block text-sm font-medium text-gray-700"
    //           >
    //             Job Description *
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
    //             htmlFor="requirements"
    //             className="block text-sm font-medium text-gray-700"
    //           >
    //             Requirements (one per line) *
    //           </label>
    //           <textarea
    //             id="requirements"
    //             name="requirements"
    //             required
    //             rows={4}
    //             value={formData.requirements}
    //             onChange={handleChange}
    //             placeholder="Bachelor's degree in Computer Science or related field&#10;3+ years of experience with React&#10;Strong problem-solving skills"
    //             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-accent-500 focus:border-accent-500"
    //           />
    //         </div>

    //         <div>
    //           <label
    //             htmlFor="responsibilities"
    //             className="block text-sm font-medium text-gray-700"
    //           >
    //             Responsibilities (one per line) *
    //           </label>
    //           <textarea
    //             id="responsibilities"
    //             name="responsibilities"
    //             required
    //             rows={4}
    //             value={formData.responsibilities}
    //             onChange={handleChange}
    //             placeholder="Develop and maintain web applications&#10;Collaborate with cross-functional teams&#10;Write clean, maintainable code"
    //             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-accent-500 focus:border-accent-500"
    //           />
    //         </div>

    //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    //           <div>
    //             <label
    //               htmlFor="type"
    //               className="block text-sm font-medium text-gray-700"
    //             >
    //               Job Type *
    //             </label>
    //             <select
    //               id="type"
    //               name="type"
    //               required
    //               value={formData.type}
    //               onChange={handleChange}
    //               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-accent-500 focus:border-accent-500"
    //             >
    //               <option value="Full-time">Full-time</option>
    //               <option value="Part-time">Part-time</option>
    //               <option value="Contract">Contract</option>
    //               <option value="Internship">Internship</option>
    //               <option value="Remote">Remote</option>
    //             </select>
    //           </div>

              

    //           <div>
    //             <label
    //               htmlFor="location"
    //               className="block text-sm font-medium text-gray-700"
    //             >
    //               Location *
    //             </label>
    //             <input
    //               type="text"
    //               id="location"
    //               name="location"
    //               required
    //               value={formData.location}
    //               onChange={handleChange}
    //               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-accent-500 focus:border-accent-500"
    //             />
    //           </div>
    //         </div>

    //         <div className="flex items-center">
    //           <input
    //             type="checkbox"
    //             id="remote"
    //             name="remote"
    //             checked={formData.remote}
    //             onChange={handleChange}
    //             className="h-4 w-4 text-accent-600 focus:ring-accent-500 border-gray-300 rounded"
    //           />
    //           <label
    //             htmlFor="remote"
    //             className="ml-2 block text-sm text-gray-700"
    //           >
    //             This is a remote position
    //           </label>
    //         </div>

    //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    //           <div>
    //             <label
    //               htmlFor="salary.min"
    //               className="block text-sm font-medium text-gray-700"
    //             >
    //               Minimum Salary
    //             </label>
    //             <input
    //               type="number"
    //               id="salary.min"
    //               name="salary.min"
    //               value={formData.salary.min}
    //               onChange={handleChange}
    //               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-accent-500 focus:border-accent-500"
    //             />
    //           </div>

    //           <div>
    //             <label
    //               htmlFor="salary.max"
    //               className="block text-sm font-medium text-gray-700"
    //             >
    //               Maximum Salary
    //             </label>
    //             <input
    //               type="number"
    //               id="salary.max"
    //               name="salary.max"
    //               value={formData.salary.max}
    //               onChange={handleChange}
    //               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-accent-500 focus:border-accent-500"
    //             />
    //           </div>
    //         </div>

    //         <div>
    //           <label
    //             htmlFor="skills"
    //             className="block text-sm font-medium text-gray-700"
    //           >
    //             Required Skills (comma-separated) *
    //           </label>
    //           <input
    //             type="text"
    //             id="skills"
    //             name="skills"
    //             required
    //             value={formData.skills}
    //             onChange={handleChange}
    //             placeholder="React, Node.js, TypeScript"
    //             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-accent-500 focus:border-accent-500"
    //           />
    //         </div>

    //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    //           <div>
    //             <label
    //               htmlFor="experience"
    //               className="block text-sm font-medium text-gray-700"
    //             >
    //               Experience Level *
    //             </label>
    //             <select
    //               id="experience"
    //               name="experience"
    //               required
    //               value={formData.experience}
    //               onChange={handleChange}
    //               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-accent-500 focus:border-accent-500"
    //             >
    //               <option value="Entry Level">Entry Level</option>
    //               <option value="1-3 years">1-3 years</option>
    //               <option value="3-5 years">3-5 years</option>
    //               <option value="5+ years">5+ years</option>
    //               <option value="7+ years">7+ years</option>
    //               <option value="10+ years">10+ years</option>
    //             </select>
    //           </div>

    //           <div>
    //             <label
    //               htmlFor="education"
    //               className="block text-sm font-medium text-gray-700"
    //             >
    //               Education *
    //             </label>
    //             <select
    //               id="education"
    //               name="education"
    //               required
    //               value={formData.education}
    //               onChange={handleChange}
    //               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-accent-500 focus:border-accent-500"
    //             >
    //               <option value="Not Required">Not Required</option>
    //               <option value="High School">High School</option>
    //               <option value="Bachelor's">Bachelor's</option>
    //               <option value="Master's">Master's</option>
    //               <option value="PhD">PhD</option>
    //             </select>
    //           </div>
    //         </div>

    //         <div>
    //           <label
    //             htmlFor="applicationProcess"
    //             className="block text-sm font-medium text-gray-700"
    //           >
    //             Application Process *
    //           </label>
    //           <select
    //             id="applicationProcess"
    //             name="applicationProcess"
    //             required
    //             value={formData.applicationProcess}
    //             onChange={handleChange}
    //             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-accent-500 focus:border-accent-500"
    //           >
    //             <option value="Internal">Internal (Apply through Starteck)</option>
    //             <option value="External">External (Apply through company website)</option>
    //           </select>
    //         </div>

    //         {formData.applicationProcess === 'External' && (
    //           <div>
    //             <label
    //               htmlFor="applicationLink"
    //               className="block text-sm font-medium text-gray-700"
    //             >
    //               Application Link *
    //             </label>
    //             <input
    //               type="url"
    //               id="applicationLink"
    //               name="applicationLink"
    //               required={formData.applicationProcess === 'External'}
    //               value={formData.applicationLink}
    //               onChange={handleChange}
    //               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-accent-500 focus:border-accent-500"
    //             />
    //           </div>
    //         )}

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
    //               'Post Job'
    //             )}
    //           </button>
    //         </div>
    //       </form>
    //     </div>
    //   </div>
    // </div>
    <div className="min-h-screen bg-zinc-950 pt-24 text-zinc-300">
  <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
    <FounderDashboardNav />
    <div className="bg-zinc-900 rounded-xl shadow-md p-6">
      <h1 className="text-3xl font-bold text-green-400 mb-8">Post a New Job</h1>

      {error && (
        <div className="mb-6 bg-red-900/30 text-red-400 p-4 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Input Groups */}
        {[
          {
            label: 'Job Title *',
            type: 'text',
            name: 'title',
            value: formData.title,
          },
          {
            label: 'Job Description *',
            type: 'textarea',
            name: 'description',
            value: formData.description,
            rows: 4,
          },
          {
            label: 'Requirements (one per line) *',
            type: 'textarea',
            name: 'requirements',
            value: formData.requirements,
            rows: 4,
          },
          {
            label: 'Responsibilities (one per line) *',
            type: 'textarea',
            name: 'responsibilities',
            value: formData.responsibilities,
            rows: 4,
          },
        ].map(({ label, type, name, value, rows }) => (
          <div key={name}>
            <label htmlFor={name} className="block text-sm font-medium text-zinc-400">
              {label}
            </label>
            {type === 'textarea' ? (
              <textarea
                id={name}
                name={name}
                required
                rows={rows}
                value={value}
                onChange={handleChange}
                className="mt-1 block w-full bg-zinc-800 border border-zinc-700 rounded-md py-2 px-3 focus:outline-none focus:ring-green-600 focus:border-green-600"
              />
            ) : (
              <input
                type={type}
                id={name}
                name={name}
                required
                value={value}
                onChange={handleChange}
                className="mt-1 block w-full bg-zinc-800 border border-zinc-700 rounded-md py-2 px-3 focus:outline-none focus:ring-green-600 focus:border-green-600"
              />
            )}
          </div>
        ))}

        {/* Job Type & Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              label: 'Job Type *',
              name: 'type',
              options: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'],
            },
            {
              label: 'Location *',
              type: 'text',
              name: 'location',
              value: formData.location,
            },
          ].map((field) => (
            <div key={field.name}>
              <label htmlFor={field.name} className="block text-sm font-medium text-zinc-400">
                {field.label}
              </label>
              {field.options ? (
                <select
                  id={field.name}
                  name={field.name}
                  required
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="mt-1 block w-full bg-zinc-800 border border-zinc-700 rounded-md py-2 px-3 focus:outline-none focus:ring-green-600 focus:border-green-600"
                >
                  {field.options.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  required
                  value={field.value}
                  onChange={handleChange}
                  className="mt-1 block w-full bg-zinc-800 border border-zinc-700 rounded-md py-2 px-3 focus:outline-none focus:ring-green-600 focus:border-green-600"
                />
              )}
            </div>
          ))}
        </div>

        {/* Remote checkbox */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="remote"
            name="remote"
            checked={formData.remote}
            onChange={handleChange}
            className="h-4 w-4 text-green-600 bg-zinc-900 border-zinc-700 rounded focus:ring-green-500"
          />
          <label htmlFor="remote" className="ml-2 block text-sm text-zinc-400">
            This is a remote position
          </label>
        </div>

        {/* Salary fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {['min', 'max'].map((type) => (
            <div key={type}>
              <label htmlFor={`salary.${type}`} className="block text-sm font-medium text-zinc-400">
                {type === 'min' ? 'Minimum' : 'Maximum'} Salary
              </label>
              <input
                type="number"
                id={`salary.${type}`}
                name={`salary.${type}`}
                value={formData.salary[type]}
                onChange={handleChange}
                className="mt-1 block w-full bg-zinc-800 border border-zinc-700 rounded-md py-2 px-3 focus:outline-none focus:ring-green-600 focus:border-green-600"
              />
            </div>
          ))}
        </div>

        {/* Skills */}
        <div>
          <label htmlFor="skills" className="block text-sm font-medium text-zinc-400">
            Required Skills (comma-separated) *
          </label>
          <input
            type="text"
            id="skills"
            name="skills"
            required
            value={formData.skills}
            onChange={handleChange}
            placeholder="React, Node.js, TypeScript"
            className="mt-1 block w-full bg-zinc-800 border border-zinc-700 rounded-md py-2 px-3 focus:outline-none focus:ring-green-600 focus:border-green-600"
          />
        </div>

        {/* Experience and Education */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              name: 'experience',
              label: 'Experience Level *',
              options: [
                'Entry Level', '1-3 years', '3-5 years',
                '5+ years', '7+ years', '10+ years',
              ],
            },
            {
              name: 'education',
              label: 'Education *',
              options: ['Not Required', 'High School', "Bachelor's", "Master's", 'PhD'],
            },
          ].map(({ name, label, options }) => (
            <div key={name}>
              <label htmlFor={name} className="block text-sm font-medium text-zinc-400">
                {label}
              </label>
              <select
                id={name}
                name={name}
                required
                value={formData[name]}
                onChange={handleChange}
                className="mt-1 block w-full bg-zinc-800 border border-zinc-700 rounded-md py-2 px-3 focus:outline-none focus:ring-green-600 focus:border-green-600"
              >
                {options.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {/* Application Process */}
        <div>
          <label htmlFor="applicationProcess" className="block text-sm font-medium text-zinc-400">
            Application Process *
          </label>
          <select
            id="applicationProcess"
            name="applicationProcess"
            required
            value={formData.applicationProcess}
            onChange={handleChange}
            className="mt-1 block w-full bg-zinc-800 border border-zinc-700 rounded-md py-2 px-3 focus:outline-none focus:ring-green-600 focus:border-green-600"
          >
            <option value="Internal">Internal (Apply through Starteck)</option>
            <option value="External">External (Apply through company website)</option>
          </select>
        </div>

        {formData.applicationProcess === 'External' && (
          <div>
            <label htmlFor="applicationLink" className="block text-sm font-medium text-zinc-400">
              Application Link *
            </label>
            <input
              type="url"
              id="applicationLink"
              name="applicationLink"
              required
              value={formData.applicationLink}
              onChange={handleChange}
              className="mt-1 block w-full bg-zinc-800 border border-zinc-700 rounded-md py-2 px-3 focus:outline-none focus:ring-green-600 focus:border-green-600"
            />
          </div>
        )}

        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
              loading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                Creating...
              </div>
            ) : (
              'Post Job'
            )}
          </button>
        </div>
      </form>
    </div>
  </div>
</div>

  );
};

export default CreateJob;