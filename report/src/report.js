import React from 'react'
import TestCase from './testCase.js'

const generateTestCases = testCases => {
  return Object.keys(testCases).map(name => {
    return <TestCase name={name} {...testCases[name]} />
  })
}

const Report = ({ data, reportDate }) => {
  return (
    <span>
      <table>
        <tr class='header'>
          <td>Test Case</td>
          <tr>
            <td>Viewport</td>
            <td>Baseline</td>
            <td>Firefox</td>
            <td>IE11</td>
          </tr>
        </tr>
        {generateTestCases(data)}
      </table>
      <div id='footer'>Report generated on {reportDate}</div>
    </span>
  )
}

export default Report
