//Created by  : Enes Smajli 
//Date        : 05/09/23
//Description : App component, auto-generated, is the component that puts together all other
//              components and also renders

import Login from "./components/Login";
import "./index.css"
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import About from "./components/About";

let component;
  switch(window.location.pathname){
    case "/":
      component = <About />
      break;
    case "/login":
      component = <Login />
      break;
    case "/signup":
      component = <Signup />
      break;
  }

function App() {
  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row form-row">
            {component}
        </div>
      </div>
    </div>
  );
}

export default App;

