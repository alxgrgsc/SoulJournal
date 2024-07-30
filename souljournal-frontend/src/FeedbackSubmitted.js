//imports 
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './FeedbackSubmitted.css';

//feedback submitted component
const FeedbackSubmitted = () => {
  const navigate = useNavigate();



  return (
    <div className="container mt-5 text-center">
      <h1 className="mb-4">Your feedback has been submitted!</h1>
      <button className="btn button fixed-size-button" onClick={() => navigate('/home')}>
        Home
      </button>
      
    </div>
  );
};

//export feedback submitted component
export default FeedbackSubmitted;