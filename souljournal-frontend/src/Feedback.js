import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Feedback.css';

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleSubmitFeedback = () => {
    // Logic to submit feedback goes here
    navigate('/submit-feedback');
  };

  return (
    <div className={`feedback-container ${isLoaded ? 'show' : ''}`}>
      <h1>We value your feedback!</h1>
      <p>Please share your thoughts with us.</p>

      <div className="star-rating">
        {[...Array(5)].map((star, index) => {
          const ratingValue = index + 1;
          return (
            <span
              key={index}
              className={`star ${ratingValue <= (hover || rating) ? 'selected' : ''}`}
              onClick={() => setRating(ratingValue)}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(0)}
            >
              &#9733;
            </span>
          );
        })}
      </div>

      <label htmlFor="feedback-type">Select Feedback Type:</label>
      <select id="feedback-type">
        <option value="bugs">Bugs</option>
        <option value="suggestions">Suggestions</option>
      </select>

      <label htmlFor="comments">Comments:</label>
      <textarea id="comments" rows="4" placeholder="Enter your comments here..."></textarea>

      <label htmlFor="email">Email:</label>
      <input type="email" id="email" placeholder="Enter your email" />

      <button id="submit-feedback" onClick={handleSubmitFeedback}>Submit Feedback</button>
    </div>
  );
};

export default Feedback;