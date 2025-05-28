import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  
  // Check if we're on the home page
  const isHomePage = location.pathname === '/';
  
  // Update scroll state
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Classes for transparent vs. solid navbar
  const navbarClasses = isHomePage && !isScrolled 
  ? 'fixed w-full z-50 transition-all duration-300 bg-transparent'
  : 'fixed w-full z-50 transition-all duration-300 bg-[#121212] shadow-lg';
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  const handleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };
  
  // Close dropdowns when clicking anywhere else
  useEffect(() => {
    const closeDropdowns = () => {
      setProfileDropdownOpen(false);
    };
    
    document.addEventListener('click', closeDropdowns);
    return () => document.removeEventListener('click', closeDropdowns);
  }, []);
  
  return (
    <nav className={navbarClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-white font-heading">
                Starteck
              </span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link to="/" className="text-white hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium">
              Home
            </Link>
            <Link to="/jobs" className="text-white hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium">
              Jobs
            </Link>
            <Link to="/companies" className="text-white hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium">
              Companies
            </Link>
            <Link to="/about" className="text-white hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium">
              About
            </Link>
            
            {!isAuthenticated ? (
              // <div className="flex space-x-2 ml-4">
              //   <Link to="/login" className="bg-transparent border border-white text-white hover:bg-white hover:text-primary-950 px-4 py-2 rounded-md text-sm font-medium transition-colors">
              //     Log In
              //   </Link>
              //   <Link to="/register" className="bg-accent-500 text-white hover:bg-accent-600 px-4 py-2 rounded-md text-sm font-medium transition-colors">
              //     Sign Up
              //   </Link>
              // </div>
              <div className="flex space-x-2 ml-4">
  <Link
    to="/login"
    className="bg-[#4CAF50] border border-[#0f3d0f] text-black hover:bg-[#36b336] px-4 py-2 rounded-md text-sm font-medium transition-colors"
  >
    Log In
  </Link>
  <Link
    to="/register"
    className="bg-[#4CAF50] text-black hover:bg-[#36b336] px-4 py-2 rounded-md text-sm font-medium transition-colors"
  >
    Sign Up
  </Link>
</div>

            ) : (
              <div className="relative ml-4" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={handleProfileDropdown}
                  className="flex items-center space-x-2 text-white focus:outline-none"
                >
                  <div className="w-8 h-8 rounded-full bg-secondary-600 flex items-center justify-center">
                    <span className="font-medium text-xs text-white">
                      {user?.name?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  </div>
                  <span>{user?.name || 'User'}</span>
                </button>
                
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 py-2 bg-[#121212] rounded-md shadow-xl z-20">
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-200"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-200"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-200"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-green-400 focus:outline-none"
            >
              <svg
                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-primary-950 border-t border-primary-800`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-green-400"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/jobs"
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-green-400"
            onClick={() => setIsOpen(false)}
          >
            Jobs
          </Link>
          <Link
            to="/companies"
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-green-400"
            onClick={() => setIsOpen(false)}
          >
            Companies
          </Link>
          <Link
            to="/about"
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-green-400"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          
          {!isAuthenticated ? (
            <div className="pt-4 pb-3 border-t border-primary-800">
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-green-400"
                onClick={() => setIsOpen(false)}
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="block px-3 py-2 rounded-md text-base font-medium text-accent-500 hover:text-green-400"
                onClick={() => setIsOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="pt-4 pb-3 border-t border-primary-800">
              <div className="flex items-center px-3">
                <div className="w-10 h-10 rounded-full bg-secondary-600 flex items-center justify-center">
                  <span className="font-medium text-white">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-white">{user?.name}</div>
                  <div className="text-sm font-medium text-gray-400">{user?.email}</div>
                </div>
              </div>
              <div className="mt-3 space-y-1 bg-[#121212">
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white bg-[#121212] hover:text-green-400"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-green-400"
                  onClick={() => setIsOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-white hover:text-green-400"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;