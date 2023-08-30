import React from 'react';

const Navbar = () => {
  return ( 
    <nav className="navbar">
      T3-Stazherat
      <div className="links">
        <ul className='menus'>
            <li><a href="/">Home</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/signup">Create Account</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;