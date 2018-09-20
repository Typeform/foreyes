import React from 'react'
import Viewport from './viewport.js'

const renderViewports = viewports => {
  return Object.keys(viewports).map(viewport => {
    return <Viewport name={viewport} {...viewports[viewport]} />
  })
}

const TestCase = ({ name, ...viewports }) => {
  return (
    <tr>
      <td>{name}</td>
      {renderViewports(viewports)}
    </tr>
  )
}

export default TestCase
