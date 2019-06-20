import { mount } from 'enzyme'
import React from 'react'

import Portal from './portal'

describe('<Portal />', () => {
  it('creates a div with a unique id', () => {
    Portal.idNum = 0
    mount(<Portal />)
    mount(<Portal />)
    expect(document.getElementById('portal-0')).to.exist
    expect(document.getElementById('portal-1')).to.exist
    document.getElementById('portal-0').remove()
    document.getElementById('portal-1').remove()
  })

  it('renders children', () => {
    Portal.idNum = 0
    mount(<Portal><div className='foo' /></Portal>)
    expect(document.querySelector('.foo')).to.exist
    document.getElementById('portal-0').remove()
  })

  it('removes the portal div on unmount', () => {
    Portal.idNum = 0
    const component = mount(<Portal />)

    component.unmount()
    expect(document.getElementById('portal-0')).not.to.exist
  })
})
