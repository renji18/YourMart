import React from 'react';

const LoggedInHeader = () => {
  return (
    <>
      <header className="text-gray-400 bg-gray-900 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a href='/' className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-yellow-500 rounded-full" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 text-3xl">Your Mart</span>
          </a>
          <nav className="flex lg:w-2/5 group flex-wrap items-center text-base md:ml-auto">
            <a href='/' className="mr-5 hover:text-white text-lg group-hover:scale-[0.85] hover:!scale-100">Home</a>
            <a href='/cart' className="hover:text-white text-lg mr-5 group-hover:scale-[0.85] hover:!scale-100">Cart</a>
            <a href='/user' className="hover:text-white text-lg group-hover:scale-[0.85] hover:!scale-100">My Info</a>
          </nav>
        </div>
      </header>
    </>
  );
}

export default LoggedInHeader;
