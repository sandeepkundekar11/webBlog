import React from 'react';

const ProfileSkeleton = () => {
  return (
    <div className="flex h-screen items-center justify-center  xl:w-2/4 md:w-4/5 w-11/12 m-auto">
      <div className="flex w-full max-w-4xl flex-col items-center rounded-lg bg-white p-8 shadow-md">
        {/* Profile Header */}
        <div className="mb-8 flex items-center space-x-6">
          <div className="h-24 w-24 animate-pulse rounded-full bg-gray-200"></div>
          <div className="flex-1">
            <div className="mb-2 h-6 w-3/4 animate-pulse rounded bg-gray-200"></div>
            <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200"></div>
          </div>
        </div>

        {/* About Section */}
        <div className="mb-8 w-full">
          <div className="mb-4 h-4 w-full animate-pulse rounded bg-gray-200"></div>
          <div className="mb-4 h-4 w-4/5 animate-pulse rounded bg-gray-200"></div>
          <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200"></div>
        </div>

        {/* Actions Section */}
        <div className="w-full">
          <div className="h-12 w-full animate-pulse rounded-lg bg-gray-200"></div>
          <div className="mt-5 h-12 w-full animate-pulse rounded-lg bg-gray-200"></div>
          <div className="mt-5 h-12 w-full animate-pulse rounded-lg bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
