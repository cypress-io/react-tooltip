import { Component } from 'react'
import { createPortal } from 'react-dom'

class Portal extends Component {
  static idNum = 0

  static defaultProps = {
    appendTo: document.body,
  }

  componentWillMount () {
    const appendTo = this.props.appendTo
    const id = `portal-${Portal.idNum++}`
    let element = appendTo.ownerDocument.getElementById(id)
    if (!element) {
      element = appendTo.ownerDocument.createElement('div')
      element.id = id
      appendTo.appendChild(element)
    }
    this._element = element
  }

  componentWillUnmount () {
    const appendTo = this.props.appendTo
    appendTo.removeChild(this._element)
  }

  render () {
    return createPortal(
      this.props.children,
      this._element,
    )
  }
}

export default Portal
