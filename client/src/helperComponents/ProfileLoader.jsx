import React from "react";

const ProfileLoader = () => {
  return (
    <div className="flex flex-col bg-gray-100 h-screen p-4 rounded-md pt-20 fixed top-0 left-1/2">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-gray-300 rounded-full animate-pulse"></div>
        <div className="flex flex-col space-y-2">
          <div className="w-32 h-4 bg-gray-300 rounded-md animate-pulse"></div>
          <div className="w-24 h-4 bg-gray-300 rounded-md animate-pulse"></div>
        </div>
      </div>
      <div className="mt-4 flex items-center space-x-4">
        <div className="w-20 h-4 bg-gray-300 rounded-md animate-pulse"></div>
        <div className="w-48 h-4 bg-gray-300 rounded-md animate-pulse"></div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="w-full h-6 bg-gray-300 rounded-md animate-pulse"></div>
        <div className="w-full h-12 bg-gray-300 rounded-md animate-pulse"></div>
        <div className="w-24 h-4 bg-gray-300 rounded-md animate-pulse"></div>
      </div>
      <div className="mt-4 flex justify-end space-x-4">
        <div className="w-20 h-8 bg-gray-300 rounded-md animate-pulse"></div>
        <div className="w-12 h-8 bg-gray-300 rounded-md animate-pulse"></div>
      </div>
      <div className="mt-4 flex flex-wrap">
        <div className="w-36 h-36 mx-4 my-4 bg-gray-300 rounded-md animate-pulse"></div>
        <div className="w-36 h-36 mx-4 my-4 bg-gray-300 rounded-md animate-pulse"></div>
        <div className="w-36 h-36 mx-4 my-4 bg-gray-300 rounded-md animate-pulse"></div>
        <div className="w-36 h-36 mx-4 my-4 bg-gray-300 rounded-md animate-pulse"></div>
      </div>
    </div>
  );
};

export default ProfileLoader;
