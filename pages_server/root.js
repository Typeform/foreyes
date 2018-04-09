import React from "react";
import examples from './componentsWithExamplePages.js'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

const Root = (props) => {
  return (
    <Router>
      <Switch>
        {Object.keys(examples).map((item, i) => (<Route key="item" path={"/"+item} component={examples[item]}/>))}
      </Switch>
    </Router>
  );
};

export default Root;
