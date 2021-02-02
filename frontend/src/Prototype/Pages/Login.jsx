import React from 'react';

import logoTextImage from '@/assets/logo_text.png';

const Login = () => {
  return (
    <div className="flex flex-col min-h-screen justify-between items-center bg-blue-700">
      <div className="flex-initial h-px"></div>
      <div className="flex flex-col items-center justify-center">
        <div className="flex justify-center items-center h-32 -ml-4">
          <img className="object-cover" src={logoTextImage} alt="logo" />
        </div>
        <form
          className="bg-white text-center rounded py-8 px-10 shadow"
          style={{ maxWidth: '420px' }}
        >
          <h1 className="text-lg text-gray-600 text-semibold mb-7">Log in to CxTasks</h1>
          <div>
            <label for="email" className="sr-only">
              Email
            </label>
            <input
              id="email"
              className="w-full rounded py-1 px-4 mb-7 bg-gray-100 border-gray-300 border-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:z-10 focus:bg-white transition ease-out duration-200"
              type="email"
              placeholder="Email"
            />
          </div>
          <div>
            <label for="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              className="w-full rounded py-1 px-4 mb-7 bg-gray-100 border-gray-300 border-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:z-10 focus:bg-white transition ease-out duration-200"
              type="pasword"
              placeholder="Password"
            />
          </div>
          <button className="flex items-center justify-center rounded bg-blue-600 text-white text-md font-medium px-4 py-1 cursor-pointer w-full mb-7 transition ease-out duration-200 focus:outline-none focus:bg-blue-700 hover:bg-blue-500 hover:text-white group ">
            Login
          </button>
          <div className="text-blue-600 text-sm">
            <a className="hover:underline hover:text-blue-500" href="/">
              Cann't log in?
            </a>
            <div className="inline-block mx-1">
              <svg height="16" width="16" className="fill-current text-gray-300">
                <circle cx="8" cy="11" r="2" stroke="black" strokeWidth="0" />
              </svg>
            </div>
            <a className="hover:underline hover:text-blue-500" href="/">
              Sign up for the account
            </a>
          </div>
        </form>
      </div>
      <div className="flex items-center justify-center text-white text-sm h-16">
        <a className="hover:underline" href="/">
          Privacy policy
        </a>
        <div className="inline-block mx-1">
          <svg height="20" width="16" className="fill-current text-gray-100">
            <circle cx="8" cy="11" r="2" stroke="black" strokeWidth="0" />
          </svg>
        </div>
        <a className="hover:underline" href="/">
          Term of use
        </a>
      </div>
    </div>
  );
};
export default Login;
