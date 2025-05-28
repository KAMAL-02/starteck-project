import { Link } from 'react-router-dom';

const About = () => {
  return (
    // <div className="min-h-screen bg-gray-50 pt-24">
    //   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    //     {/* Hero Section */}
    //     <div className="text-center mb-16">
    //       <h1 className="text-4xl font-bold text-primary-950 font-heading mb-4">
    //         About Starteck
    //       </h1>
    //       <p className="text-xl text-gray-600 max-w-3xl mx-auto">
    //         Connecting founders, investors, and talent to build the next generation of innovative companies.
    //       </p>
    //     </div>

    //     {/* Mission Section */}
    //     <div className="bg-white rounded-lg shadow-card p-8 mb-12">
    //       <h2 className="text-2xl font-bold text-primary-950 mb-4">Our Mission</h2>
    //       <p className="text-gray-600 mb-6">
    //         Starteck aims to streamline the startup ecosystem by providing a unified platform where:
    //       </p>
    //       <ul className="space-y-4 text-gray-600">
    //         <li className="flex items-start">
    //           <span className="text-accent-500 mr-2">•</span>
    //           Founders can showcase their companies and find top talent
    //         </li>
    //         <li className="flex items-start">
    //           <span className="text-accent-500 mr-2">•</span>
    //           Investors can discover promising startups and make informed decisions
    //         </li>
    //         <li className="flex items-start">
    //           <span className="text-accent-500 mr-2">•</span>
    //           Job seekers can find exciting opportunities at innovative companies
    //         </li>
    //       </ul>
    //     </div>

    //     {/* Features Grid */}
    //     <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
    //       <div className="bg-white rounded-lg shadow-card p-6">
    //         <h3 className="text-xl font-semibold text-primary-950 mb-4">For Founders</h3>
    //         <ul className="space-y-3 text-gray-600">
    //           <li>Company profile creation</li>
    //           <li>Job posting management</li>
    //           <li>Applicant tracking</li>
    //           <li>Investor visibility</li>
    //         </ul>
    //       </div>

    //       <div className="bg-white rounded-lg shadow-card p-6">
    //         <h3 className="text-xl font-semibold text-primary-950 mb-4">For Investors</h3>
    //         <ul className="space-y-3 text-gray-600">
    //           <li>Startup discovery</li>
    //           <li>Company metrics</li>
    //           <li>Growth tracking</li>
    //           <li>Direct founder contact</li>
    //         </ul>
    //       </div>

    //       <div className="bg-white rounded-lg shadow-card p-6">
    //         <h3 className="text-xl font-semibold text-primary-950 mb-4">For Job Seekers</h3>
    //         <ul className="space-y-3 text-gray-600">
    //           <li>Profile creation</li>
    //           <li>Job search & filtering</li>
    //           <li>Application tracking</li>
    //           <li>Company research</li>
    //         </ul>
    //       </div>
    //     </div>

    //     {/* CTA Section */}
    //     <div className="bg-primary-950 text-white rounded-lg shadow-card p-12 text-center">
    //       <h2 className="text-3xl font-bold mb-4">Join the Ecosystem</h2>
    //       <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
    //         Whether you're building a startup, looking to invest, or seeking your next opportunity, Starteck has the tools you need to succeed.
    //       </p>
    //       <Link
    //         to="/register"
    //         className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-950 bg-white hover:bg-gray-100 transition-colors"
    //       >
    //         Get Started
    //       </Link>
    //     </div>
    //   </div>
    // </div>
    <div className="min-h-screen bg-[#121212] pt-24 text-gray-300">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Hero Section */}
    <div className="text-center mb-16">
      <h1 className="text-4xl font-bold text-white font-heading mb-4">
        About Starteck
      </h1>
      <p className="text-xl text-gray-400 max-w-3xl mx-auto">
        Connecting founders, investors, and talent to build the next generation of innovative companies.
      </p>
    </div>

    {/* Mission Section */}
    <div className="bg-[#1a1a1a] rounded-lg shadow-md border border-[#2a2a2a] p-8 mb-12">
      <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
      <p className="text-gray-400 mb-6">
        Starteck aims to streamline the startup ecosystem by providing a unified platform where:
      </p>
      <ul className="space-y-4 text-gray-400">
        <li className="flex items-start">
          <span className="text-[#267d27] mr-2">•</span>
          Founders can showcase their companies and find top talent
        </li>
        <li className="flex items-start">
          <span className="text-[#267d27] mr-2">•</span>
          Investors can discover promising startups and make informed decisions
        </li>
        <li className="flex items-start">
          <span className="text-[#267d27] mr-2">•</span>
          Job seekers can find exciting opportunities at innovative companies
        </li>
      </ul>
    </div>

    {/* Features Grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
      {[
        {
          title: 'For Founders',
          items: [
            'Company profile creation',
            'Job posting management',
            'Applicant tracking',
            'Investor visibility',
          ],
        },
        {
          title: 'For Investors',
          items: [
            'Startup discovery',
            'Company metrics',
            'Growth tracking',
            'Direct founder contact',
          ],
        },
        {
          title: 'For Job Seekers',
          items: [
            'Profile creation',
            'Job search & filtering',
            'Application tracking',
            'Company research',
          ],
        },
      ].map((section) => (
        <div
          key={section.title}
          className="bg-[#1a1a1a] rounded-lg shadow-md border border-[#2a2a2a] p-6"
        >
          <h3 className="text-xl font-semibold text-white mb-4">
            {section.title}
          </h3>
          <ul className="space-y-3 text-gray-400">
            {section.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    {/* CTA Section */}
    <div className="bg-[#1f1f1f] pb-3 text-white rounded-lg shadow-md p-12 text-center border border-[#2a2a2a]">
      <h2 className="text-3xl font-bold mb-4">Join the Ecosystem</h2>
      <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
        Whether you&apos;re building a startup, looking to invest, or seeking your next opportunity, Starteck has the tools you need to succeed.
      </p>
      <Link
        to="/register"
        className="inline-flex items-center px-8 py-3 rounded-md text-base font-medium text-white bg-[#267d27] hover:bg-[#2b962c] focus:outline-none focus:ring-2 focus:ring-[#267d27] transition"
      >
        Get Started
      </Link>
    </div>
  </div>
</div>

  );
};

export default About;