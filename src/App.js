import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./Login";
import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";
import MainPage from "./MainPage";

const App = () => {
  return (
      <AuthProvider>
        <Router>
          <div>
            <PrivateRoute exact path="/" component={MainPage} />
            <Route exact path="/login" component={Login} />
          </div>
        </Router>
      </AuthProvider>
  );
};

export default App;