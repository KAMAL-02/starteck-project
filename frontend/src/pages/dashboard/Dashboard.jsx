import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      // Redirect based on role
      switch (user.role) {
        case 'founder':
          navigate('/dashboard/company');
          break;
        case 'investor':
          navigate('/dashboard/investor');
          break;
        case 'jobseeker':
          navigate('/dashboard/jobseeker');
          break;
        default:
          // Default dashboard
          break;
      }
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gray-100 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Redirecting to your dashboard...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;