import React from 'react';

const ScreenNotAvailable = () => {
    return (
        <div className="flex h-screen w-screen items-center justify-center bg-yellow-100">
            <div className="flex h-full max-h-screen w-full max-w-md flex-col items-center justify-center rounded-lg border border-yellow-300 bg-white p-8 shadow-lg">
                <h1 className="mb-4 text-3xl font-bold text-gray-800">Oops! Not Available</h1>
                <p className="mb-6 text-center text-gray-600">
                    This page is not available on your current screen size. Please try on a larger device with a screen width greater than 500px.
                </p>
                <p className="mb-6 text-center text-gray-600">
                    Thank you for visiting this page. We appreciate your patience!
                </p>
                <a 
                    href="/" 
                    className="rounded-lg bg-red-500 px-6 py-3 text-white shadow-md transition duration-300 hover:bg-red-600"
                >
                    Return Home
                </a>
            </div>
        </div>
    );
};

export default ScreenNotAvailable;
