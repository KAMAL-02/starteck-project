// import { Link } from 'react-router-dom';

// const Footer = () => {
//   const currentYear = new Date().getFullYear();
  
//   return (
//     <footer className="bg-primary-950 text-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//           <div>
//             <h3 className="text-xl font-heading font-bold mb-4">Starteck</h3>
//             <p className="text-gray-400 mb-4">
//               Connecting founders, investors, and talent in the startup ecosystem.
//             </p>
//             <div className="flex space-x-4">
//               <a href="#" className="text-gray-400 hover:text-white">
//                 <span className="sr-only">Twitter</span>
//                 <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
//                 </svg>
//               </a>
//               <a href="#" className="text-gray-400 hover:text-white">
//                 <span className="sr-only">LinkedIn</span>
//                 <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
//                 </svg>
//               </a>
//             </div>
//           </div>
          
//           <div>
//             <h3 className="text-lg font-semibold mb-4">For Founders</h3>
//             <ul className="space-y-2">
//               <li>
//                 <Link to="/register" className="text-gray-400 hover:text-white">
//                   Create Account
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/companies" className="text-gray-400 hover:text-white">
//                   List Your Startup
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/jobs" className="text-gray-400 hover:text-white">
//                   Post a Job
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/about" className="text-gray-400 hover:text-white">
//                   Resource Hub
//                 </Link>
//               </li>
//             </ul>
//           </div>
          
//           <div>
//             <h3 className="text-lg font-semibold mb-4">For Job Seekers</h3>
//             <ul className="space-y-2">
//               <li>
//                 <Link to="/register" className="text-gray-400 hover:text-white">
//                   Create Profile
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/jobs" className="text-gray-400 hover:text-white">
//                   Browse Jobs
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/companies" className="text-gray-400 hover:text-white">
//                   Explore Startups
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/about" className="text-gray-400 hover:text-white">
//                   Career Resources
//                 </Link>
//               </li>
//             </ul>
//           </div>
          
//           <div>
//             <h3 className="text-lg font-semibold mb-4">For Investors</h3>
//             <ul className="space-y-2">
//               <li>
//                 <Link to="/register" className="text-gray-400 hover:text-white">
//                   Create Account
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/companies" className="text-gray-400 hover:text-white">
//                   Discover Startups
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/about" className="text-gray-400 hover:text-white">
//                   Investment Guides
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/about" className="text-gray-400 hover:text-white">
//                   Market Reports
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         </div>
        
//         <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
//           <div className="text-gray-400 text-sm mb-4 md:mb-0">
//             &copy; {currentYear} Starteck. All rights reserved.
//           </div>
//           <div className="flex space-x-6">
//             <Link to="/about" className="text-gray-400 hover:text-white text-sm">
//               About
//             </Link>
//             <Link to="/about" className="text-gray-400 hover:text-white text-sm">
//               Privacy Policy
//             </Link>
//             <Link to="/about" className="text-gray-400 hover:text-white text-sm">
//               Terms of Service
//             </Link>
//             <Link to="/about" className="text-gray-400 hover:text-white text-sm">
//               Contact
//             </Link>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: '#0D0D0D', color: '#E0E0E0' }} className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-sm md:text-base">
          {/* Brand & Social */}
          <div>
            <h3
              className="font-heading font-bold mb-5 text-2xl"
              style={{ color: '#4CAF50' }} // Accent green heading
            >
              Starteck
            </h3>
            <p className="mb-6 text-gray-400 leading-relaxed">
              Connecting founders, investors, and talent in the startup ecosystem.
            </p>
            <div className="flex space-x-6">
              {/* Twitter */}
              <a
                href="#"
                aria-label="Twitter"
                className="text-gray-500 hover:text-green-500 transition-colors duration-300"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a
                href="#"
                aria-label="LinkedIn"
                className="text-gray-500 hover:text-green-500 transition-colors duration-300"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          {/* For Founders */}
          <div>
            <h4 className="text-lg font-semibold mb-5" style={{ color: '#4CAF50' }}>
              For Founders
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/register" className="text-gray-400 hover:text-green-400 transition-colors">
                  Create Account
                </Link>
              </li>
              <li>
                <Link to="/companies" className="text-gray-400 hover:text-green-400 transition-colors">
                  List Your Startup
                </Link>
              </li>
              <li>
                <Link to="/jobs" className="text-gray-400 hover:text-green-400 transition-colors">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-green-400 transition-colors">
                  Resource Hub
                </Link>
              </li>
            </ul>
          </div>

          {/* For Job Seekers */}
          <div>
            <h4 className="text-lg font-semibold mb-5" style={{ color: '#4CAF50' }}>
              For Job Seekers
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/register" className="text-gray-400 hover:text-green-400 transition-colors">
                  Create Profile
                </Link>
              </li>
              <li>
                <Link to="/jobs" className="text-gray-400 hover:text-green-400 transition-colors">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link to="/companies" className="text-gray-400 hover:text-green-400 transition-colors">
                  Explore Startups
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-green-400 transition-colors">
                  Career Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* For Investors */}
          <div>
            <h4 className="text-lg font-semibold mb-5" style={{ color: '#4CAF50' }}>
              For Investors
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/register" className="text-gray-400 hover:text-green-400 transition-colors">
                  Create Account
                </Link>
              </li>
              <li>
                <Link to="/companies" className="text-gray-400 hover:text-green-400 transition-colors">
                  Discover Startups
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-green-400 transition-colors">
                  Investment Guides
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-green-400 transition-colors">
                  Market Reports
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="border-t mt-10 pt-6 flex flex-col md:flex-row justify-between items-center"
          style={{ borderColor: '#1A1A1A' }}
        >
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {currentYear} Starteck. All rights reserved.
          </p>
          <div className="flex space-x-8 text-sm">
            <Link to="/about" className="text-gray-400 hover:text-green-400 transition-colors">
              About
            </Link>
            <Link to="/about" className="text-gray-400 hover:text-green-400 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/about" className="text-gray-400 hover:text-green-400 transition-colors">
              Terms of Service
            </Link>
            <Link to="/about" className="text-gray-400 hover:text-green-400 transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
