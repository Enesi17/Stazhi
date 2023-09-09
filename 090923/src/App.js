
import Body from "./component/Body"
import { AuthProvider } from "./context/AuthContext";
import './index.css'

function App() {
  return (
    <AuthProvider>
      <div>
        <Body />
      </div>
    </AuthProvider>
  );
}

export default App;