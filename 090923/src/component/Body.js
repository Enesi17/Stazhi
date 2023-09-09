import Home from "./Home";
import Signup from "./Signup";
import Navbar from "./Navbar";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Applications from "./Applications"
import AddApplication from "./AddApplication"
import CreateDBForApp from "./CreateDBForApp";
import Client from "./Client";
import ForgotPassword from "./ForgotPassword"
import { useAuth } from "../context/AuthContext";
import '../index.css'

  let navbarVisible = true;

  let component;
    switch(window.location.pathname){
      case "/":
        component = <Home />
        break;
      case "/signup":
        navbarVisible = false;
        component = <Signup />
        break;
      case "/login":
        navbarVisible = false;
        component = <Login />
        break;
      case "/dashboard":
        component = <Dashboard />
        break;
      case "/forgotPassword":
        navbarVisible = false;
        component = <ForgotPassword />
        break;
      case "/applications":
        component = <Applications />
        break;
      case "/addApplication":
        component = <AddApplication />
        break;
      case "/createDB":
        component = <CreateDBForApp />
        break;
      case "/client":
        component = <Client />
  }

const Body = () => {

    const { currentUser } = useAuth();

    return (
        <div>
            { navbarVisible && <Navbar /> }
            <div className="App">
                {component}
            </div>
        </div>
    );
}

export default Body;