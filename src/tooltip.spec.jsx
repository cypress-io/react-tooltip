import _ from 'lodash'
import React from 'react'
import { shallow } from 'enzyme'

import PortalPopper from './portal-popper'

import Tooltip from './tooltip'

const defaultProps = {
  placement: 'top',
  title: 'Do foo',
}

const createComponent = (props) => (
  <Tooltip {..._.extend({}, defaultProps, props)}>
    <div className='target' />
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
