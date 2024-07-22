import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const RegistrationSuccess = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.classList.add('show');
    }
  }, []);

  return (
    <div className="container mt-5 registration-success" ref={containerRef}>
      <div className="text-center">
        <h2>Registration Successful!</h2>
        <p>Your account has been created successfully.</p>
        <Link to="/login" className="btn button mt-3">Go to Login</Link>
      </div>
    </div>
  );
};

export default RegistrationSuccess;