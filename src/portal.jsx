import { Component } from 'react'
import { createPortal } from 'react-dom'

class Portal extends Component {
  static idNum = 0

  static defaultProps = {
    appendTo: document.body,
  }

  constructor (props) {
    super(props)

    const appendTo = props.appendTo
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

    // it's possible the element was removed from the dom or the dom has been
    // blown away, which will cause `removeChild` to throw an exception
    try {
      appendTo.removeChild(this._element)
    } catch (err) {} // eslint-disable-line no-empty
  }

  render () {
    return createPortal(
      this.props.children,
      this._element,
    )
  }
}

export default Portal
