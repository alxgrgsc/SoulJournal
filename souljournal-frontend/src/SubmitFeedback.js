import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SubmitFeedback.css';

const SubmitFeedback = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="submit-feedback-container">
      <h1>Your feedback has been submitted!</h1>
      <p>Thank you for your valuable feedback.</p>
      <button onClick={handleBackToHome}>Back to Home</button>
    </div>
  );
};

export default SubmitFeedback;