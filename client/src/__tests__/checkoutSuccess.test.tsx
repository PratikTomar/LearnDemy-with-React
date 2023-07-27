
import React from 'react';
import { render, screen } from '@testing-library/react';
import CheckoutSuccess from '../components/checkout/checkoutSuccess.component';

test('renders transaction success message', () => {
 render(<CheckoutSuccess />);
  const successMessage = screen.getByText('Transaction Successful');
  expect(successMessage).toBeInTheDocument();
  expect(successMessage).toMatchSnapshot();
});

