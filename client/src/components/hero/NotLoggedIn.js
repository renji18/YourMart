import React from 'react';

const NotLoggedIn = () => {
  return (
    <>
      <section className="text-gray-400 bg-gray-900 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="text-center mb-20">
            <h1 className="sm:text-2xl text-xl font-medium title-font text-white mb-4">What to expect ?</h1>
            <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-300 text-opacity-70">A common place for anything and everything that you may want to buy. Why go out when we deliver everything at your door steps?</p>
            <div className="flex mt-6 justify-center">
              <div className="w-16 h-1 rounded-full bg-yellow-500 inline-flex"></div>
            </div>
          </div>
          <div className="flex flex-wrap group sm:-m-4  -mx-4 -mb-10 -mt-4 md:space-y-4 space-y-10">
            <div className="p-4 md:w-1/3 mt-4 group-hover:blur-[2px] duration-500 group-hover:scale-[0.85] shadow-xl hover:shadow-2xl hover:shadow-slate-600 shadow-slate-800 hover:!scale-100 hover:!blur-none  hover:cursor-pointer flex flex-col text-center items-center">
              <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-gray-800 text-yellow-400 mb-5 flex-shrink-0">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-12 h-12" viewBox="0 0 24 24">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <div className="flex-grow">
                <h2 className="text-white text-xl title-font font-medium mb-3">Log In</h2>
                <p className="leading-relaxed text-base">Log in to your mart to access all features and see all the offers based on your subscriptions or buying history. Helps us to provide you with a better experience.</p>
              </div>
            </div>
            <div className="p-4 md:w-1/3 group-hover:blur-[2px] duration-500 group-hover:scale-[0.85] hover:shadow-2xl hover:shadow-slate-600 shadow-xl shadow-slate-800 hover:!scale-100 hover:!blur-none hover:bg-gray-800/25 hover:cursor-pointer flex flex-col text-center items-center">
              <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-gray-800 text-yellow-400 mb-5 flex-shrink-0">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-12 h-12" viewBox="0 0 24 24">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
              </div>
              <div className="flex-grow">
                <h2 className="text-white text-xl title-font font-medium mb-3">I'm Just Here To Browse</h2>
                <p className="leading-relaxed text-base">Don't want to provide your details yet? No worries, we got you covered for that, browse around for various items and see what you like. Remember, you won't be able to make a purchase without logging in.</p>
              </div>
            </div>
            <div className="p-4 md:w-1/3 group-hover:blur-[2px] duration-500 group-hover:scale-[0.85] hover:shadow-2xl hover:shadow-slate-600 shadow-xl shadow-slate-800 hover:!scale-100 hover:!blur-none hover:cursor-pointer flex flex-col text-center items-center">
              <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-gray-800 text-yellow-400 mb-5 flex-shrink-0">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-12 h-12" viewBox="0 0 24 24">
                  <circle cx="12" cy="5" r="3"></circle>
                  <path d="M12 22V8M5 12H2a10 10 0 0020 0h-3"></path>
                </svg>
              </div>
              <div className="flex-grow">
                <h2 className="text-white text-xl title-font font-medium mb-3">Register</h2>
                <p className="leading-relaxed text-base">Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine, ramps microdosing banh mi pug VHS try-hard.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default NotLoggedIn;
