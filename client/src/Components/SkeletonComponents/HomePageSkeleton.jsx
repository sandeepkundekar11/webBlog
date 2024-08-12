import React from 'react';

const HomePageSkeleton = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <div className="h-56 w-full animate-pulse bg-gray-300"></div>

      {/* Profile Info Section */}
      <div className="mx-auto mt-6 w-full max-w-3xl px-4">
        <div className="flex items-center space-x-4">
          <div className="h-16 w-16 animate-pulse rounded-full bg-gray-300"></div>
          <div className="flex-1">
            <div className="h-4 w-1/3 animate-pulse rounded bg-gray-300"></div>
            <div className="mt-2 h-4 w-1/2 animate-pulse rounded bg-gray-300"></div>
          </div>
        </div>
      </div>

      {/* Blog Card Section */}
      <div className="mx-auto mt-8 w-full max-w-3xl space-y-4 px-4">
        {[1, 2].map((_, index) => (
          <div key={index} className="animate-pulse rounded-lg bg-white p-4 shadow-md">
            <div className="h-4 w-2/3 animate-pulse rounded bg-gray-300"></div>
            <div className="mt-2 h-3 w-1/4 animate-pulse rounded bg-gray-300"></div>
            <div className="mt-4 h-4 w-full animate-pulse rounded bg-gray-300"></div>
            <div className="mt-2 h-4 w-5/6 animate-pulse rounded bg-gray-300"></div>
            <div className="mt-2 h-4 w-4/5 animate-pulse rounded bg-gray-300"></div>
            <div className="mt-4 h-4 w-1/3 animate-pulse rounded bg-gray-300"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePageSkeleton;
