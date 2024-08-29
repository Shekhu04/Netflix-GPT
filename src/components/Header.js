import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../utils/firebase';
import { signOut } from "firebase/auth";
import { useSelector } from 'react-redux';

function Header() {
    const navigate = useNavigate();
    const user = useSelector((store) => store.user);
    const handleSignOut = () => {
        signOut(auth).then(() => {
            navigate("/");
          }).catch((error) => {
            navigate("/error")
          });
    }
  return (
    <div className="absolute w-screen px-20 py-6 z-10 flex items-center bg-gradient-to-b from-black to-transparent justify-between">
      {/* Netflix Logo */}
      <img
        className="w-44"
        src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
        alt="Netflix logo"
      />

      {/* User Icon and Sign Out Button */}
      {user && (
      <div className="flex items-center space-x-3">
        <img
          className="w-10 h-10 object-cover"
          alt="User Icon"
          src="https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg"
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
