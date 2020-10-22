var React = require('react');
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react';
import { screen ,getByLabelText,
  getByText,
  getByTestId,
  queryByTestId, } from '@testing-library/dom'
var Login = require('./login.js');

const setup = ( search ) => {
  const utils = render(<Login />)
  const input = utils.getByPlaceholderText( search )
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
  const { input } = setup('Email Address')
  fireEvent.change(input, {target: {value : 'Abcd'} })
  expect(input.value).toBe('Abcd')
})

it('Can input values to Password', () => {
  const { input } = setup('Password')
  fireEvent.change(input, {target: {value : 'Abcd'} })
  expect(input.value).toBe('Abcd')
})

it('The button is not disabled and works', () => {
  const utils = render(<Login />)
  const input = utils.getByRole('button')
  expect(input.hasAttribute('disabled')).toBe(false)
})
