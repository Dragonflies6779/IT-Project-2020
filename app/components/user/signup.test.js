var React = require('react');
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react';
import { screen ,getByLabelText,
  getByText,
  getByTestId,
  queryByTestId,
  toBeDisabled} from '@testing-library/dom'
var SignUp = require('./signup.js');

const setup = ( search ) => {
  const utils = render(<SignUp />)
  const input = utils.getByPlaceholderText( search )
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
  const { input } = setup('First Name')
  fireEvent.change(input, {target: {value : 'Abcd'} })
  expect(input.value).toBe('Abcd')
})

it('Can input values to Last Name', () => {
  const { input } = setup('Last Name')
  fireEvent.change(input, {target: {value : 'Abcd'} })
  expect(input.value).toBe('Abcd')
})

it('Can input values to Email', () => {
  const { input } = setup('Email Address')
  fireEvent.change(input, {target: {value : 'Abcd'} })
  expect(input.value).toBe('Abcd')
})

it('Can input values to Password', () => {
  const { input } = setup('Password')
  fireEvent.change(input, {target: {value : 'Abcd'} })
  expect(input.value).toBe('Abcd')
})

it('Can input values to Password Confirmation', () => {
  const { input } = setup('Password Confirmation')
  fireEvent.change(input, {target: {value : 'Abcd'} })
  expect(input.value).toBe('Abcd')
})

it('The button is not disabled and works', () => {
  const utils = render(<SignUp />)
  const input = utils.getByText('Create Account')
  expect(input.closest('button').hasAttribute('disabled')).toBe(false)
})
