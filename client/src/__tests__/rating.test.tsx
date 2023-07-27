import React from 'react';
import { render, screen } from '@testing-library/react';
import Ratings from '../components/atoms/rating/rating.component';


describe('Ratings component', () => {
  it('renders the correct number of filled stars', () => {
    const ratings = 3.5;
    const reviews = 10;

    render(<Ratings ratings={ratings} reviews={reviews} />);

    const ratingsText = screen.getByText('3.5');
    expect(ratingsText).toBeInTheDocument(); 

    const reviewsText = screen.getByText('(10)');
    expect(reviewsText).toBeInTheDocument(); 
    expect(screen).toMatchSnapshot();
  });

  it('renders zero ratings and reviews', () => {
    const ratings = 0;
    const reviews = 0;

    render(<Ratings ratings={ratings} reviews={reviews} />);


    const ratingsText = screen.getByText('0');
    expect(ratingsText).toBeInTheDocument(); 

    const reviewsText = screen.getByText('(0)');
    expect(reviewsText).toBeInTheDocument(); 
  });
});
