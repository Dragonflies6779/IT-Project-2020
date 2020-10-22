var React = require('react');
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react';
import { screen ,getByLabelText,
  getByText,
  getByTestId,
  queryByTestId,
  toBeDisabled} from '@testing-library/dom'
var Upload = require('./imagesUpload.js');

it('renders correctly', () => {
  const tree = renderer.create(<Upload/>).toJSON();
  expect(tree).toMatchSnapshot();
});

it('The button is not disabled and works', () => {
  const utils = render(<Upload />)
  const input = utils.getAllByRole('button')
  expect(input[0].hasAttribute('disabled')).toBe(false)
})

it('Check if there a file upload input form', () => {
  const utils = render(<Upload />)
  const input = utils.getByRole('progressbar')
  expect(input.value).toBe(0)
})
