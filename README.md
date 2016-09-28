# React tooltip

A tooltip component for React app utilizing the excellent [popper.js library]().

## Installation

```sh
npm install --save @cypress/react-tooltip
```

## Usage

```javascript
import Tooltip from '@cypress/react-tooltip'

<Tooltip title="Hello World">
  <button>Click me</button>
</Tooltip>
```

## Options

option | default | description | supported values
---|----|----|----
title (_required_) | null | The tooltip text | Any non-empty string
placement | 'top' | The placement of the tooltip | Placements supported by [popper.js](https://popper.js.org/documentation.html#new_Popper)
visible | null | Whether to show the tooltip when rendered. This overrides the default showing/hiding on mouse-over/mouse-out | `true` or `false`
