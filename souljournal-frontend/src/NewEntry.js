import React, { useState } from 'react';
import './NewEntry.css';

const NewEntry = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const currentDate = new Date().toLocaleDateString();

  const handleDiscard = () => {
    if (window.confirm('Your entry will be discarded, are you sure?')) {
      setTitle('');
      setContent('');
    }
  };

  const handleNavigation = (path) => {
    if (window.confirm('Your entry will be discarded, are you sure?')) {
      // Navigate to the specified path
      window.location.href = path;
    }
  };

  const handleSave = () => {
    // Implement save functionality here
    console.log('Entry saved:', { title, content });
    // You can add code to save the entry to a database or state management
  };

  return (
    <div className="new-entry-container">
      <h1 className="new-entry-title">New Entry</h1>
      <div className="new-entry-date">Date: {currentDate}</div>
      <div className="entry-title">
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
        <button onClick={handleDiscard}>Discard Entry</button>
        <button onClick={() => handleNavigation('/home')}>Home</button>
        <button onClick={() => handleNavigation('/journal')}>Journal</button>
        <button onClick={() => handleNavigation('/settings')}>Settings</button>
        <button onClick={handleSave}>Save Entry</button> {/* Added Save Entry button */}
      </div>
    </div>
  );
};

export default NewEntry;