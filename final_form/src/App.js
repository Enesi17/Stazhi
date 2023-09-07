//Created by  : Enes Smajli
//Date        : 05/09/23 
//Last update : 14/09/23
//Description : App component, auto-generated, is the component that puts together all other components and also renders

import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Login from "./components/Login";
import About from "./components/About";
import Client from "./components/Client";
import Dashboard from "./components/Dashboard";
import { AuthProvider } from "./context/AuthContext";
import ForgotPassword from "./components/ForgotPassword";

import './index.css'

let navbarVisible = true;
let component;
  switch(window.location.pathname){
    case "/":
      component = <About />
      break;
    case "/signup":
      navbarVisible = false;
      component = <Signup />
      break; 
    case "/login":
      navbarVisible = false;
      component = <Login />
      break;
    case "/client":
        component = <Client />
      break;
    case "/dashboard":
      component = <Dashboard />
      break;
    case "/forgotPassword":
      navbarVisible = false;
      component = <ForgotPassword />
      break;
}

function App() {
  return (
    <div className="App">
      <AuthProvider>
          <div>
          { navbarVisible && <Navbar /> }
          <div className="container">
            <div className="row form-row">
              {component}
            </div>
          </div>
        </div>
    </AuthProvider>
    </div>
  );
}

export default App;