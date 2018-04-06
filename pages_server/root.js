import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import ToggleExample from "../../KITT/src/components/toggle/toggle.visualTest.js";
import EmptyStateExample from "../../KITT/src/components/empty-state/empty-state.layoutTest.js";

const Root = (props) => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ToggleExample} />
        <Route path="/toggle" component={ToggleExample} />
        <Route path="/empty-state" component={EmptyStateExample} />
      </Switch>
    </Router>
  );
};

export default Root;
