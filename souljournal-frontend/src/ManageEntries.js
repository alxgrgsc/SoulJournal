import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ManageEntries.css';

const ManageEntries = () => {
  const [entries, setEntries] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editableContent, setEditableContent] = useState("");
  const [editableTitle, setEditableTitle] = useState("");

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
    setSelectedEntry(entry);
    setEditableContent(entry.content);
    setEditableTitle(entry.title);
    setShowModal(true);
    setIsEditing(false); // Change this to false so the modal opens in read-only mode
  };

  const handleSave = async () => {
    if (!selectedEntry) return;
    const updateUrl = `http://localhost:3300/journal/entries/${selectedEntry._id}`;

    try {
      const response = await fetch(updateUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: editableTitle, content: editableContent }),
      });

      if (!response.ok) {
        throw new Error('Failed to update entry');
      }

      const updatedEntry = await response.json();
      const updatedEntries = entries.map(entry =>
        entry._id === updatedEntry._id ? { ...entry, title: updatedEntry.title, content: updatedEntry.content } : entry
      );
      setEntries(updatedEntries);
      setShowModal(false);
    } catch (error) {
      console.error('Error updating entry:', error);
    }
  };

  const handleClose = () => {
    setShowModal(false);
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
          <Modal.Title>
            {isEditing ? (
              <input
                type="text"
                className="form-control"
                value={editableTitle}
                onChange={(e) => setEditableTitle(e.target.value)}
              />
            ) : (
              selectedEntry?.title
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isEditing ? (
            <textarea
              className="form-control content-textarea"
              value={editableContent}
              onChange={(e) => setEditableContent(e.target.value)}
            />
          ) : (
            <p>{selectedEntry?.content}</p>
          )}
        </Modal.Body>
        <Modal.Footer>
  {isEditing ? (
    <>
      <Button variant="primary" onClick={handleSave}>Save</Button>
      <Button variant="secondary" onClick={() => setIsEditing(false)}>Cancel</Button>
    </>
  ) : (
    <>
      <Button variant="primary" onClick={() => setIsEditing(true)}>Edit</Button>
      <Button variant="secondary" onClick={handleClose}>Close</Button>
    </>
  )}
</Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageEntries;