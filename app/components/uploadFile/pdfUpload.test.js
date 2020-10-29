var React = require('react');
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react';
import { screen ,getByLabelText,
  getByText,
  getByTestId,
  queryByTestId,
  toBeDisabled} from '@testing-library/dom'
var Upload = require('./pdfUpload.js');

it('renders correctly', () => {
  const tree = renderer.create(<Upload/>).toJSON();
  expect(tree).toMatchSnapshot();
});

it('The button is not disabled and works', () => {
  const utils = render(<Upload />)
  const input = utils.getAllByRole('button')
  expect(input[0].hasAttribute('disabled')).toBe(false)
  expect(input[1].hasAttribute('disabled')).toBe(false)
})
