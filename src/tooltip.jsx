import React, { Children, cloneElement, Component, PropTypes } from 'react'

import PortalPopper from './portal-popper'

class Tooltip extends Component {
  constructor (...props) {
    super(...props)

    this.state = {
      shouldShow: false,
    }
  }

  render () {
    const actionProps = this.props.visible == null ? {
      onMouseOver: () => this.setState({ shouldShow: true }),
      onMouseOut: () => this.setState({ shouldShow: false }),
    } : {}

    return (
      <span>
        {cloneElement(Children.only(this.props.children), {
          ref: 'target',
          ...actionProps,
        })}
        {this._popper()}
      </span>
    )
  }

  _popper () {
    if (this.props.visible !== true && (!this.state.shouldShow || this.props.visible === false)) return null

    return (
      <PortalPopper
        getTargetNode={() => this.refs.target}
        title={this.props.title}
        placement={this.props.placement}
      />
    )
  }
}

Tooltip.propTypes = {
  placement: PropTypes.string,
  title: PropTypes.string.isRequired,
  visible: PropTypes.bool,
}

Tooltip.defaultProps = {
  placement: 'top',
}

export default Tooltip
