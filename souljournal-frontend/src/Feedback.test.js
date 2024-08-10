import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Feedback from './Feedback';

// Mock the navigate function from react-router-dom
jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

describe('Feedback Component', () => {
  test('renders Feedback component', () => {
    render(
      <MemoryRouter>
        <Feedback />
      </MemoryRouter>
    );

    // Check if the Feedback title is in the document
    expect(screen.getByText('Feedback')).toBeInTheDocument();
  });

  test('allows user to enter feedback', () => {
    render(
      <MemoryRouter>
        <Feedback />
      </MemoryRouter>
    );

    const feedbackInput = screen.getByLabelText('Content');

    // Simulate entering feedback text
    fireEvent.change(feedbackInput, { target: { value: 'Great service!' } });

    // Check if the input value is updated
    expect(feedbackInput.value).toBe('Great service!');
  });

  test('allows user to select stars', () => {
    render(
      <MemoryRouter>
        <Feedback />
      </MemoryRouter>
    );

    const starButtons = screen.getAllByRole('button');

    // Simulate selecting 3 stars
    fireEvent.click(starButtons[2]);

    // Check if the 3rd star is marked as checked
    expect(starButtons[2]).toHaveClass('checked');
  });
});
