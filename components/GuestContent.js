import React from "react";

const GuestContent = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-3xl tablet:text-6xl laptop:text-6xl p-1 tablet:p-2 text-bold w-full text-center">
        Welcome to our site!
      </h1>
      <p className="mt-5 text-xl text-center">
        Please log in to see the content.
      </p>
            <button
        className="mt-5 bg-white text-black py-3 px-6 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300"
        onClick={() => window.location.href = '/login'}
        >
        Login
        </button>

    </div>
  );
};

export default GuestContent;
