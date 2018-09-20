import React from 'react'
import TestCase from './testCase.js'

const generateTestCases = testCases => {
  return Object.keys(testCases).map(name => {
    return <TestCase name={name} {...testCases[name]} />
  })
}

const Report = ({ data }) => {
  return (
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
  )
}

export default Report
