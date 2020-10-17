// const assert = require("assert");
// const add = require("./add");
//
// describe("Demo", () => {
//   it("should add correctly", () => {
//     assert.equal(add(1, 1), 2);
//   });
// });
var React = require('react');
var ReactDom = require('react-dom');
var ReactTestUtils = require('react-dom/test-utils');
var Hello = require('../app/components/user/signup.js');

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});
