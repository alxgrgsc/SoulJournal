import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Feedback.css';

const Feedback = () => {
  const [name, setName] = useState('');
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmitFeedback = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3300/feedback/submit-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, feedback, email }),
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

        <label htmlFor="feedback">Feedback:</label>
        <textarea
          id="feedback"
          rows="4"
          placeholder="Enter your feedback here..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        ></textarea>

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
};

export default Feedback;