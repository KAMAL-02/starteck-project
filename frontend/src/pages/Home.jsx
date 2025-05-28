import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="relative min-h-screen bg-[#121212]">
      <div className="relative bg-[#121212] min-h-screen flex items-center justify-center px-6 md:px-12">
        <div className="max-w-7xl w-full flex flex-col-reverse md:flex-row items-center justify-between gap-10">
          {/* Text Section */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white font-heading leading-tight animate-fadeIn">
              Where Startups Connect with{" "}
              <span className="text-[#00FF9C]">Talent</span> and{" "}
              <span className="text-[#00CC88]">Capital</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-300 max-w-xl animate-fadeIn mx-auto md:mx-0">
              Starteck helps ambitious founders build their teams, secure
              funding, and grow their companies in one unified platform.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4 animate-fadeIn">
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  className="inline-flex items-center justify-center px-8 py-3 rounded-md text-white bg-[#00FF9C] hover:bg-[#00e68c] transition-colors text-base md:text-lg"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="inline-flex items-center justify-center px-8 py-3 rounded-md text-black font-bold bg-[#00FF9C] hover:bg-[#00e68c] transition-colors text-base md:text-lg"
                  >
                    Get Started
                  </Link>
                  <Link
                    to="/about"
                    className="inline-flex items-center justify-center px-8 py-3 border border-white rounded-md text-white hover:bg-white hover:text-black transition-colors text-base md:text-lg"
                  >
                    Learn More
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Image Section */}
          <div className="flex-shrink-0 w-full md:w-[40%] relative">
            <div className="absolute inset-0 bg-gradient-to-l from-[#121212] via-[#121212]/60 to-transparent z-10 rounded-xl"></div>
            <img
              src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Startup Background"
              className="relative z-0 w-full h-80 md:h-96 object-cover rounded-xl shadow-lg"
            />
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center z-20">
          <a href="#features" className="text-white animate-bounce">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-20 bg-[#121212]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[#00FF9C] font-heading sm:text-4xl">
              Everything You Need to Succeed
            </h2>
            <p className="mt-4 text-xl text-[#A0A0A0] max-w-3xl mx-auto">
              Whether you&apos;re a founder, investor, or job seeker, Starteck
              provides the tools and connections you need.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature Card Template */}
            {[
              {
                title: "For Founders",
                description:
                  "Create company profiles, post jobs, and connect with investors all in one place.",
                points: [
                  "Company profile creation",
                  "Job posting management",
                  "Investor visibility",
                ],
                iconColor: "#00FF9C",
              },
              {
                title: "For Investors",
                description:
                  "Discover promising startups, evaluate their metrics, and make informed investment decisions.",
                points: [
                  "Startup discovery",
                  "Company metrics analysis",
                  "Direct founder contact",
                ],
                iconColor: "#00FF9C",
              },
              {
                title: "For Job Seekers",
                description:
                  "Create a profile, browse startup jobs, and get hired by innovative companies.",
                points: [
                  "Professional profile builder",
                  "Startup job search",
                  "Application tracking",
                ],
                iconColor: "#00FF9C",
              },
            ].map(({ title, description, points, iconColor }, index) => (
              <div
                key={index}
                className="bg-[#1E1E1E] rounded-lg p-8 shadow-[0_4px_12px_#00FF9C33] hover:bg-[#181818] transition duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-[#00FF9C33] flex items-center justify-center mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke={iconColor}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#E0E0E0] mb-3">
                  {title}
                </h3>
                <p className="text-[#A0A0A0] mb-6">{description}</p>
                <ul className="space-y-3 mb-6">
                  {points.map((point, i) => (
                    <li key={i} className="flex items-start text-[#E0E0E0]">
                      <svg
                        className="h-6 w-6 text-[#00FF9C] mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="/register"
                  className="inline-flex items-center text-[#00FF9C] hover:text-[#00CC88] transition"
                >
                  Get started
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {/* <section className="py-16 bg-primary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">500+</div>
              <p className="text-gray-300">Registered Startups</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">1,200+</div>
              <p className="text-gray-300">Active Job Listings</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">50M+</div>
              <p className="text-gray-300">Investor Capital</p>
            </div>
          </div>
        </div>
      </section> */}
      <section className="py-16" style={{ backgroundColor: "#121212" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div
                className="text-4xl font-bold mb-2"
                style={{ color: "#E0E0E0" }}
              >
                500+
              </div>
              <p style={{ color: "#A0A0A0" }}>Registered Startups</p>
            </div>
            <div>
              <div
                className="text-4xl font-bold mb-2"
                style={{ color: "#E0E0E0" }}
              >
                1,200+
              </div>
              <p style={{ color: "#A0A0A0" }}>Active Job Listings</p>
            </div>
            <div>
              <div
                className="text-4xl font-bold mb-2"
                style={{ color: "#E0E0E0" }}
              >
                50M+
              </div>
              <p style={{ color: "#A0A0A0" }}>Investor Capital</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" style={{ backgroundColor: "#121212" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-3xl font-bold font-heading sm:text-4xl"
            style={{ color: "#E0E0E0" }} // Light Gray for heading
          >
            Ready to Join the Startup Ecosystem?
          </h2>
          <p
            className="mt-4 text-xl max-w-3xl mx-auto"
            style={{ color: "#A0A0A0", opacity: 0.9 }} // Medium Gray with 90% opacity for paragraph
          >
            Create your free account today and start connecting with the startup
            community.
          </p>
          <div className="mt-10">
            <Link
              to="/register"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md md:text-lg transition-colors"
              style={{
                backgroundColor: "#4CAF50", // Accent Green
                color: "#121212", // Charcoal Black text on button for contrast
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#43A047")
              } // Darker Green on hover
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#4CAF50")
              }
            >
              Sign Up Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
