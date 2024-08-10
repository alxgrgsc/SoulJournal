import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Register from './Register';

// Mock the navigate function from react-router-dom
jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

describe('Register Component', () => {
  test('renders Register component', () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    // Check if the Register title is in the document
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

  test('allows user to enter registration details', () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    // Get input fields
    const firstnameInput = screen.getByLabelText('First Name');
    const lastnameInput = screen.getByLabelText('Last Name');
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const repeatPasswordInput = screen.getByLabelText('Repeat Password');

    // Simulate entering text
    fireEvent.change(firstnameInput, { target: { value: 'John' } });
    fireEvent.change(lastnameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.change(repeatPasswordInput, { target: { value: 'password' } });

    // Check if the input values are updated
    expect(firstnameInput.value).toBe('John');
    expect(lastnameInput.value).toBe('Doe');
    expect(emailInput.value).toBe('john.doe@example.com');
    expect(passwordInput.value).toBe('password');
    expect(repeatPasswordInput.value).toBe('password');
  });

  test('successfully submits the form with valid inputs', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    );

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    // Get input fields
    const firstnameInput = screen.getByLabelText('First Name');
    const lastnameInput = screen.getByLabelText('Last Name');
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const repeatPasswordInput = screen.getByLabelText('Repeat Password');
    const submitButton = screen.getByText('Register');

    // Fill out the form with valid data
    fireEvent.change(firstnameInput, { target: { value: 'John' } });
    fireEvent.change(lastnameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.change(repeatPasswordInput, { target: { value: 'password' } });

    // Simulate form submission
    fireEvent.click(submitButton);

    // Check if the fetch function was called with the correct data
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3300/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstname: 'John',
        lastname: 'Doe',
        email: 'john.doe@example.com',
        password: 'password',
      }),
    });
  });
});
