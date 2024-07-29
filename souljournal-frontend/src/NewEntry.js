//imports 
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NewEntry.css';

//NewEntry component
const NewEntry = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState(3); // Default mood is neutral
  const currentDate = new Date().toLocaleDateString();
  const navigate = useNavigate();

  //handle discard
  const handleDiscard = () => {
    if (window.confirm('Your entry will be discarded, are you sure?')) {
      setTitle('');
      setContent('');
      setMood(3); // Reset mood to neutral
      navigate('/dashboard');
    }
  };

  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem('userEmail');

    const response = await fetch('http://localhost:3300/journal/new_entry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content, mood, email }),
    });

    if (response.ok) {
      const result = await response.json();
      navigate(`/entry-submitted`);
    } else {
      console.error(`Failed to save entry`);
    }

  };

  return (
    <div className="container-fluid mt-5">
      <h1 className="mb-4">New Entry</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Date</label>
          <div className="form-control-plaintext">{currentDate}</div>
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">Content</label>
          <textarea
            className="form-control"
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Mood</label>
          <div className="d-flex justify-content-between mood-category">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                className={`btn mood-button ${mood === value ? 'checked-mood' : ''}`}
                onClick={() => setMood(value)}
              >
                <span role="img" aria-label={`mood-${value}`}>
                  {value === 1 && '😢'}
                  {value === 2 && '😟'}
                  {value === 3 && '😐'}
                  {value === 4 && '🙂'}
                  {value === 5 && '😄'}
                </span>
              </button>
            ))}
          </div>
        </div>
        <div className="button-group">
          <button type="submit" className="btn button fixed-size-button">Save Entry</button>
          <button type="button" className="btn button fixed-size-button" onClick={handleDiscard}>Discard</button>
        </div>
      </form>
    </div>
  );
};

//export
export default NewEntry;