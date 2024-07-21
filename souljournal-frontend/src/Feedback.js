import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Feedback.css';

const Feedback = () => {
  const [name, setName] = useState('');
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');
  const [stars, setStars] = useState(0);
  const [hoverStars, setHoverStars] = useState(0);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmitFeedback = async (event) => {
    event.preventDefault();
    const feedbackData = { name, feedback, email, stars };
    console.log('Submitting feedback:', feedbackData); // Log the feedback data

    try {
      const response = await fetch('http://localhost:3300/feedback/submit-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feedbackData),
      });

      if (response.ok) {
        navigate('/feedback-success');
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
      setStars(0); // Reset stars to default
      setHoverStars(0); // Reset hover stars to default
      window.location.href = '/dashboard'; // Redirect to the dashboard
    }
  };

  return (
    <div className="container mt-5 feedback-container">
      <h2>Feedback</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmitFeedback}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="feedback" className="form-label">Feedback</label>
          <textarea
            className="form-control"
            id="feedback"
            placeholder="Your feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Rating</label>
          <div>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`fa fa-star ${star <= (hoverStars || stars) ? 'checked' : ''}`}
                onClick={() => setStars(star)}
                onMouseEnter={() => setHoverStars(star)}
                onMouseLeave={() => setHoverStars(stars)}
                style={{ cursor: 'pointer', fontSize: '1.5rem', color: star <= (hoverStars || stars) ? '#485869' : '#e4e5e9' }}
              />
            ))}
          </div>
        </div>
        <button type="submit" className="btn btn-primary button">Submit Feedback</button>
        <button type="submit" className="btn btn-primary button" onClick = {handleDiscard}>Discard Feedback</button>
      </form>
    </div>
  );
};

export default Feedback;