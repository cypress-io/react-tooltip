import _ from 'lodash'
import React, { Children, cloneElement, Component } from 'react'
import PropTypes from 'prop-types'

import PortalPopper from './portal-popper'

class Tooltip extends Component {
  static propTypes = {
    placement: PropTypes.string,
    title: PropTypes.node.isRequired,
    visible: PropTypes.bool,
    className: PropTypes.string,
    wrapperClassName: PropTypes.string,
  }

  static defaultProps = {
    className: 'tooltip',
    placement: 'top',
    wrapperClassName: '',
  }

  state = {
    shouldShow: false,
  }

  render () {
    this.child = Children.only(this.props.children)

    return (
      <span className={this.props.wrapperClassName}>
        {cloneElement(this.child, {
          ref: (node) => {
            this._target = node
            if (typeof this.child.ref === 'function') {
              this.child.ref(node)
            }
          },
          onMouseOver: this._onMouseOver,
          onMouseOut: this._onMouseOut,
        })}
        {this._popper()}
      </span>
    )
  }

  _onMouseOver = (e, ...args) => {
    this.child.props.onMouseOver && this.child.props.onMouseOver(e, ...args)
    this.setState({ shouldShow: true })
  }

  _onMouseOut = (e, ...args) => {
    // if the mouse has moved to the portal, mouse isn't really "out"
    if ((this._target && this._target.contains(e.relatedTarget)) ||
        (this.portalPopperNode && this.portalPopperNode.portalNode && this.portalPopperNode.portalNode.contains(e.relatedTarget))) {
      return
    }

    this.child.props.onMouseOut && this.child.props.onMouseOut(e, ...args)

    this.setState({ shouldShow: false })
  }

  _popper () {
    if (this.props.visible !== true && (!this.state.shouldShow || this.props.visible === false)) return null

    const props = _.omit(this.props, 'wrapperClassName', 'children')

    return (
      <PortalPopper ref={(x) => this.portalPopperNode = x}
        onMouseOut={this._onMouseOut}
        getTargetNode={() => this._target}
        {...props} />
    )
  }
}

export default Tooltip
