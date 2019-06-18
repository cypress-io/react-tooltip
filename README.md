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
title | undefined | _Required_. The tooltip content | Anything renderable by React (string, number, element, etc)
placement | 'top' | The placement of the tooltip | Placements supported by [popper.js](https://popper.js.org/documentation.html#new_Popper)
visible | undefined | Whether to show the tooltip when rendered. This overrides the default showing/hiding on mouse-over/mouse-out | `true` or `false`
className | 'tooltip' | Class applied to the tooltip
wrapperClassName | '' | Class applied to the `<span>` that wraps the children of `<Tooltip>`
updateCue | undefined | A prop that indicates that the tooltip's position should update. If the size of the tooltip target changes while the tooltip is showing, the tooltip won't know to update its position. Set this to something that's tied to the target's size or just to a new value to trigger an update of the tooltip's position.

## Development

```sh
# watches JS and SCSS for changes and compiles
# runs tests for associated
npm start

# run all tests
npm test
```

## Changelog

#### 0.2.2 - *(03/10/17)*
- Add customizable tooltip border

#### 0.2.1 - *(03/10/17)*
- Fix issues with class names

#### 0.2.0 - *(03/10/17)*
- Allow specifying tooltip class name and wrapper class name

#### 0.1.4 - *(03/10/17)*
- Upgrade popper.js to 1.x.x

#### 0.1.1 - *(09/29/16)*
- Guard against updating popper state when unmounted

#### 0.1.0 - *(09/28/16)*
- Initial release
