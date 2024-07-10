import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.classList.add('show');
    }
  }, []);

  return (
    <div className="forgot-password">
      <div ref={containerRef} className="forgot-password-container">
        <h1 className="forgot-password-title">Forgot Password</h1>
        <form className="forgot-password-form">
          <input type="email" className="forgot-password-input" placeholder="Email" required />
          <button type="submit" className="forgot-password-button">Reset Password</button>
        </form>
        <div className="forgot-password-links">
          <Link to="/" className="forgot-password-link">Home</Link>
          <Link to="/login" className="forgot-password-link">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;