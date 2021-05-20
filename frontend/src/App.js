import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import RegisterScreen from "./screens/RegisterSceen";
import Header from "./components/Header";

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <Route path="/signup" exact component={RegisterScreen} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
