import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './RegistrationSuccess.css';

const RegistrationSuccess = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.classList.add('show');
    }
  }, []);

  return (
    <div ref={containerRef} className="registration-success">
      <h1>Registration Successful!</h1>
      <p>Thank you for registering. You can now log in to your account.</p>
      <Link to="/login">
        <button className="success-button">Go to Login</button>
      </Link>
    </div>
  );
};

export default RegistrationSuccess;