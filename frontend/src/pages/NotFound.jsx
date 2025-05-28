import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-zinc-900 pt-24">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
    <h1 className="text-6xl font-bold text-zinc-100 mb-4">404</h1>
    <h2 className="text-2xl font-semibold text-zinc-300 mb-4">Page Not Found</h2>
    <p className="text-zinc-400 mb-8">
      The page you're looking for doesn't exist or has been moved.
    </p>
    <Link
      to="/"
      className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-800 hover:bg-green-700 transition-colors"
    >
      Go Home
    </Link>
  </div>
</div>

  );
};

export default NotFound;