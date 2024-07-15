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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem('userEmail')

    const response = await fetch('http://localhost:3300/journal/new_entry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content, email }),
    });

    if (response.ok) {
      const result = await response.json();
      console.log('Entry saved:', result);
      setTitle('');
      setContent('');
    } else {
      console.error('Failed to save entry');
    }
  };

  return (
    <div className="new-entry">
      <form onSubmit={handleSubmit}>
        <div className="current-date">{currentDate}</div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          required
        />
        <div className="button-group">
          <button type="submit" className="save-button">Save Entry</button>
          <button type="button" className="discard-button" onClick={handleDiscard}>Discard</button>
        </div>
      </form>
    </div>
  );
};

export default NewEntry;