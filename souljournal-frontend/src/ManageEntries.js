import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './ManageEntries.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const ManageEntries = () => {
  const [entries, setEntries] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // New state for edit mode
  const [editableContent, setEditableContent] = useState(""); // New state for editable content

  useEffect(() => {
    const fetchEntries = async () => {
      const userEmail = localStorage.getItem('userEmail');
      if (!userEmail) {
        console.error('No user email found in local storage.');
        return;
      }
      const response = await fetch(`http://localhost:3300/journal/entries?email=${userEmail}`);
      const data = await response.json();
      setEntries(data);
    };

    fetchEntries();
  }, []);

  function formatDate(createdAt) {
    const date = new Date(createdAt);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${day}-${month}-${year}`;
  }

  const handleEntryClick = (entry) => {
    setSelectedEntry(entry); // This should already be doing what's needed
    setEditableContent(entry.content);
    setShowModal(true);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true); // Switch to edit mode
  };

  const handleSave = async () => {
    const entryId = selectedEntry._id; // Assuming selectedEntry is stored in state and has the _id property
    console.log('Saving entry with ID:', entryId);
    const updateUrl = `http://localhost:3300/journal/entries/${entryId}`; // Update with your actual API endpoint
  
    try {
      const response = await fetch(updateUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: editableContent }), // Update this based on your backend's expected format
      });
  
      if (!response.ok) {
        throw new Error('Failed to update entry');
      }
  
      const updatedEntry = await response.json();
      // Update local state with the updated entry
      const updatedEntries = entries.map(entry => 
        entry._id === updatedEntry._id ? updatedEntry : entry
      );
      setEntries(updatedEntries);
  
      console.log('Entry updated successfully');
    } catch (error) {
      console.error('Error updating entry:', error);
    }
  
    setIsEditing(false);
    setShowModal(false);
  };

  const handleClose = () => {
    setShowModal(false);
    setIsEditing(false); // Reset edit mode
  };

  return (
    <div className="container mt-5">
      <h2>Manage Entries</h2>
      <div className="d-flex flex-wrap">
        {entries.map((entry) => (
          <div key={entry._id} className="card m-2 entry-card" style={{ width: '18rem', cursor: 'pointer' }} onClick={() => handleEntryClick(entry)}>
            <div className="card-body">
              <h5 className="card-title">{entry.title}</h5>
              <p className="card-text">{formatDate(entry.createdAt)}</p>
            </div>
          </div>
        ))}
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedEntry?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isEditing ? (
            <textarea
              className="form-control"
              value={editableContent}
              onChange={(e) => setEditableContent(e.target.value)}
            />
          ) : (
            <p>{selectedEntry?.content}</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          {isEditing ? (
            <Button variant="primary" onClick={handleSave}>Save</Button>
          ) : (
            <>
              <Button variant="secondary" onClick={handleClose}>Close</Button>
              <Button variant="primary" onClick={handleEdit}>Edit</Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageEntries;