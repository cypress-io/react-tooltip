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

  constructor (...props) {
    super(...props)

    this.state = {
      shouldShow: false,
    }
  }

  render () {
    const child = Children.only(this.props.children)

    const actionProps = this.props.visible == null ? {
      onMouseOver: (...args) => {
        child.props.onMouseOver && child.props.onMouseOver(...args)
        this.setState({ shouldShow: true })
      },
      onMouseOut: (...args) => {
        child.props.onMouseOut && child.props.onMouseOut(...args)
        this.setState({ shouldShow: false })
      },
    } : {}

    return (
      <span className={this.props.wrapperClassName}>
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

    const props = _.omit(this.props, 'wrapperClassName', 'children')

    return (
      <PortalPopper getTargetNode={() => this.refs.target} {...props} />
    )
  }
}

export default Tooltip
