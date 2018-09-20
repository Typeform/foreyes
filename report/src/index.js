import reportData from '../report.json'
import Report from './report.js'
import React from 'react'
import ReactDOM from 'react-dom'

ReactDOM.render(<Report data={reportData} />, document.getElementById('root'))
