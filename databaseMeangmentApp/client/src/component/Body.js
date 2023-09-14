
import React from "react";
import Home from "./Home";
import Login from './Login';
import Signup from "./Signup";
import Applications from "./Applications";
import AddApplication from "./AddApplication";
import ForgotPassword from "./ForgotPassword";

import { useAuth } from "../context/AuthContext";

import '../index.css'

  let component;
    switch(window.location.pathname){
      case "/":
        component = <Home />
        break;
      case "/login":
        component = <Login />
        break;
      case "/forgotPassword":
        component = <ForgotPassword />
        break;
      case "/signup":
        component = <Signup />
        break;
      case "/applications":
        component = <Applications />
        break;
      case "/addApplication":
        component = <AddApplication />
        break;
  }

const Body = () => {
    
    const { currentUser } = useAuth();
    
    return ( 
        component
     );
}
 
export default Body;