import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.classList.add('show');
    }
  }, []);

  return (
    <div className="register">
      <div ref={containerRef} className="register-container">
        <h1 className="register-title">Register</h1>
        <form className="register-form">
          <input type="text" className="register-input" placeholder="Name" required />
          <input type="email" className="register-input" placeholder="Email" required />
          <input type="password" className="register-input" placeholder="Password" required />
          <input type="password" className="register-input" placeholder="Repeat Password" required />
          <button type="submit" className="register-button">Register</button>
        </form>
        <div className="register-links">
          <Link to="/" className="register-link">Home</Link>
          <Link to="/login" className="register-link">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;