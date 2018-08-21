import React from 'react'
import styled from 'styled-components'

const buttonSizes = {
  small: `font-size:1em`,
  medium: `font-size:2em`,
  big: `font-size:3em`
}

const buttonColors = {
  red: `background-color:#C0FFEE;`,
  blue: `background-color:#C0EEFF;`,
  green: `background-color:#FFC0EE;`
}

const ButtonWrapper = styled.button`
  display: inline-block;
  padding: 0.35em 1.2em;
  border: 0.1em solid #ffffff;
  margin: 0 0.3em 0.3em 0;
  border-radius: 0.12em;
  box-sizing: border-box;
  text-decoration: none;
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
  color: #111;
  text-align: center;
  transition: all 0.2s;
  ${props => buttonSizes[props.size]};
  ${props => buttonColors[props.color]};
`

class Button extends React.Component {
  render () {
    return (
      <ButtonWrapper size={this.props.size} color={this.props.color}>
        {this.props.children}
      </ButtonWrapper>
    )
  }
}

export default Button
