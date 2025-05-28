import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';
import FounderDashboardNav from '../../../components/layout/FounderDashboardNav';

const EditJob = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

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
    status: 'Open',
  });

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`/jobs/${id}`);
        const job = response.data;

        // Format the data for the form
        setFormData({
          ...job,
          requirements: job.requirements.join('\n'),
          responsibilities: job.responsibilities.join('\n'),
          skills: job.skills.join(', '),
        });
      } catch (err) {
        setError('Failed to fetch job details');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

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
    setSaving(true);
    setError(null);

    // Convert comma-separated strings to arrays
    const processedData = {
      ...formData,
      requirements: formData.requirements.split('\n').filter(Boolean),
      responsibilities: formData.responsibilities.split('\n').filter(Boolean),
      skills: formData.skills.split(',').map((skill) => skill.trim()),
    };

    try {
      await axios.put(`/jobs/${id}`, processedData);
      navigate('/dashboard/jobs');
    } catch (err) {
      setError(
        err.response?.data?.msg || 'Failed to update job. Please try again.'
      );
    } finally {
      setSaving(false);
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
    //   <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
    //     <FounderDashboardNav />
    //     <div className="bg-white rounded-lg shadow-card p-6">
    //       <h1 className="text-3xl font-bold text-primary-950 mb-8">
    //         Edit Job Posting
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

    //         <div>
    //           <label
    //             htmlFor="status"
    //             className="block text-sm font-medium text-gray-700"
    //           >
    //             Job Status *
    //           </label>
    //           <select
    //             id="status"
    //             name="status"
    //             required
    //             value={formData.status}
    //             onChange={handleChange}
    //             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-accent-500 focus:border-accent-500"
    //           >
    //             <option value="Open">Open</option>
    //             <option value="Filled">Filled</option>
    //             <option value="Closed">Closed</option>
    //           </select>
    //         </div>

    //         <div className="pt-4">
    //           <button
    //             type="submit"
    //             disabled={saving}
    //             className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-accent-600 hover:bg-accent-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500 ${
    //               saving ? 'opacity-75 cursor-not-allowed' : ''
    //             }`}
    //           >
    //             {saving ? (
    //               <div className="flex items-center">
    //                 <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
    //                 Saving...
    //               </div>
    //             ) : (
    //               'Save Changes'
    //             )}
    //           </button>
    //         </div>
    //       </form>
    //     </div>
    //   </div>
    // </div>
    <div className="min-h-screen bg-zinc-900 pt-24 text-zinc-300">
  <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
    <FounderDashboardNav />
    <div className="bg-zinc-800 rounded-2xl shadow-lg p-6">
      <h1 className="text-3xl font-bold text-green-400 mb-8">Edit Job Posting</h1>

      {error && (
        <div className="mb-6 bg-red-900 text-red-200 p-4 rounded-md border border-red-600">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Job Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-zinc-400">
            Job Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full bg-zinc-900 border border-zinc-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 text-zinc-100"
          />
        </div>

        {/* Job Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-zinc-400">
            Job Description *
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={4}
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full bg-zinc-900 border border-zinc-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 text-zinc-100"
          />
        </div>

        {/* Requirements */}
        <div>
          <label htmlFor="requirements" className="block text-sm font-medium text-zinc-400">
            Requirements (one per line) *
          </label>
          <textarea
            id="requirements"
            name="requirements"
            required
            rows={4}
            value={formData.requirements}
            onChange={handleChange}
            className="mt-1 block w-full bg-zinc-900 border border-zinc-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 text-zinc-100"
          />
        </div>

        {/* Responsibilities */}
        <div>
          <label htmlFor="responsibilities" className="block text-sm font-medium text-zinc-400">
            Responsibilities (one per line) *
          </label>
          <textarea
            id="responsibilities"
            name="responsibilities"
            required
            rows={4}
            value={formData.responsibilities}
            onChange={handleChange}
            className="mt-1 block w-full bg-zinc-900 border border-zinc-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 text-zinc-100"
          />
        </div>

        {/* Job Type and Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-zinc-400">
              Job Type *
            </label>
            <select
              id="type"
              name="type"
              required
              value={formData.type}
              onChange={handleChange}
              className="mt-1 block w-full bg-zinc-900 border border-zinc-700 rounded-md py-2 px-3 text-zinc-100 focus:outline-none focus:ring-green-500 focus:border-green-500"
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
              <option value="Remote">Remote</option>
            </select>
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-zinc-400">
              Location *
            </label>
            <input
              type="text"
              id="location"
              name="location"
              required
              value={formData.location}
              onChange={handleChange}
              className="mt-1 block w-full bg-zinc-900 border border-zinc-700 rounded-md py-2 px-3 text-zinc-100 focus:outline-none focus:ring-green-500 focus:border-green-500"
            />
          </div>
        </div>

        {/* Remote Checkbox */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="remote"
            name="remote"
            checked={formData.remote}
            onChange={handleChange}
            className="h-4 w-4 text-green-500 focus:ring-green-500 border-zinc-600 rounded"
          />
          <label htmlFor="remote" className="ml-2 block text-sm text-zinc-400">
            This is a remote position
          </label>
        </div>

        {/* Salary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="salary.min" className="block text-sm font-medium text-zinc-400">
              Minimum Salary
            </label>
            <input
              type="number"
              id="salary.min"
              name="salary.min"
              value={formData.salary.min}
              onChange={handleChange}
              className="mt-1 block w-full bg-zinc-900 border border-zinc-700 rounded-md py-2 px-3 text-zinc-100 focus:outline-none focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div>
            <label htmlFor="salary.max" className="block text-sm font-medium text-zinc-400">
              Maximum Salary
            </label>
            <input
              type="number"
              id="salary.max"
              name="salary.max"
              value={formData.salary.max}
              onChange={handleChange}
              className="mt-1 block w-full bg-zinc-900 border border-zinc-700 rounded-md py-2 px-3 text-zinc-100 focus:outline-none focus:ring-green-500 focus:border-green-500"
            />
          </div>
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
            className="mt-1 block w-full bg-zinc-900 border border-zinc-700 rounded-md py-2 px-3 text-zinc-100 focus:outline-none focus:ring-green-500 focus:border-green-500"
          />
        </div>

        {/* Experience and Education */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="experience" className="block text-sm font-medium text-zinc-400">
              Experience Level *
            </label>
            <select
              id="experience"
              name="experience"
              required
              value={formData.experience}
              onChange={handleChange}
              className="mt-1 block w-full bg-zinc-900 border border-zinc-700 rounded-md py-2 px-3 text-zinc-100 focus:outline-none focus:ring-green-500 focus:border-green-500"
            >
              <option value="Entry Level">Entry Level</option>
              <option value="1-3 years">1-3 years</option>
              <option value="3-5 years">3-5 years</option>
              <option value="5+ years">5+ years</option>
              <option value="7+ years">7+ years</option>
              <option value="10+ years">10+ years</option>
            </select>
          </div>

          <div>
            <label htmlFor="education" className="block text-sm font-medium text-zinc-400">
              Education *
            </label>
            <select
              id="education"
              name="education"
              required
              value={formData.education}
              onChange={handleChange}
              className="mt-1 block w-full bg-zinc-900 border border-zinc-700 rounded-md py-2 px-3 text-zinc-100 focus:outline-none focus:ring-green-500 focus:border-green-500"
            >
              <option value="Not Required">Not Required</option>
              <option value="High School">High School</option>
              <option value="Bachelor's">Bachelor&apos;s</option>
              <option value="Master's">Master&apos;s</option>
              <option value="PhD">PhD</option>
            </select>
          </div>
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
            className="mt-1 block w-full bg-zinc-900 border border-zinc-700 rounded-md py-2 px-3 text-zinc-100 focus:outline-none focus:ring-green-500 focus:border-green-500"
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
              className="mt-1 block w-full bg-zinc-900 border border-zinc-700 rounded-md py-2 px-3 text-zinc-100 focus:outline-none focus:ring-green-500 focus:border-green-500"
            />
          </div>
        )}

        {/* Status */}
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-zinc-400">
            Job Status *
          </label>
          <select
            id="status"
            name="status"
            required
            value={formData.status}
            onChange={handleChange}
            className="mt-1 block w-full bg-zinc-900 border border-zinc-700 rounded-md py-2 px-3 text-zinc-100 focus:outline-none focus:ring-green-500 focus:border-green-500"
          >
            <option value="Open">Open</option>
            <option value="Filled">Filled</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={saving}
            className={`w-full flex justify-center py-3 px-4 rounded-md shadow-md text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
              saving ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {saving ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                Saving...
              </div>
            ) : (
              'Save Changes'
            )}
          </button>
        </div>
      </form>
    </div>
  </div>
</div>

  );
};

export default EditJob;