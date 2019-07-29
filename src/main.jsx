import React from 'react'
import { render } from 'react-dom'
import Tooltip from './tooltip'

const Design = () => (
  <div>
    <h1>Demo</h1>
    <Tooltip title="Hello World">
      <button>Click me</button>
    </Tooltip>
    <h1>Placement</h1>
    <p>
      <Tooltip title='The tooltip text' visible={true} placement='top'>
        <span>top</span>
      </Tooltip>
    </p>
    <p>
      <Tooltip title='The tooltip text' visible={true} placement='right'>
        <span>right</span>
      </Tooltip>
    </p>
    <p>
      <Tooltip title='The tooltip text' visible={true} placement='bottom'>
        <span>bottom</span>
      </Tooltip>
    </p>
    <p>
      <Tooltip title='The tooltip text' visible={true} placement='left'>
        <span>left</span>
      </Tooltip>
    </p>
  </div>
)

render(<Design />, document.getElementById('app'))
