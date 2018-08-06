import React from 'react'
import Split from '../src/components/split'
import Button from '../src/components/button'
class SplitExample extends React.Component {
  render () {
    return (
      <Split>
        <p>Hello, these are some added children</p>
        <p>
          <Button>Click me!</Button>
        </p>
      </Split>
    )
  }
}
export default SplitExample
