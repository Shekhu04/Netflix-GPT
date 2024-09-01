import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../utils/firebase';
import { signOut } from "firebase/auth";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { addUser, removeUser } from '../utils/userSlice';
import { NETFLIXLOGO, SUPPORTED_LANGUAGES, USERICON } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Successfully signed out
      })
      .catch((error) => {
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid, email, displayName }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="absolute w-full px-4 py-3 md:px-8 md:py-4 lg:px-20 lg:py-6 z-10 flex flex-col md:flex-row items-center justify-between bg-gradient-to-b from-black to-transparent">
      {/* Netflix Logo */}
      <img
        className="w-28 md:w-36 lg:w-44 cursor-pointer mb-2 md:mb-0"
        src={NETFLIXLOGO}
        alt="Netflix logo"
        onClick={() => navigate("/")}
      />

      {/* Language Selector and Buttons */}
      
      <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
        {/* Language Selector (Show only if GPT search is toggled) */}
        {showGptSearch && (
          <select
            className="p-2 w-full md:w-auto bg-gray-800 text-white text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
            onChange={handleLanguageChange}
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.identifier} value={lang.identifier}>
                {lang.name}
              </option>
            ))}
          </select>
        )}

        {/* GPT Search Button */}
        <button
          className="py-2 px-4 w-full md:w-auto bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-sm rounded-md shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out"
          onClick={handleGptSearchClick}
        >
          {showGptSearch ? "Homepage" : "GPT Search"}
        </button>

        {/* User Section (Icon and Sign Out Button) */}
        {user && (
          <div className="flex items-center space-x-3">
            <img
              className="w-8 h-8 md:w-10 md:h-10 object-cover rounded-sm"
              alt="User Icon"
              src={USERICON}
            />
            <button
              onClick={handleSignOut}
              className="text-white w-full md:w-auto bg-gradient-to-r from-red-500 to-pink-600 px-4 py-2 rounded-md shadow-lg transform hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out"
            >
              Sign Out
            </button>
          </div>
        )}
      
      </div>
    </div>
  );
}

export default Header;
