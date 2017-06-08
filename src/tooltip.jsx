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
    placement: 'top',
    className: 'tooltip',
    wrapperClassName: '',
  }

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
        className={this.props.className}
        wrapperClassName={this.props.wrapperClassName}
      />
    )
  }
}

export default Tooltip
