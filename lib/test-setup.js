'use strict'

const chai = require('chai')
const { JSDOM } = require('jsdom')
const sinonChai = require('sinon-chai')

const dom = new JSDOM(`<!DOCTYPE html>`)

global.window = dom.window
global.document = dom.window.document
global.document.createRange = () => ({
  commonAncestorContainer: global.document.body,
  setStart () {},
  setEnd () {},
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
