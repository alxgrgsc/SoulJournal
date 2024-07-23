//imports 
import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './FeedbackSubmitted.css';

//feedback submitted component
const FeedbackSubmitted = () => {
  const navigate = useNavigate();

  //handle back to home
  const handleBackToHome = () => {
    navigate('/dashboard');
  };

  return (
    <div className="container submit-feedback-container mt-5 text-center">
      <h1 className="mb-4">Your feedback has been submitted!</h1>
      <button className="btn " onClick={handleBackToHome}>
        Back to Home
      </button>
    </div>
  );
};

//export feedback submitted component
export default FeedbackSubmitted;