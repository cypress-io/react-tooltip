import _ from 'lodash'
import React, { Component } from 'react'
import { render } from 'react-dom'

class Portal extends Component {
  static idNum = 0

  static defaultProps = {
    appendTo: document.body,
  }

  componentDidMount () {
    const appendTo = this.props.appendTo
    const id = `portal-${Portal.idNum++}`
    let element = appendTo.ownerDocument.getElementById(id)
    if (!element) {
      element = appendTo.ownerDocument.createElement('div')
      element.id = id
      appendTo.appendChild(element)
    }
    this._element = element
    this.componentDidUpdate()
  }

  componentWillUnmount () {
    const appendTo = this.props.appendTo
    appendTo.removeChild(this._element)
  }

  componentDidUpdate () {
    render((
      <div ref={(node) => this.domNode = node} {..._.omit(this.props, 'children', 'appendTo')}>
        {this.props.children}
      </div>
    ), this._element)
  }

  render () {
    return null
  }
}

export default Portal
