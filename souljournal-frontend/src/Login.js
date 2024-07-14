import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Simulate an authentication check
    const isAuthenticated = await fakeAuthCheck(email, password);

    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      setError('Invalid email or password');
    }
  };

  // Simulated authentication function
  const fakeAuthCheck = (email, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Replace this with actual authentication logic
        if (email === 'user@example.com' && password === 'password123') {
          resolve(true);
        } else {
          resolve(false);
        }
      }, 1000);
    });
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="login-input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="login-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-button">Login</button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default Login;