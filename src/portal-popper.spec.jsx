import _ from 'lodash'
import React from 'react'
import { mount, shallow } from 'enzyme'
import sinon from 'sinon'

import Portal from './portal'

import PortalPopper from './portal-popper'

const getProps = (props) => {
  return _.extend({
    placement: 'top',
    title: 'tooltip title',
    getTargetNode: sinon.stub().returns('target node'),
  }, props)
}

const popperInstanceStub = () => ({
  onUpdate: sinon.spy(),
  update: sinon.spy(),
  destroy: sinon.spy(),
})

const popperStub = (popperInstance) => sinon.stub().returns(popperInstance)

describe('<PortalPopper />', () => {
  it('renders a <Portal /> with a placement class', () => {
    const component = shallow(<PortalPopper {...getProps({ className: 'tooltip' })} />)
    expect(component.find(Portal)).to.have.className('tooltip-top')
  })

  it('renders a <Portal /> with default styles', () => {
    const component = shallow(<PortalPopper {...getProps()} />)
    expect(component.find(Portal).prop('style').position).to.equal('absolute')
    expect(component.find(Portal).prop('style').transform).to.equal('translate3d(0px, 0px, 0)')
    expect(component.find(Portal).prop('style').WebkitTransform).to.equal('translate3d(0px, 0px, 0)')
  })

  it('renders the title specified', () => {
    const component = shallow(<PortalPopper {...getProps()} />)
    expect(component.find('span')).to.have.text('tooltip title')
  })

  it('renders the tooltip arrow with default styles', () => {
    const component = shallow(<PortalPopper {...getProps({})} />)
    expect(component.find('div').prop('style').left).to.equal(0)
    expect(component.find('div').prop('style').top).to.equal(0)
  })

  it('renders with className specified', () => {
    const component = shallow(<PortalPopper {...getProps({ className: 'the-tooltip' })} />)
    expect(component.find(Portal)).to.have.className('the-tooltip')
    expect(component.find(Portal)).to.have.className('the-tooltip-top')
    expect(component.find('div')).to.have.className('the-tooltip-arrow')
  })

  it('uses last className as prefix if multiple', () => {
    const component = shallow(<PortalPopper {...getProps({ className: 'custom-class the-tooltip' })} />)
    expect(component.find(Portal).prop('className')).to.equal('custom-class the-tooltip the-tooltip-top')
    expect(component.find('div').prop('className')).to.equal('the-tooltip-arrow')
  })

  it('renders with wrapperClassName specified', () => {
    const component = shallow(<PortalPopper {...getProps({ wrapperClassName: 'the-wrap' })} />)
    expect(component.find('span')).to.have.className('the-wrap')
  })

  it('creates Popper instance with the right props', () => {
    const Popper = popperStub(popperInstanceStub())
    const component = mount(<PortalPopper {...getProps({ Popper })} />)
    expect(Popper).to.have.been.called
    expect(Popper.getCall(0).args[0]).to.equal('target node')
    expect(Popper.getCall(0).args[2]).to.eql({
      content: 'tooltip title',
      placement: 'top',
      modifiers: {
        applyStyle: { enabled: true },
        arrow: { element: component.ref('arrow').node },
      },
    })
  })

  it('calls update() on the Popper instance', () => {
    const popperInstance = popperInstanceStub()
    mount(<PortalPopper {...getProps({ Popper: popperStub(popperInstance) })} />)
    expect(popperInstance.update).to.have.been.called
  })

  it('destroys the Popper instance on unmount', () => {
    const popperInstance = popperInstanceStub()
    const component = mount(<PortalPopper {...getProps({ Popper: popperStub(popperInstance) })} />)
    component.unmount()
    expect(popperInstance.destroy).to.have.been.called
  })

  describe('Popper#onUpate', () => {
    it('updates the arrow props if specified', () => {
      const popperInstance = popperInstanceStub()
      const component = mount(<PortalPopper {...getProps({ Popper: popperStub(popperInstance) })} />)
      popperInstance.onUpdate({ offsets: { arrow: { left: 5, top: 10 } } })
      expect(component.ref('arrow').prop('style').left).to.equal(5)
      expect(component.ref('arrow').prop('style').top).to.equal(10)
    })

    it('does not update the arrow props if not specified', () => {
      const popperInstance = popperInstanceStub()
      const component = mount(<PortalPopper {...getProps({ Popper: popperStub(popperInstance) })} />)
      popperInstance.onUpdate({ offsets: {} })
      expect(component.ref('arrow').prop('style').left).to.equal(0)
      expect(component.ref('arrow').prop('style').top).to.equal(0)
    })

    it('only updates the arrow props that are specified', () => {
      const popperInstance = popperInstanceStub()
      const component = mount(<PortalPopper {...getProps({ Popper: popperStub(popperInstance) })} />)
      popperInstance.onUpdate({ offsets: { arrow: { top: 20 } } })
      expect(component.ref('arrow').prop('style').left).to.equal(null)
      expect(component.ref('arrow').prop('style').top).to.equal(20)
    })

    it('rounds the arrow props', () => {
      const popperInstance = popperInstanceStub()
      const component = mount(<PortalPopper {...getProps({ Popper: popperStub(popperInstance) })} />)
      popperInstance.onUpdate({ offsets: { arrow: { left: 7.2, top: 20.8 } } })
      expect(component.ref('arrow').prop('style').left).to.equal(7)
      expect(component.ref('arrow').prop('style').top).to.equal(21)
    })

    it('updates the popper props if specified', () => {
      const popperInstance = popperInstanceStub()
      const component = mount(<PortalPopper {...getProps({ Popper: popperStub(popperInstance) })} />)
      popperInstance.onUpdate({ offsets: { popper: { position: 'relative', left: 2, top: 4 } } })
      expect(component.find(Portal).prop('style').position).to.equal('relative')
      expect(component.find(Portal).prop('style').transform).to.equal('translate3d(2px, 4px, 0)')
      expect(component.find(Portal).prop('style').WebkitTransform).to.equal('translate3d(2px, 4px, 0)')
    })

    it('does not update the popper props if not specified', () => {
      const popperInstance = popperInstanceStub()
      const component = mount(<PortalPopper {...getProps({ Popper: popperStub(popperInstance) })} />)
      popperInstance.onUpdate({ offsets: {} })
      expect(component.find(Portal).prop('style').position).to.equal('absolute')
      expect(component.find(Portal).prop('style').transform).to.equal('translate3d(0px, 0px, 0)')
      expect(component.find(Portal).prop('style').WebkitTransform).to.equal('translate3d(0px, 0px, 0)')
    })

    it('rounds the popper props', () => {
      const popperInstance = popperInstanceStub()
      const component = mount(<PortalPopper {...getProps({ Popper: popperStub(popperInstance) })} />)
      popperInstance.onUpdate({ offsets: { popper: { left: 15.2, top: 2.8 } } })
      expect(component.find(Portal).prop('style').transform).to.equal('translate3d(15px, 3px, 0)')
      expect(component.find(Portal).prop('style').WebkitTransform).to.equal('translate3d(15px, 3px, 0)')
    })
  })
})
