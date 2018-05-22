import React from 'react'
import examples from './componentsWithExamplePages.js'
import ComponentExample from './componentExample.js'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

const Root = (props) => {
  return (
    <Router>
      <Switch>
        {Object.keys(examples).map((item, i) => (<Route key='item' path={'/' + item} render={() =>
          <ComponentExample
            possibleAttributesValues={examples[item].combinations}
            reactComponent={examples[item].component}
          />
        } />))}
      </Switch>
    </Router>
  )
}

export default Root
