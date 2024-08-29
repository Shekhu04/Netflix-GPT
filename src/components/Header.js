import React from 'react';

function Header() {
  return (
    <div className="absolute px-20 py-6 z-10 flex items-center bg-gradient-to-b from-black">
      <img
        className="w-44"
        src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png" // Transparent Netflix logo
        alt="Netflix logo"
      />
    </div>
  );
}

export default Header;
