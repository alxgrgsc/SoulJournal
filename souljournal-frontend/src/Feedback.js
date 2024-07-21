import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Feedback.css';

const Feedback = () => {
  const [feedback, setFeedback] = useState('');
  const [stars, setStars] = useState(0);
  const [hoverStars, setHoverStars] = useState(0);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmitFeedback = async (event) => {
    event.preventDefault();

    // Retrieve data from local storage
    const email = localStorage.getItem('userEmail'); // Retrieve email from local storage
    const firstName = localStorage.getItem('firstName'); // Retrieve firstname from local storage
    const lastName = localStorage.getItem('lastName'); // Retrieve lastname from local storage
    const feedbackData = { firstName, lastName, feedback, email, stars };
    console.log('Submitting feedback:', feedbackData); // Log the feedback data

    try {
      const response = await fetch('http://localhost:3300/feedback/submit-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feedbackData),
      });

      if (response.ok) {
        navigate('/submit-feedback');
      } else {
        const data = await response.json();
        setError(data.message || 'Feedback submission failed');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  const handleDiscard = () => {
    if (window.confirm('Your feedback will be discarded, are you sure?')) {
      setFeedback('');
      setStars(0);
      setHoverStars(0);
      setError('');
      navigate("/dashboard");
    }
  };

  return (
    <div className="feedback">
      <h2>Feedback</h2>
      <form onSubmit={handleSubmitFeedback}>
        <div className="mb-3">
          <label className="form-label">Content</label>
          <textarea
            className="form-control"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
        </div>
        <div className="star-rating">
        <label className="form-label">Stars</label>
          {[1, 2, 3, 4, 5].map((star) => (
            <i
              key={star}
              className={`fa fa-star ${star <= (hoverStars || stars) ? 'checked' : ''}`}
              onClick={() => setStars(star)}
              onMouseEnter={() => setHoverStars(star)}
              onMouseLeave={() => setHoverStars(stars)}
              style={{ cursor: 'pointer', fontSize: '1.5rem', color: star <= (hoverStars || stars) ? '#485869' : '#e4e5e9' }}
            />
          ))}
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        
        <button type="submit" className="btn btn-primary button">Submit Feedback</button>
        <button type="button" className="btn btn-secondary button" onClick={handleDiscard}>Discard Feedback</button>
      </form>
    </div>
  );
};

export default Feedback;