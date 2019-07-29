import _ from 'lodash'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Popper from 'popper.js'

import Portal from './portal'

const initialArrowProps = {
  left: 0,
  top: 0,
}

const initialPopperProps = {
  left: 0,
  position: 'absolute',
  top: 0,
}

class PortalPopper extends Component {
  static propTypes = {
    placement: PropTypes.string.isRequired,
    getTargetNode: PropTypes.func.isRequired,
    title: PropTypes.node.isRequired,
    className: PropTypes.string,
  }

  static defaultProps = {
    Popper,
    className: '',
  }

  state = {
    arrowProps: initialArrowProps,
    popperProps: initialPopperProps,
    flipped: false,
  }

  render () {
    const { className, placement, title } = this.props
    const prefix = _.last(className.split(' '))
    const flippedClass = this.state.flipped ? ` ${prefix}-flipped` : ''

    return (
      <Portal appendTo={this.props.appendTo}>
        <div
          ref={(node) => this.portalNode = node}
          className={`${className} ${prefix}-${placement}${flippedClass}`}
          style={this._getPopperStyle()}
          onMouseOut={this._onMouseOut}
        >
          <span>{title}</span>
          <div
            ref={(node) => this.arrowNode = node}
            className={`${prefix}-arrow`}
            style={this._getArrowStyle()}
          >
            <svg xmlns='http://www.w3.org/2000/svg' version='1.1'>
              <polygon points='5,0 10,5 5,10 0,5' />
            </svg>
          </div>
        </div>
      </Portal>
    )
  }

  componentDidMount () {
    this.popper = new this.props.Popper(this.props.getTargetNode(), this.portalNode, {
      content: this.props.title,
      placement: this.props.placement,
      modifiers: {
        arrow: { element: this.arrowNode },
        preventOverflow: {
          boundariesElement: this.props.boundary,
        },
      },
      onCreate: this._updateData,
      onUpdate: this._updateData,
    })

    this.popper.scheduleUpdate()
  }

  componentDidUpdate (prevProps) {
    if (prevProps.updateCue !== this.props.updateCue) {
      this.popper.scheduleUpdate()
    }
  }

  _onMouseOut = (...args) => {
    this.props.onMouseOut && this.props.onMouseOut(...args)
  }

  _updateData = (data) => {
    if (this.isUnmounted) return

    const newState = {}

    if (data.offsets.arrow) newState.arrowProps = data.offsets.arrow

    if (data.offsets.popper) newState.popperProps = data.offsets.popper

    if (data.flipped != null) newState.flipped = data.flipped

    this.setState(newState)
  }

  _getPopperStyle () {
    const left = Math.round(this.state.popperProps.left)
    const top = Math.round(this.state.popperProps.top)
    const transform = `translate3d(${left}px, ${top}px, 0)`

    return {
      position: this.state.popperProps.position,
      transform,
      WebkitTransform: transform,
    }
  }

  _getArrowStyle () {
    return {
      left: this._getArrowProp('left'),
      top: this._getArrowProp('top'),
    }
  }

  _getArrowProp (position) {
    const prop = this.state.arrowProps[position]

    return _.isNumber(prop) && !_.isNaN(prop) ? Math.round(prop) : null
  }

  componentWillUnmount () {
    this.isUnmounted = true
    this.popper && this.popper.destroy()
  }
}

export default PortalPopper
