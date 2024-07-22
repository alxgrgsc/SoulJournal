import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './EntrySubmitted.css';

const EntrySubmitted = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/dashboard');
  };

  return (
    <div className="container submit-feedback-container mt-5 text-center">
      <h1 className="mb-4">Your entry has been submitted!</h1>
      <button className="btn btn-primary" onClick={handleBackToHome}>
        Back to Home
      </button>
    </div>
  );
};

export default EntrySubmitted;