
import React from "react";
import Body from "./component/Body"
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <div>
         <Body/>
      </div>
    </AuthProvider>
  );
}

export default App;
