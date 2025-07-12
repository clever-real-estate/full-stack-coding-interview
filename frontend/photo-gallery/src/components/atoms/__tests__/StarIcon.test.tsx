import React from 'react';
import { render, screen } from '@testing-library/react';
import StarIcon from '../StarIcon';

describe('StarIcon', () => {
  it('renders with default props', () => {
    render(<StarIcon />);
    const star = screen.getByTestId('star-icon');
    expect(star).toBeInTheDocument();
  });

  it('renders filled star when filled prop is true', () => {
    render(<StarIcon filled={true} />);
    const star = screen.getByTestId('star-icon');
    expect(star).toHaveAttribute('data-filled', 'true');
  });

  it('renders empty star when filled prop is false', () => {
    render(<StarIcon filled={false} />);
    const star = screen.getByTestId('star-icon');
    expect(star).toHaveAttribute('data-filled', 'false');
  });
}); 