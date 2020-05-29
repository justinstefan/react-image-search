import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders input', () => {
  const { getByTestId } = render(<App />);
  const searchInput = getByTestId("search-input");
  expect(searchInput).toBeInTheDocument();
});
