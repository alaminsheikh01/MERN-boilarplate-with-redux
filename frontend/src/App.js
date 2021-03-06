import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import RegisterScreen from "./screens/RegisterSceen";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import Header from "./components/Header";

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={HomeScreen} />
          <Route path="/signup" exact component={RegisterScreen} />
          <Route path="/login" exact component={LoginScreen} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
