import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ManageEntries = () => {
  const [entries, setEntries] = useState([]);
  const [currentEntry, setCurrentEntry] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedEntries, setSelectedEntries] = useState([]);

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

  const handleEntryClick = (entry) => {
    setCurrentEntry(entry);
    setEditTitle(entry.title);
    setEditContent(entry.content);
    setShowModal(true);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      console.error('No user email found in local storage.');
      return;
    }

    const response = await fetch(`http://localhost:3300/journal/entries/${currentEntry._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: editTitle, content: editContent }),
    });

    if (response.ok) {
      const updatedEntry = await response.json();
      setEntries((prevEntries) =>
        prevEntries.map((entry) => (entry._id === updatedEntry._id ? updatedEntry : entry))
      );
      setIsEditing(false);
      setShowModal(false);
    } else {
      console.error('Failed to update entry.');
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setIsEditing(false);
  };

  const handleDeleteSelectedEntries = async () => {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      console.error('No user email found in local storage.');
      return;
    }

    if (window.confirm('Your entry will be deleted, are you sure?')){
    await Promise.all(
      selectedEntries.map((entryId) =>
        fetch(`http://localhost:3300/journal/entries/${entryId}`, {
          method: 'DELETE',
        })
      )
    );

    // Refresh entries after deletion
    const response = await fetch(`http://localhost:3300/journal/entries?email=${userEmail}`);
    const data = await response.json();
    setEntries(data);

    // Reset deletion state
    setIsDeleting(false);
    setSelectedEntries([]);
  }
};

  const handleEntrySelection = (entryId) => {
    if (selectedEntries.includes(entryId)) {
      setSelectedEntries(selectedEntries.filter((id) => id !== entryId));
    } else {
      setSelectedEntries([...selectedEntries, entryId]);
    }
  };

  function formatDate(createdAt) {
    const date = new Date(createdAt);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${day}-${month}-${year}`;
  }

  const handleSelectAll = () => {
    const allEntryIds = entries.map(entry => entry._id);
    setSelectedEntries(allEntryIds);
  };
  const handleDeselectAll = () => {
    setSelectedEntries([]);
  };

  const toggleDeleteMode = () => {
    if (isDeleting) {
      setSelectedEntries([]);
    }
    setIsDeleting(!isDeleting);
  };

  return (
    <div className="container mt-5">
      <h2>{entries.length > 0 ? "Manage Entries" : "There are no entries yet!"}</h2>
      {entries.length > 0 && (
        <>
          <Button variant="danger" onClick={toggleDeleteMode}>
            {isDeleting ? "Cancel" : "Delete"}
          </Button>
          {isDeleting && selectedEntries.length > 0 && (
            <>
              <Button variant="danger" onClick={handleDeleteSelectedEntries} className="ml-2">
                Delete Selected
              </Button>
            </>
          )}
        {isDeleting && entries.length > 1 && selectedEntries.length < entries.length && (
          <>
            <Button variant="primary" onClick={handleSelectAll} className="ml-2">
              Select All
            </Button>
          </>
        )}
        {isDeleting && selectedEntries.length > 0 && (
          <Button variant="secondary" onClick={handleDeselectAll} className="ml-2">
            Deselect All
          </Button>
        )}
          <div className="d-flex flex-wrap">
            {entries.map((entry) => (
              <div
                key={entry._id}
                className="card m-2 entry-card"
                style={{
                  width: '18rem',
                  cursor: 'pointer',
                  backgroundColor: isDeleting && selectedEntries.includes(entry._id) ? '#f8d7da' : 'white'
                }}
                onClick={() => isDeleting && handleEntrySelection(entry._id)}
              >
                <div className="card-body" onClick={() => !isDeleting && handleEntryClick(entry)}>
                  <h5 className="card-title">{entry.title}</h5>
                  <p className="card-text">{formatDate(entry.createdAt)}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Edit Entry' : formatDate(currentEntry?.createdAt)}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isEditing ? (
            <Form>
              <Form.Group controlId="editTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="editContent">
                <Form.Label>Content</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                />
              </Form.Group>
            </Form>
          ) : (
            <div>
              <h2>{currentEntry?.title}</h2>
              <p>{currentEntry?.content}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          {isEditing ? (
            <>
              <Button variant="secondary" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSave}>
                Save
              </Button>
            </>
          ) : (
            <>
              <Button variant="primary" onClick={handleEdit}>
                Edit
              </Button>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageEntries;