import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </Router>
  );
};

export default Routes;
