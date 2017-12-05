import _ from 'lodash'
import React from 'react'
import { mount, shallow } from 'enzyme'
import sinon from 'sinon'

import PortalPopper from './portal-popper'

import Tooltip from './tooltip'

const defaultProps = {
  placement: 'top',
  title: 'Do foo',
}

const createComponent = (props, child) => (
  <Tooltip {..._.extend({}, defaultProps, props)}>
    {child || <div className='target' />}
  </Tooltip>
)

describe('<Tooltip />', () => {
  it('does not render popper if visible is false', () => {
    const component = shallow(createComponent({ visible: false }))
    expect(component.find(PortalPopper)).not.to.exist
  })

  it('renders popper if visible is true', () => {
    const component = shallow(createComponent({ visible: true }))
    expect(component.find(PortalPopper)).to.exist
  })

  it('renders popper with default className', () => {
    const component = shallow(createComponent({ visible: true }))
    expect(component.find(PortalPopper)).to.have.className('tooltip')
  })

  it('renders outer span with default wrapperClassName', () => {
    const component = shallow(createComponent({ visible: true }))
    expect(component.find('span')).to.have.className('')
  })

  it('renders popper with specified className', () => {
    const component = shallow(createComponent({ visible: true, className: 'custom-class' }))
    expect(component.find(PortalPopper)).to.have.className('custom-class')
  })

  it('renders outer span with specified wrapperClassName', () => {
    const component = shallow(createComponent({ visible: true, wrapperClassName: 'custom-wrap-class' }))
    expect(component.find('span')).to.have.className('custom-wrap-class')
  })

  it('calls onMouseOver if specified', () => {
    const onMouseOver = sinon.spy()
    const component = mount(createComponent({}, <div onMouseOver={onMouseOver} />))
    const args = [1, 2, 3]
    component.find('div').prop('onMouseOver')(...args)
    expect(onMouseOver).to.be.calledWith(...args)
  })

  it('calls onMouseOut if specified', () => {
    const onMouseOut = sinon.spy()
    const component = mount(createComponent({}, <div onMouseOut={onMouseOut} />))
    const args = [1, 2, 3]
    component.find('div').prop('onMouseOut')(...args)
    expect(onMouseOut).to.be.calledWith(...args)
  })

  describe('when visible is not explicitly specified', () => {
    let component
    beforeEach(() => {
      component = shallow(createComponent())
    })

    it('renders popper on mouse over', () => {
      component.find('.target').simulate('mouseOver')
      expect(component.find(PortalPopper)).to.exist
    })

    it('does not render popper on mouse out', () => {
      component.find('.target').simulate('mouseOver')
      component.find('.target').simulate('mouseOut')
      expect(component.find(PortalPopper)).not.to.exist
    })
  })
})
