//Created by  : Enes Smajli
//Date        : 05/09/23 
//Last update : 11/09/23
//Description : App component, auto-generated, is the component that puts together all other components and also renders

import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Login from "./components/Login";
import About from "./components/About";
import Tables from "./components/Tables";
import Options from "./components/Options";
import { AuthProvider } from "./context/AuthContext";
import ForgotPassword from "./components/ForgotPassword";
import './index.css'

let component;
  switch(window.location.pathname){
    case "/":
      component = <About />
      break;
    case "/signup":
      component = <Signup />
      break; 
    case "/login":
      component = <Login />
      break;
    case "/tables":
        component = <Tables />
      break;
    case "/options":
      component = <Options />
      break;
    case "/forgotPassword":
      component = <ForgotPassword />
      break;
}

function App() {
  return (
    <div className="App">
      <AuthProvider>
      <div>
        <Navbar />
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