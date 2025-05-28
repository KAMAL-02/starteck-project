import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';

// Context
import { AuthProvider } from './context/AuthContext';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/routing/ProtectedRoute';
import RoleRoute from './components/routing/RoleRoute';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/dashboard/Dashboard';
import JobList from './pages/jobs/JobList';
import JobDetail from './pages/jobs/JobDetail';
import CompanyList from './pages/companies/CompanyList';
import CompanyDetail from './pages/companies/CompanyDetail';
import NotFound from './pages/NotFound';

// Dashboard Pages
import MyCompany from './pages/dashboard/founder/MyCompany';
import CreateCompany from './pages/dashboard/founder/CreateCompany';
import ManageJobs from './pages/dashboard/founder/ManageJobs';
import CreateJob from './pages/dashboard/founder/CreateJob';
import EditJob from './pages/dashboard/founder/EditJob';
import JobApplications from './pages/dashboard/founder/JobApplications';
import InvestorDashboard from './pages/dashboard/investor/InvestorDashboard';
import JobSeekerDashboard from './pages/dashboard/jobseeker/JobSeekerDashboard';
import MyApplications from './pages/dashboard/jobseeker/MyApplications';
import Profile from './pages/dashboard/Profile';

// Set base URL for axios
axios.defaults.baseURL = 'https://starteck-backend.vercel.app/api';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    setTimeout(() => setIsLoading(false), 800);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#121212]">
  <div className="flex flex-col items-center">
    <div className="relative w-32 h-32">
      <div className="absolute inset-0 border-4 border-t-green-400 border-r-green-400 border-transparent rounded-full animate-spin"></div>
      <div className="absolute inset-0 flex items-center justify-center text-white font-bold">
        <span className="text-3xl font-heading">S</span>
      </div>
    </div>
    <p className="mt-4 text-white font-heading text-xl">Starteck</p>
  </div>
</div>

    );
  }

  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow bg-gray-50">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/jobs" element={<JobList />} />
              <Route path="/jobs/:id" element={<JobDetail />} />
              <Route path="/companies" element={<CompanyList />} />
              <Route path="/companies/:id" element={<CompanyDetail />} />

              {/* Protected Routes */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } 
              />

              {/* Founder Routes */}
              <Route 
                path="/dashboard/company" 
                element={
                  <RoleRoute role="founder">
                    <MyCompany />
                  </RoleRoute>
                } 
              />
              <Route 
                path="/dashboard/company/create" 
                element={
                  <RoleRoute role="founder">
                    <CreateCompany />
                  </RoleRoute>
                } 
              />
              <Route 
                path="/dashboard/jobs" 
                element={
                  <RoleRoute role="founder">
                    <ManageJobs />
                  </RoleRoute>
                } 
              />
              <Route 
                path="/dashboard/jobs/create" 
                element={
                  <RoleRoute role="founder">
                    <CreateJob />
                  </RoleRoute>
                } 
              />
              <Route 
                path="/dashboard/jobs/edit/:id" 
                element={
                  <RoleRoute role="founder">
                    <EditJob />
                  </RoleRoute>
                } 
              />
              <Route 
                path="/dashboard/jobs/applications/:id" 
                element={
                  <RoleRoute role="founder">
                    <JobApplications />
                  </RoleRoute>
                } 
              />

              {/* Investor Routes */}
              <Route 
                path="/dashboard/investor" 
                element={
                  <RoleRoute role="investor">
                    <InvestorDashboard />
                  </RoleRoute>
                } 
              />

              {/* Job Seeker Routes */}
              <Route 
                path="/dashboard/jobseeker" 
                element={
                  <RoleRoute role="jobseeker">
                    <JobSeekerDashboard />
                  </RoleRoute>
                } 
              />
              <Route 
                path="/dashboard/applications" 
                element={
                  <RoleRoute role="jobseeker">
                    <MyApplications />
                  </RoleRoute>
                } 
              />

              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
