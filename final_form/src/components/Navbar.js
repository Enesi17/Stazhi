//Created by  : Enes Smajli 
//Date        : 05/09/23
//Last Update : 13/09/23
//Description : Navbar component, makes it easy to navigate through the options of the page

import React from 'react';
import {Button} from 'react-bootstrap'
import "../index.css"
import LogOut from './LogOut';
import Login from './Login';
import { useAuth } from "../context/AuthContext";

const Navbar = () => {

  const {currentUser} = useAuth();

  return (
    <div id='menu'>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">T3-Stazherat</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a className="nav-link" href="/">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/signup">Create Account</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/options">Opsionet</a>
          </li>
          { !currentUser && <li className="nav-item"><Button href="/login">Login</Button></li> }
          { currentUser && <li className="nav-item"><LogOut /></li> }
        
        </ul>
      </div>
    </nav>
    </div>
  );
}

export default Navbar;
