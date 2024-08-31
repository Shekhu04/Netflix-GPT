import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../utils/firebase';
import { signOut } from "firebase/auth";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { addUser,removeUser } from '../utils/userSlice';
import { NETFLIXLOGO, SUPPORTED_LANGUAGES, USERICON } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';


function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);
    const showGptSearch = useSelector((store) => store.gpt.showGptSearch)
    const handleSignOut = () => {
        signOut(auth).then(() => {
        
          }).catch((error) => {
            navigate("/error")
          });
    }

    useEffect(()=>{
       const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
              const {uid,email,displayName} = user;
              dispatch(addUser({uid:uid,email:email,displayName:displayName}));
         
              navigate("/browse");
            } else {
              dispatch(removeUser());
              navigate("/");
            }
          });

          //Unsubscribe when component unmounts
          return () => unsubscribe();
          
    },[])

    const handleGptSearchClick = () => {
      //Toggle GPT Search
      dispatch(toggleGptSearchView());
    }

    const handleLanguageChange = (e) => {
      //console.log(e.target.value);
      dispatch(changeLanguage(e.target.value));
    }

  return (
    <div className="absolute w-screen px-20 py-6 z-10 flex items-center bg-gradient-to-b from-black to-transparent justify-between">
      {/* Netflix Logo */}
      <img
        className="w-44"
        src={NETFLIXLOGO}
        alt="Netflix logo"
      />
     
     <div>
     
      </div>

      {/* User Icon and Sign Out Button */}
      {user && (
      <div className="flex items-center space-x-3">

         {showGptSearch && (
          <select 
          className="p-2 m-2 bg-gray-900 text-white"
          onChange={handleLanguageChange}>
          {SUPPORTED_LANGUAGES.map((lang) => (
          <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>
        ))}
      </select>)}

        <button className='py-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded-lg' onClick={handleGptSearchClick}>
          {showGptSearch ? "Homepage" : "GPT Search"}
        </button>
        <img
          className="w-10 h-10 object-cover"
          alt="User Icon"
          src={USERICON}
        />
        <button 
        onClick={handleSignOut}
        className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-sm transition duration-300 ease-in-out">
          Sign Out
        </button>
      </div>
      )}
    </div>
  );
}

export default Header;
