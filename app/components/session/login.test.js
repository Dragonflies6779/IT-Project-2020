var React = require('react');
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react';
import { screen ,getByLabelText,
  getByText,
  getByTestId,
  queryByTestId, } from '@testing-library/dom'
var Login = require('./login.js');

const setupEmail = () => {
  const utils = render(<Login />)
  const input = utils.getByPlaceholderText('Email Address')
  return {
    input,
    ...utils,
  }
}
const setupPassword = () => {
  const utils = render(<Login />)
  const input = utils.getByPlaceholderText('Password')
  return {
    input,
    ...utils,
  }
}
it('renders correctly', () => {
  const tree = renderer.create(<Login/>).toJSON();
  expect(tree).toMatchSnapshot();
});

it('Can input values to Email', () => {
  const { input } = setupEmail()
  fireEvent.change(input, {target: {value : 'Abcd'} })
  expect(input.value).toBe('Abcd')
})

it('Can input values to Password', () => {
  const { input } = setupPassword()
  fireEvent.change(input, {target: {value : 'Abcd'} })
  expect(input.value).toBe('Abcd')
})
