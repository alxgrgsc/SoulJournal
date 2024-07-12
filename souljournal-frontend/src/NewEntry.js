import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NewEntry.css';

const NewEntry = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const currentDate = new Date().toLocaleDateString();

  const handleSaveEntry = () => {
    // Logic to save the entry goes here
    console.log('Entry saved:', { title, content });
  };

  const handleDiscardEntry = () => {
    setTitle('');
    setContent('');
  };

  return (
    <div className="new-entry-container">
      <div className="new-entry-date">Date: {currentDate}</div>
      <div className="new-entry-title">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="new-entry-content">
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="10"
        ></textarea>
      </div>
      <div className="new-entry-buttons">
        <button onClick={handleSaveEntry}>Save Entry</button>
        <button onClick={handleDiscardEntry}>Discard Entry</button>
      </div>
      <div className="new-entry-navigation">
        <button onClick={() => navigate('/')}>Home</button>
        <button onClick={() => navigate('/journal')}>Journal</button>
        <button onClick={() => navigate('/settings')}>Settings</button>
      </div>
    </div>
  );
};

export default NewEntry;