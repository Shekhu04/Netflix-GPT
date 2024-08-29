import React, { useState, useRef } from 'react';
import Header from './Header';
import { checkValidData } from '../utils/validate';

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    // Validate the form data
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
  };

  return (
    <div>
      <Header />
      <div className='absolute'>
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/36a4db5b-dec2-458a-a1c0-662fa60e7473/1115a02b-3062-4dcc-aae0-94028a0dcdff/IN-en-20240820-TRIFECTA-perspective_WEB_eeff8a6e-0384-4791-a703-31368aeac39f_large.jpg"
          alt="logo"
        />
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className='w-3/12 absolute my-36 mx-auto right-0 left-0 p-6 bg-black text-white rounded-md bg-opacity-80 transition-all duration-500 ease-in-out'
      >
        <h1 className='font-bold text-3xl py-3 transition-all duration-300 ease-in-out'>
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </h1>

        {isSignUp && (
          <input
            type="text"
            placeholder="Username"
            className='p-3 my-4 w-full bg-gray-700 transition-opacity duration-300 ease-in-out'
          />
        )}

        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className='p-3 my-4 w-full bg-gray-700 transition-all duration-300 ease-in-out'
        />

        {/* Smooth height animation for Sign Up fields */}
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${isSignUp ? 'max-h-screen' : 'max-h-0'}`}
        >
          {isSignUp && (
            <input
              type="password"
              placeholder="Confirm Password"
              className='p-3 my-4 w-full bg-gray-700 transition-opacity duration-300 ease-in-out'
            />
          )}
        </div>

        <input
          ref={password}
          type="password"
          placeholder="Password"
          className='p-3 my-4 w-full bg-gray-700 transition-all duration-300 ease-in-out'
        />

        <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>

        <button
          className='p-3 my-4 w-full bg-red-700 rounded-lg transition-all duration-300 ease-in-out'
          onClick={handleButtonClick}
        >
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </button>

        <p className="py-6">
          {isSignUp ? 'Already have an account? ' : 'New to Netflix? '}
          <span
            className="text-blue-500 cursor-pointer transition-colors duration-300 ease-in-out hover:text-blue-700"
            onClick={toggleForm}
          >
            {isSignUp ? 'Sign In Now' : 'Sign Up Now'}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
