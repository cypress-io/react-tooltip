# React Tooltip

A tooltip component for React apps utilizing the excellent [popper.js library](https://popper.js.org).

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

The tooltip will automatically appear when mousing over the button and disappear when mousing out from the button.

## Options

option | default | description | supported values
---|----|----|----
title | null | _Required_. The tooltip text | Any non-empty string
placement | 'top' | The placement of the tooltip | Placements supported by [popper.js](https://popper.js.org/documentation.html#new_Popper)
visible | null | Whether to show the tooltip when rendered. This overrides the default showing/hiding on mouse-over/mouse-out | `true` or `false`

## Development

```sh
# watches JS and SCSS for changes and compiles
# runs tests for associated
npm start

# run all tests
npm test
```

## Changelog

#### 0.1.4 - *(03/10/17)*
- Upgrade popper.js to 1.x.x

#### 0.1.1 - *(09/29/16)*
- Guard against updating popper state when unmounted

#### 0.1.0 - *(09/28/16)*
- Initial release
