const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <h1 className="text-4xl md:text-6xl font-bold text-red-500 mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">Page Not Found</h2>
      <p className="text-gray-400 text-center mb-8">The page you're looking for doesn't exist or has been moved.</p>
      <a
        href="/"
        className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
      >
        Go Back Home
      </a>
    </div>
  );
};

export default ErrorPage;