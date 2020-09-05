import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Nav from "./components/Nav";

import Home from "./pages/Home";
import Authors from "./pages/Authors";

import "./styles.css";

export default function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        
        {/* the content */}
        {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/authors">
            <Authors />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
