import React from 'react'
import Browser from './browser.js'

const Viewport = ({ name, baseline, firefox, IE11, Safari }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>
        <a href={baseline}>Chrome</a>
      </td>
      <Browser {...firefox} baseline={baseline} />
      <Browser {...IE11} baseline={baseline} />
      <Browser {...Safari} baseline={baseline} />
    </tr>
  )
}

export default Viewport
