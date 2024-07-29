import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const EntrySubmitted = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/dashboard');
  };

  return (
    <div className="container submit-feedback-container mt-5 text-center">
      <h1 className="mb-4">Your entry has been saved!</h1>
      <button className="btn button fixed-size-button" onClick={() => navigate('/dashboard')}>
        Dashboard
      </button>
      <button className="btn button fixed-size-button" onClick={() => navigate('/journal')}>
        Journal
      </button>
    </div>
  );
};

export default EntrySubmitted;