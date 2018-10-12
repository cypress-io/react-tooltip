'use strict'

const chai = require('chai')
const jsdom = require('jsdom').jsdom
const sinonChai = require('sinon-chai')

// http://airbnb.io/enzyme/docs/guides/jsdom.html
global.document = jsdom('')
global.document.createRange = () => ({
  commonAncestorContainer: global.document.body,
  setStart () {},
  setEnd () {},
})
global.window = document.defaultView
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    global[property] = document.defaultView[property]
  }
})
global.navigator = {
  userAgent: 'node.js',
  appVersion: { indexOf () {} },
}
global.Node = {}
global.requestAnimationFrame = (fn) => fn()
global.cancelAnimationFrame = () => {}

// enzyme, and therefore chai-enzyme, needs to be required after
// global.navigator is set up (https://github.com/airbnb/enzyme/issues/395)
const enzyme = require('enzyme')
const EnzymeAdapter = require('enzyme-adapter-react-16')
const chaiEnzyme = require('chai-enzyme')

enzyme.configure({ adapter: new EnzymeAdapter() })
chai.use(chaiEnzyme())
chai.use(sinonChai)
global.expect = chai.expect

class Runnable {
  emit () {}
}

class Runner {
  emit () {}
  uncaught () {}
}

global.Mocha = { Runnable, Runner }
global.$Cypress = { create: () => {} }
global.io = { connect: () => { return { emit: () => {}, on: () => {} } } }
