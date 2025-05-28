import { Link, useLocation } from 'react-router-dom';

const FounderDashboardNav = () => {
  const location = useLocation();
  
  // Navigation items for the founder dashboard
  const navItems = [
    { name: 'Company Profile', path: '/dashboard/company' },
    { name: 'Manage Jobs', path: '/dashboard/jobs' },
    { name: 'Create Job', path: '/dashboard/jobs/create' },
  ];
  
  return (
<div className="bg-zinc-900 rounded-lg shadow-sm mb-6">
  <div className="flex overflow-x-auto py-3 px-4">
    {navItems.map((item) => (
      <Link
        key={item.path}
        to={item.path}
        className={`whitespace-nowrap px-4 py-2 mr-2 rounded-md text-sm font-medium transition-colors ${
          location.pathname === item.path
            ? 'bg-green-800 text-white'
            : 'text-zinc-300 hover:bg-zinc-800'
        }`}
      >
        {item.name}
      </Link>
    ))}
  </div>
</div>

  );
};

export default FounderDashboardNav;
