import React from 'react'
import styled from 'styled-components'

const ListItemWrapper = styled.li`
  font-size: 4em;
  border: 1px solid black;
  text-decoration: none;
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
  color: #111;
`

const renderChildren = children => {
  return children.map(child => <ListItemWrapper>{child}</ListItemWrapper>)
}

class Split extends React.Component {
  render () {
    return <ul>{renderChildren(this.props.children)}</ul>
  }
}

export default Split
