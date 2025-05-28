import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Register = () => {
  const { register, isAuthenticated, error, clearError } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "jobseeker",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { name, email, password, confirmPassword, role } = formData;

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  const onChange = (e) => {
    clearError();
    setFormErrors({
      ...formErrors,
      [e.target.name]: "",
    });
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const errors = {};

    if (!name.trim()) {
      errors.name = "Name is required";
    }

    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
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

    const result = await register({
      name,
      email,
      password,
      role,
    });

    setIsLoading(false);

    if (result.success) {
      navigate("/dashboard");
    }
  };

  const roleOptions = [
    {
      id: "jobseeker",
      label: "Job Seeker",
      description: "Find jobs at innovative startups",
    },
    {
      id: "founder",
      label: "Founder",
      description: "List your company and post jobs",
    },
    {
      id: "investor",
      label: "Investor",
      description: "Discover promising startups",
    },
  ];

  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full flex justify-center gap-24 rounded-lg p-8">
        {/* Left side: text */}
        <div className="flex flex-col justify-center text-center">
          <h2 className="text-4xl font-bold text-white font-heading">
            Create your account
          </h2>
          <p className="mt-4 text-gray-300 text-lg">
            Or{" "}
            <Link to="/login" className="text-white font-semibold underline">
              sign in to your existing account
            </Link>
          </p>
        </div>

        <div className="max-w-md">
          {error && (
            <div className="bg-red-700 text-white p-3 rounded-md mb-3">
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={onSubmit}>
            <div className="space-y-3">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-300"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={onChange}
                  className={`mt-1 block w-full rounded-md px-3 py-1.5 shadow-sm
            bg-[#121212] border ${
              formErrors.name ? "border-red-600" : "border-gray-400"
            } text-gray-100 placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-colors`}
                />
                {formErrors.name && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300"
                >
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
                  <p className="mt-1 text-sm text-red-500">
                    {formErrors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-300"
                >
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
                  <p className="mt-1 text-sm text-red-500">
                    {formErrors.password}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-300"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={onChange}
                  className={`mt-1 block w-full rounded-md px-3 py-1.5 shadow-sm
            bg-[#121212] border ${
              formErrors.confirmPassword ? "border-red-600" : "border-gray-400"
            } text-gray-100 placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-colors`}
                />
                {formErrors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-500">
                    {formErrors.confirmPassword}
                  </p>
                )}
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-300 mb-2">
                  I am a:
                </h3>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {roleOptions.map((option) => (
                    <div
                      key={option.id}
                      className={`relative border rounded-lg p-3 cursor-pointer transition-all select-none ${
                        role === option.id
                          ? "border-[#267d27] bg-[#267d27]/20"
                          : "border-gray-600 hover:border-gray-400"
                      }`}
                      onClick={() =>
                        onChange({ target: { name: "role", value: option.id } })
                      }
                    >
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="role"
                          id={option.id}
                          value={option.id}
                          checked={role === option.id}
                          onChange={onChange}
                          className="h-4 w-4 text-gray-400 focus:ring-gray-400 border-gray-600"
                        />
                        <label
                          htmlFor={option.id}
                          className="ml-2 block text-sm font-medium text-gray-300"
                        >
                          {option.label}
                        </label>
                      </div>
                      <p className="mt-1 text-xs text-gray-500">
                        {option.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-white bg-[#267d27] hover:bg-[#1f6620] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-colors ${
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
                  "Create Account"
                )}
              </button>
            </div>
          </form>

          <div className="text-center text-sm text-gray-400 mt-5">
            By creating an account, you agree to our{" "}
            <Link to="/about" className="text-gray-400 hover:text-[#1f6620]">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/about" className="text-gray-400 hover:text-[#1f6620]">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
