import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import examples from "./examplesLoader.js"

const Root = (props) => {
  return (
    <Router>
      <Switch>
        {Object.keys(examples).map((item, i) => (
            <Route path={"/"+item} component={examples[item]}/>
        ))}
      </Switch>
    </Router>
  );
};

export default Root;
