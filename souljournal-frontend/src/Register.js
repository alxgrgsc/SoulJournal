//imports
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Register.css';

//register component
const Register = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const MIN_PASSWORD_LENGTH = 5;

  //handle submit feedback
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      setError('Passwords do not match');
      return;
    }

    //validate password
    if (password.length < MIN_PASSWORD_LENGTH) {
      setError(`Password must be at least ${MIN_PASSWORD_LENGTH} characters`);
      return;
    }

    //validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,3}$/;

    //check if email is valid
    if (!emailRegex.test(email)) {
      setError('Invalid email format ("e.g. example@gmail.com")');
      return;
    }


    try {
      const response = await fetch('http://localhost:3300/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstname, lastname, email, password }),
      });

      if (response.ok) {
        navigate('/registration-success');
      } else {
        const data = await response.json();
        setError(data.message || 'Registration failed');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  //handle discard feedback
  const handleDiscard = () => {
    if (window.confirm('You will return to the welcome page, are you sure?')) {
      navigate("/");
    }
  };

  return (
    <div className="container mt-5 register-container">
      <h2 className="register-title">Register</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="firstname" className="form-label">First Name</label>
          <input
            type="text"
            className="form-control"
            id="firstname"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastname" className="form-label">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="repeatPassword" className="form-label">Repeat Password</label>
          <input
            type="password"
            className="form-control"
            id="repeatPassword"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            required
          />
        </div>
        <div className="buttons d-flex justify-content-center w-100">
        <button className="btn button  w-100 fixed-size-button" onClick={handleDiscard}>Back</button>
        <button type="submit" className="btn button fixed-size-button">Register</button>

        </div>
      </form>
    </div>
  );
};

//export register component
export default Register;