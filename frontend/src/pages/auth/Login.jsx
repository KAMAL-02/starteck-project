import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const { login, isAuthenticated, error, clearError } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  const { email, password } = formData;
  
  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }
  
  const onChange = (e) => {
    clearError();
    setFormErrors({
      ...formErrors,
      [e.target.name]: '',
    });
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  
  const validateForm = () => {
    const errors = {};
    
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!password) {
      errors.password = 'Password is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const onSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    const result = await login(email, password);
    
    setIsLoading(false);
    
    if (result.success) {
      navigate('/dashboard');
    }
  };
  
  return (
    // <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    //   <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-card">
    //     <div>
    //       <h2 className="mt-6 text-center text-3xl font-bold text-primary-950 font-heading">
    //         Sign in to your account
    //       </h2>
    //       <p className="mt-2 text-center text-gray-600">
    //         Or{' '}
    //         <Link to="/register" className="text-accent-600 hover:text-accent-500">
    //           create a new account
    //         </Link>
    //       </p>
    //     </div>
        
    //     {error && (
    //       <div className="bg-red-50 text-red-800 p-4 rounded-md">
    //         {error}
    //       </div>
    //     )}
        
    //     <form className="mt-8 space-y-6" onSubmit={onSubmit}>
    //       <div className="space-y-4">
    //         <div>
    //           <label htmlFor="email" className="block text-sm font-medium text-gray-700">
    //             Email address
    //           </label>
    //           <input
    //             id="email"
    //             name="email"
    //             type="email"
    //             value={email}
    //             onChange={onChange}
    //             className={`mt-1 block w-full border ${
    //               formErrors.email ? 'border-red-300' : 'border-gray-300'
    //             } rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-accent-500 focus:border-accent-500`}
    //           />
    //           {formErrors.email && (
    //             <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
    //           )}
    //         </div>
            
    //         <div>
    //           <div className="flex justify-between">
    //             <label htmlFor="password" className="block text-sm font-medium text-gray-700">
    //               Password
    //             </label>
    //           </div>
    //           <input
    //             id="password"
    //             name="password"
    //             type="password"
    //             value={password}
    //             onChange={onChange}
    //             className={`mt-1 block w-full border ${
    //               formErrors.password ? 'border-red-300' : 'border-gray-300'
    //             } rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-accent-500 focus:border-accent-500`}
    //           />
    //           {formErrors.password && (
    //             <p className="mt-1 text-sm text-red-600">{formErrors.password}</p>
    //           )}
    //         </div>
    //       </div>
          
    //       <div>
    //         <button
    //           type="submit"
    //           className={`group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-md text-white bg-accent-600 hover:bg-accent-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500 transition-colors ${
    //             isLoading ? 'opacity-75 cursor-not-allowed' : ''
    //           }`}
    //           disabled={isLoading}
    //         >
    //           {isLoading ? (
    //             <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    //               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    //               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    //             </svg>
    //           ) : (
    //             'Sign in'
    //           )}
    //         </button>
    //       </div>
    //     </form>
    //   </div>
    // </div>
//     <div className="min-h-screen bg-[#121212] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//   <div className="max-w-md w-full space-y-8 bg-[#1e2a1e] p-8 rounded-lg shadow-lg shadow-black/60">
//     <div>
//       <h2 className="mt-6 text-center text-3xl font-bold text-[#267d27] font-heading">
//         Sign in to your account
//       </h2>
//       <p className="mt-2 text-center text-gray-400">
//         Or{' '}
//         <Link to="/register" className="text-[#3bb33b] hover:text-[#55d355]">
//           create a new account
//         </Link>
//       </p>
//     </div>

//     {error && (
//       <div className="bg-red-800 text-red-300 p-4 rounded-md">
//         {error}
//       </div>
//     )}

//     <form className="mt-8 space-y-6" onSubmit={onSubmit}>
//       <div className="space-y-4">
//         <div>
//           <label htmlFor="email" className="block text-sm font-medium text-gray-300">
//             Email address
//           </label>
//           <input
//             id="email"
//             name="email"
//             type="email"
//             value={email}
//             onChange={onChange}
//             className={`mt-1 block w-full rounded-md px-3 py-2 shadow-sm
//               bg-[#121212] border ${
//                 formErrors.email ? 'border-red-600' : 'border-[#267d27]'
//               } text-gray-200 placeholder-gray-500
//               focus:outline-none focus:ring-2 focus:ring-[#267d27] focus:border-[#267d27] transition-colors`}
//           />
//           {formErrors.email && (
//             <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
//           )}
//         </div>

//         <div>
//           <div className="flex justify-between">
//             <label htmlFor="password" className="block text-sm font-medium text-gray-300">
//               Password
//             </label>
//           </div>
//           <input
//             id="password"
//             name="password"
//             type="password"
//             value={password}
//             onChange={onChange}
//             className={`mt-1 block w-full rounded-md px-3 py-2 shadow-sm
//               bg-[#121212] border ${
//                 formErrors.password ? 'border-red-600' : 'border-[#267d27]'
//               } text-gray-200 placeholder-gray-500
//               focus:outline-none focus:ring-2 focus:ring-[#267d27] focus:border-[#267d27] transition-colors`}
//           />
//           {formErrors.password && (
//             <p className="mt-1 text-sm text-red-500">{formErrors.password}</p>
//           )}
//         </div>
//       </div>

//       <div>
//         <button
//           type="submit"
//           className={`group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-md text-white bg-[#267d27] hover:bg-[#1f6620] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#267d27] transition-colors ${
//             isLoading ? 'opacity-75 cursor-not-allowed' : ''
//           }`}
//           disabled={isLoading}
//         >
//           {isLoading ? (
//             <svg
//               className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//             >
//               <circle
//                 className="opacity-25"
//                 cx="12"
//                 cy="12"
//                 r="10"
//                 stroke="currentColor"
//                 strokeWidth="4"
//               ></circle>
//               <path
//                 className="opacity-75"
//                 fill="currentColor"
//                 d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//               ></path>
//             </svg>
//           ) : (
//             'Sign in'
//           )}
//         </button>
//       </div>
//     </form>
//   </div>
// </div>
<div className="min-h-screen bg-[#121212] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
  <div className="max-w-md w-full space-y-8">
    <div>
      <h2 className="mt-6 text-center text-3xl font-bold text-white font-heading">
        Sign in to your account
      </h2>
      <p className="mt-2 text-center text-gray-400">
        Or{' '}
        <Link to="/register" className="text-white hover:underline">
          create a new account
        </Link>
      </p>
    </div>

    {error && (
      <div className="bg-red-700 text-white p-3 rounded-md mb-3">
        {error}
      </div>
    )}

    <form className="space-y-4" onSubmit={onSubmit}>
      <div className="space-y-3">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={onChange}
            className={`mt-1 block w-full rounded-md px-3 py-1.5 shadow-sm
              bg-[#121212] border ${
                formErrors.email ? "border-red-600" : "border-gray-400"
              } text-gray-100 placeholder-gray-500
              focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-colors`}
          />
          {formErrors.email && (
            <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-300">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={onChange}
            className={`mt-1 block w-full rounded-md px-3 py-1.5 shadow-sm
              bg-[#121212] border ${
                formErrors.password ? "border-red-600" : "border-gray-400"
              } text-gray-100 placeholder-gray-500
              focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-colors`}
          />
          {formErrors.password && (
            <p className="mt-1 text-sm text-red-500">{formErrors.password}</p>
          )}
        </div>
      </div>

      <div>
        <button
          type="submit"
          className={`group relative w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-white bg-[#267d27] hover:bg-[#1f6620] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#267d27] transition-colors ${
            isLoading ? "opacity-75 cursor-not-allowed" : ""
          }`}
          disabled={isLoading}
        >
          {isLoading ? (
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            'Sign in'
          )}
        </button>
      </div>
    </form>
  </div>
</div>


  );
};

export default Login;