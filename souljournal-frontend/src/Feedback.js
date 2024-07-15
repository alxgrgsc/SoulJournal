import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
        alert('Feedback submitted successfully!');
        navigate('/submit-feedback');
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to submit feedback');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  const Star = ({ filled, onClick, onMouseEnter, onMouseLeave }) => (
    <span
      style={{ color: filled ? 'black' : 'grey', cursor: 'pointer', fontSize: '24px' }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      ★
    </span>
  );

  return (
    <div className="feedback-container">
      <h1>We value your feedback!</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmitFeedback}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="feedback">Feedback:</label>
        <textarea
          id="feedback"
          rows="4"
          placeholder="Enter your feedback here..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />

        <label htmlFor="stars">Stars:</label>
        <div id="stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              filled={star <= (hoverStars || stars)}
              onClick={() => setStars(star)}
              onMouseEnter={() => setHoverStars(star)}
              onMouseLeave={() => setHoverStars(0)}
            />
          ))}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Feedback;