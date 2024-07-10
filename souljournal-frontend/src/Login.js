import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.classList.add('show');
    }
  }, []);

  return (
    <div className="login">
      <div ref={containerRef} className="login-container">
        <h1 className="login-title">Login</h1>
        <form className="login-form">
          <input type="email" className="login-input" placeholder="Email" required />
          <input type="password" className="login-input" placeholder="Password" required />
          <Link to="/forgot-password" className="forgot-password-linked">Forgot Password?</Link>
          <button type="submit" className="login-button">Login</button>
        </form>
        <div className="login-links">
          <Link to="/" className="login-link">Home</Link>
          <Link to="/register" className="login-link">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;