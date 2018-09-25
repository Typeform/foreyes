import React from 'react'

const Browser = ({ failed, difference, reference }) => {
  const failureClass = failed ? 'failure' : 'success'
  const differenceHtml = failed ? (
    <a
      class='failure'
      href={`./compare.html?reference=${encodeURI(
        reference
      )}&difference=${encodeURI(difference)}`}
    >
      Fail
    </a>
  ) : (
    'Pass'
  )
  return (
    <td class={failureClass}>
      <div>{differenceHtml}</div>
    </td>
  )
}

export default Browser
