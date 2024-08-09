//imports 
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Feedback.css';

//feedback component
const Feedback = () => {
  const [feedback, setFeedback] = useState('');
  const [stars, setStars] = useState(0);
  const [hoverStars, setHoverStars] = useState(0);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  //handle submit feedback
  const handleSubmitFeedback = async (event) => {
    event.preventDefault();

    //retrieve data from local storage
    const email = localStorage.getItem('userEmail');
    const firstName = localStorage.getItem('firstName');
    const lastName = localStorage.getItem('lastName'); 
    const feedbackData = { firstName, lastName, feedback, email, stars };
    
    //log feedback data
    console.log('Submitting feedback:', feedbackData); 

    //fetch feedback data
    try {
      const response = await fetch('http://localhost:3300/feedback/submit-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feedbackData),
      });

      //check if response is ok
      if (response.ok) {
        navigate('/home', { state: { from: 'feedback' } });
      } else {
        const data = await response.json();
        setError(data.message || 'Feedback submission failed');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  //handle discard feedback
  const handleDiscard = () => {
    if (window.confirm('Your feedback will be discarded, are you sure?')) {
      setFeedback('');
      setStars(0);
      setHoverStars(0);
      setError('');
      navigate("/home");
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

        {/* star rating */}
        <div className="star-rating">
        <label className="form-label">Stars</label>
          {[1, 2, 3, 4, 5].map((star) => (
            <i
              key={star}
              className={`fa fa-star ${star <= (hoverStars || stars) ? 'checked' : ''}`}
              onClick={() => setStars(star)}
              onMouseEnter={() => setHoverStars(star)}
              onMouseLeave={() => setHoverStars(stars)}
              style={{ cursor: 'pointer', fontSize: '1.5rem', color: star <= (hoverStars || stars) ? '#303b47' : '#6d7c8b' }}
            />
          ))}
        </div>

        
        {error && <div className="alert alert-danger">{error}</div>}
        

        <button type="button" className="btn button" onClick={handleDiscard}>Discard Feedback</button>
        <button type="submit" className="btn button">Submit Feedback</button>
      </form>
    </div>
  );
};

//export feedback component
export default Feedback;