import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const SubmitFeedback = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="container mt-5 text-center">
      <h1 className="mb-4">Your feedback has been submitted!</h1>
      <button className="btn btn-primary" onClick={handleBackToHome}>
        Back to Home
      </button>
    </div>
  );
};

export default SubmitFeedback;