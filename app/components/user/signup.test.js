var React = require('react');
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react';
import { screen ,getByLabelText,
  getByText,
  getByTestId,
  queryByTestId, } from '@testing-library/dom'
var SignUp = require('./signup.js');

const setupFirstName = () => {
  const utils = render(<SignUp />)
  const input = utils.getByPlaceholderText('First Name')
  return {
    input,
    ...utils,
  }
}
const setupLastName = () => {
  const utils = render(<SignUp />)
  const input = utils.getByPlaceholderText('Last Name')
  return {
    input,
    ...utils,
  }
}
const setupEmail = () => {
  const utils = render(<SignUp />)
  const input = utils.getByPlaceholderText('Email Address')
  return {
    input,
    ...utils,
  }
}
const setupPassword = () => {
  const utils = render(<SignUp />)
  const input = utils.getByPlaceholderText('Password')
  return {
    input,
    ...utils,
  }
}
const setupPasswordConfirmation = () => {
  const utils = render(<SignUp />)
  const input = utils.getByPlaceholderText('Password Confirmation')
  return {
    input,
    ...utils,
  }
}

it('renders correctly', () => {
  const tree = renderer.create(<SignUp/>).toJSON();
  expect(tree).toMatchSnapshot();
});

it('Can input values to First Name', () => {
  const { input } = setupFirstName()
  fireEvent.change(input, {target: {value : 'Abcd'} })
  expect(input.value).toBe('Abcd')
})

it('Can input values to Last Name', () => {
  const { input } = setupLastName()
  fireEvent.change(input, {target: {value : 'Abcd'} })
  expect(input.value).toBe('Abcd')
})

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

it('Can input values to Password Confirmation', () => {
  const { input } = setupPasswordConfirmation()
  fireEvent.change(input, {target: {value : 'Abcd'} })
  expect(input.value).toBe('Abcd')
})
