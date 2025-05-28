import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
    social: {
      linkedin: '',
      twitter: '',
      website: '',
      github: '',
    },
    jobSeekerProfile: {
      skills: [],
      education: [],
      experience: [],
      resumeUrl: '',
    },
    investorProfile: {
      investmentFocus: [],
      investmentStages: [],
      averageTicketSize: {
        min: '',
        max: '',
      },
    },
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        ...user,
      }));
    }
  }, [user]);

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

  const handleArrayChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      jobSeekerProfile: {
        ...prev.jobSeekerProfile,
        [field]: value.split(',').map((item) => item.trim()),
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await axios.put('/users/profile', formData);
      setSuccess(true);
    } catch (err) {
      setError(
        err.response?.data?.msg || 'Failed to update profile. Please try again.'
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
    //         Profile Settings
    //       </h1>

    //       {error && (
    //         <div className="mb-6 bg-red-50 text-red-800 p-4 rounded-md">
    //           {error}
    //         </div>
    //       )}

    //       {success && (
    //         <div className="mb-6 bg-green-50 text-green-800 p-4 rounded-md">
    //           Profile updated successfully!
    //         </div>
    //       )}

    //       <form onSubmit={handleSubmit} className="space-y-6">
    //         {/* Basic Info */}
    //         <div>
    //           <h2 className="text-xl font-semibold text-primary-950 mb-4">
    //             Basic Information
    //           </h2>
    //           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    //             <div>
    //               <label
    //                 htmlFor="name"
    //                 className="block text-sm font-medium text-gray-700"
    //               >
    //                 Full Name *
    //               </label>
    //               <input
    //                 type="text"
    //                 id="name"
    //                 name="name"
    //                 required
    //                 value={formData.name}
    //                 onChange={handleChange}
    //                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-accent-500 focus:border-accent-500"
    //               />
    //             </div>

    //             <div>
    //               <label
    //                 htmlFor="email"
    //                 className="block text-sm font-medium text-gray-700"
    //               >
    //                 Email *
    //               </label>
    //               <input
    //                 type="email"
    //                 id="email"
    //                 name="email"
    //                 required
    //                 value={formData.email}
    //                 onChange={handleChange}
    //                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-accent-500 focus:border-accent-500"
    //               />
    //             </div>

    //             <div>
    //               <label
    //                 htmlFor="phone"
    //                 className="block text-sm font-medium text-gray-700"
    //               >
    //                 Phone
    //               </label>
    //               <input
    //                 type="tel"
    //                 id="phone"
    //                 name="phone"
    //                 value={formData.phone}
    //                 onChange={handleChange}
    //                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-accent-500 focus:border-accent-500"
    //               />
    //             </div>

    //             <div>
    //               <label
    //                 htmlFor="location"
    //                 className="block text-sm font-medium text-gray-700"
    //               >
    //                 Location
    //               </label>
    //               <input
    //                 type="text"
    //                 id="location"
    //                 name="location"
    //                 value={formData.location}
    //                 onChange={handleChange}
    //                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-accent-500 focus:border-accent-500"
    //               />
    //             </div>
    //           </div>

    //           <div className="mt-6">
    //             <label
    //               htmlFor="bio"
    //               className="block text-sm font-medium text-gray-700"
    //             >
    //               Bio
    //             </label>
    //             <textarea
    //               id="bio"
    //               name="bio"
    //               rows={4}
    //               value={formData.bio}
    //               onChange={handleChange}
    //               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-accent-500 focus:border-accent-500"
    //             />
    //           </div>
    //         </div>

    //         {/* Social Links */}
    //         <div>
    //           <h2 className="text-xl font-semibold text-primary-950 mb-4">
    //             Social Links
    //           </h2>
    //           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    //             <div>
    //               <label
    //                 htmlFor="social.linkedin"
    //                 className="block text-sm font-medium text-gray-700"
    //               >
    //                 LinkedIn
    //               </label>
    //               <input
    //                 type="url"
    //                 id="social.linkedin"
    //                 name="social.linkedin"
    //                 value={formData.social.linkedin}
    //                 onChange={handleChange}
    //                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-accent-500 focus:border-accent-500"
    //               />
    //             </div>

    //             <div>
    //               <label
    //                 htmlFor="social.twitter"
    //                 className="block text-sm font-medium text-gray-700"
    //               >
    //                 Twitter
    //               </label>
    //               <input
    //                 type="url"
    //                 id="social.twitter"
    //                 name="social.twitter"
    //                 value={formData.social.twitter}
    //                 onChange={handleChange}
    //                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-accent-500 focus:border-accent-500"
    //               />
    //             </div>

    //             <div>
    //               <label
    //                 htmlFor="social.website"
    //                 className="block text-sm font-medium text-gray-700"
    //               >
    //                 Personal Website
    //               </label>
    //               <input
    //                 type="url"
    //                 id="social.website"
    //                 name="social.website"
    //                 value={formData.social.website}
    //                 onChange={handleChange}
    //                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-accent-500 focus:border-accent-500"
    //               />
    //             </div>

    //             <div>
    //               <label
    //                 htmlFor="social.github"
    //                 className="block text-sm font-medium text-gray-700"
    //               >
    //                 GitHub
    //               </label>
    //               <input
    //                 type="url"
    //                 id="social.github"
    //                 name="social.github"
    //                 value={formData.social.github}
    //                 onChange={handleChange}
    //                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-accent-500 focus:border-accent-500"
    //               />
    //             </div>
    //           </div>
    //         </div>

    //         {/* Role-specific Fields */}
    //         {user?.role === 'jobseeker' && (
    //           <div>
    //             <h2 className="text-xl font-semibold text-primary-950 mb-4">
    //               Job Seeker Profile
    //             </h2>
    //             <div className="space-y-6">
    //               <div>
    //                 <label
    //                   htmlFor="skills"
    //                   className="block text-sm font-medium text-gray-700"
    //                 >
    //                   Skills (comma-separated)
    //                 </label>
    //                 <input
    //                   type="text"
    //                   id="skills"
    //                   value={formData.jobSeekerProfile.skills.join(', ')}
    //                   onChange={(e) => handleArrayChange('skills', e.target.value)}
    //                   className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-accent-500 focus:border-accent-500"
    //                 />
    //               </div>

    //               <div>
    //                 <label
    //                   htmlFor="resumeUrl"
    //                   className="block text-sm font-medium text-gray-700"
    //                 >
    //                   Resume URL
    //                 </label>
    //                 <input
    //                   type="url"
    //                   id="resumeUrl"
    //                   name="jobSeekerProfile.resumeUrl"
    //                   value={formData.jobSeekerProfile.resumeUrl}
    //                   onChange={handleChange}
    //                   className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-accent-500 focus:border-accent-500"
    //                 />
    //               </div>
    //             </div>
    //           </div>
    //         )}

    //         {user?.role === 'investor' && (
    //           <div>
    //             <h2 className="text-xl font-semibold text-primary-950 mb-4">
    //               Investor Profile
    //             </h2>
    //             <div className="space-y-6">
    //               <div>
    //                 <label
    //                   htmlFor="investmentFocus"
    //                   className="block text-sm font-medium text-gray-700"
    //                 >
    //                   Investment Focus (comma-separated)
    //                 </label>
    //                 <input
    //                   type="text"
    //                   id="investmentFocus"
    //                   value={formData.investorProfile.investmentFocus.join(', ')}
    //                   onChange={(e) =>
    //                     setFormData((prev) => ({
    //                       ...prev,
    //                       investorProfile: {
    //                         ...prev.investorProfile,
    //                         investmentFocus: e.target.value
    //                           .split(',')
    //                           .map((item) => item.trim()),
    //                       },
    //                     }))
    //                   }
    //                   className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-accent-500 focus:border-accent-500"
    //                 />
    //               </div>

    //               <div>
    //                 <label
    //                   htmlFor="investmentStages"
    //                   className="block text-sm font-medium text-gray-700"
    //                 >
    //                   Investment Stages (comma-separated)
    //                 </label>
    //                 <input
    //                   type="text"
    //                   id="investmentStages"
    //                   value={formData.investorProfile.investmentStages.join(', ')}
    //                   onChange={(e) =>
    //                     setFormData((prev) => ({
    //                       ...prev,
    //                       investorProfile: {
    //                         ...prev.investorProfile,
    //                         investmentStages: e.target.value
    //                           .split(',')
    //                           .map((item) => item.trim()),
    //                       },
    //                     }))
    //                   }
    //                   className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-accent-500 focus:border-accent-500"
    //                 />
    //               </div>

    //               <div className="grid grid-cols-2 gap-6">
    //                 <div>
    //                   <label
    //                     htmlFor="averageTicketSize.min"
    //                     className="block text-sm font-medium text-gray-700"
    //                   >
    //                     Min Ticket Size
    //                   </label>
    //                   <input
    //                     type="number"
    //                     id="averageTicketSize.min"
    //                     name="investorProfile.averageTicketSize.min"
    //                     value={formData.investorProfile.averageTicketSize.min}
    //                     onChange={handleChange}
    //                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-accent-500 focus:border-accent-500"
    //                   />
    //                 </div>

    //                 <div>
    //                   <label
    //                     htmlFor="averageTicketSize.max"
    //                     className="block text-sm font-medium text-gray-700"
    //                   >
    //                     Max Ticket Size
    //                   </label>
    //                   <input
    //                     type="number"
    //                     id="averageTicketSize.max"
    //                     name="investorProfile.averageTicketSize.max"
    //                     value={formData.investorProfile.averageTicketSize.max}
    //                     onChange={handleChange}
    //                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-accent-500 focus:border-accent-500"
    //                   />
    //                 </div>
    //               </div>
    //             </div>
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
    <div className="min-h-screen bg-zinc-900 pt-24">
  <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="bg-zinc-800 rounded-lg shadow-md p-6">
      <h1 className="text-3xl font-bold text-green-400 mb-8">Profile Settings</h1>

      {error && (
        <div className="mb-6 bg-red-800/20 text-red-400 p-4 rounded-md">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-6 bg-green-800/20 text-green-400 p-4 rounded-md">
          Profile updated successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-green-300 mb-4">
            Basic Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-zinc-300">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full bg-zinc-900 text-zinc-200 border border-zinc-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-600 focus:border-green-600"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-300">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full bg-zinc-900 text-zinc-200 border border-zinc-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-600 focus:border-green-600"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-zinc-300">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 block w-full bg-zinc-900 text-zinc-200 border border-zinc-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-600 focus:border-green-600"
              />
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-zinc-300">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="mt-1 block w-full bg-zinc-900 text-zinc-200 border border-zinc-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-600 focus:border-green-600"
              />
            </div>
          </div>
          <div className="mt-6">
            <label htmlFor="bio" className="block text-sm font-medium text-zinc-300">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              rows={4}
              value={formData.bio}
              onChange={handleChange}
              className="mt-1 block w-full bg-zinc-900 text-zinc-200 border border-zinc-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-600 focus:border-green-600"
            />
          </div>
        </div>

        {/* Social Links */}
        <div>
          <h2 className="text-xl font-semibold text-green-300 mb-4">Social Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {["linkedin", "twitter", "website", "github"].map((platform) => (
              <div key={platform}>
                <label htmlFor={`social.${platform}`} className="block text-sm font-medium text-zinc-300 capitalize">
                  {platform}
                </label>
                <input
                  type="url"
                  id={`social.${platform}`}
                  name={`social.${platform}`}
                  value={formData.social[platform]}
                  onChange={handleChange}
                  className="mt-1 block w-full bg-zinc-900 text-zinc-200 border border-zinc-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-600 focus:border-green-600"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Role-specific */}
        {user?.role === "jobseeker" && (
          <div>
            <h2 className="text-xl font-semibold text-green-300 mb-4">Job Seeker Profile</h2>
            <div className="space-y-6">
              <div>
                <label htmlFor="skills" className="block text-sm font-medium text-zinc-300">
                  Skills (comma-separated)
                </label>
                <input
                  type="text"
                  id="skills"
                  value={formData.jobSeekerProfile.skills.join(", ")}
                  onChange={(e) => handleArrayChange("skills", e.target.value)}
                  className="mt-1 block w-full bg-zinc-900 text-zinc-200 border border-zinc-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-600 focus:border-green-600"
                />
              </div>
              <div>
                <label htmlFor="resumeUrl" className="block text-sm font-medium text-zinc-300">
                  Resume URL
                </label>
                <input
                  type="url"
                  id="resumeUrl"
                  name="jobSeekerProfile.resumeUrl"
                  value={formData.jobSeekerProfile.resumeUrl}
                  onChange={handleChange}
                  className="mt-1 block w-full bg-zinc-900 text-zinc-200 border border-zinc-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-600 focus:border-green-600"
                />
              </div>
            </div>
          </div>
        )}

        {user?.role === "investor" && (
          <div>
            <h2 className="text-xl font-semibold text-green-300 mb-4">Investor Profile</h2>
            <div className="space-y-6">
              {["investmentFocus", "investmentStages"].map((field) => (
                <div key={field}>
                  <label htmlFor={field} className="block text-sm font-medium text-zinc-300">
                    {field === "investmentFocus"
                      ? "Investment Focus"
                      : "Investment Stages"}{" "}
                    (comma-separated)
                  </label>
                  <input
                    type="text"
                    id={field}
                    value={formData.investorProfile[field].join(", ")}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        investorProfile: {
                          ...prev.investorProfile,
                          [field]: e.target.value.split(",").map((item) => item.trim()),
                        },
                      }))
                    }
                    className="mt-1 block w-full bg-zinc-900 text-zinc-200 border border-zinc-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-600 focus:border-green-600"
                  />
                </div>
              ))}
              <div className="grid grid-cols-2 gap-6">
                {["min", "max"].map((type) => (
                  <div key={type}>
                    <label htmlFor={`averageTicketSize.${type}`} className="block text-sm font-medium text-zinc-300">
                      {type === "min" ? "Min" : "Max"} Ticket Size
                    </label>
                    <input
                      type="number"
                      id={`averageTicketSize.${type}`}
                      name={`investorProfile.averageTicketSize.${type}`}
                      value={formData.investorProfile.averageTicketSize[type]}
                      onChange={handleChange}
                      className="mt-1 block w-full bg-zinc-900 text-zinc-200 border border-zinc-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-600 focus:border-green-600"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
              loading ? "opacity-75 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                Saving...
              </div>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </form>
    </div>
  </div>
</div>


  );
};

export default Profile;