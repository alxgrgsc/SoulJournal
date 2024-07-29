import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './ManageEntries.css';

const ManageEntries = () => {
  const [entries, setEntries] = useState([]);
  const [currentEntry, setCurrentEntry] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedEntries, setSelectedEntries] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [entriesPerPage, setEntriesPerPage] = useState(4); // Default value

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

  useEffect(() => {
    const updateEntriesPerPage = () => {
      const width = window.innerWidth;
      if (width < 576) setEntriesPerPage(1);
      else if (width < 768) setEntriesPerPage(2);
      else if (width < 992) setEntriesPerPage(3);
      else setEntriesPerPage(4);
    };

    updateEntriesPerPage(); // Set initial value
    window.addEventListener('resize', updateEntriesPerPage);

    return () => window.removeEventListener('resize', updateEntriesPerPage);
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

    if (window.confirm('Your entry will be deleted, are you sure?')) {
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

  // Pagination related logic
  const startIndex = currentPage * entriesPerPage;
  const selectedEntriesToShow = entries.slice(startIndex, startIndex + entriesPerPage);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(entries.length / entriesPerPage) - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="d-flex row container mt-5 justify-content-center ">
      <h2>
        {entries.length > 0
          ? isDeleting
            ? "Please select one or more entries to delete."
            : "Manage Entries"
          : "There are no entries yet!"}
      </h2>
      {entries.length > 0 && (
        <>
          <Button className="btn button fixed-size-button" onClick={toggleDeleteMode}>
            {isDeleting ? "Cancel" : "Delete Entries"}
          </Button>
          {isDeleting && selectedEntries.length > 0 && (
            <>
              <Button className="btn button fixed-size-button" onClick={handleDeleteSelectedEntries} >
                Delete Selected
              </Button>
            </>
          )}
          {isDeleting && entries.length > 1 && selectedEntries.length < entries.length && (
            <>
              <Button onClick={handleSelectAll} className="ml-2 btn button fixed-size-button">
                Select All
              </Button>
            </>
          )}
          {isDeleting && selectedEntries.length > 0 && (
            <Button onClick={handleDeselectAll} className="ml-2 btn button fixed-size-button">
              Deselect All
            </Button>
          )}

            <div className="row justify-content-center">
  {selectedEntriesToShow.map((entry) => (
    <div
      key={entry._id}
      className="card entry-card m-2 col-7 col-sm-8 col-md-8 col-lg-5 col-xl-5"
      style={{
        cursor: 'pointer',
        backgroundColor: isDeleting && selectedEntries.includes(entry._id) ? '#485869' : 'white',
        color: isDeleting && selectedEntries.includes(entry._id) ? 'white' : '#485869'
      }}
      onClick={() => isDeleting && handleEntrySelection(entry._id)}
    >
          <div className="card-body" onClick={() => !isDeleting && handleEntryClick(entry)}>
            <h5 className="card-title">
              {entry.title}{' '}
              <span role="img" aria-label={`mood-${entry.mood}`}>
                {entry.mood === 1 && '😢'}
                {entry.mood === 2 && '😟'}
                {entry.mood === 3 && '😐'}
                {entry.mood === 4 && '🙂'}
                {entry.mood === 5 && '😄'}
              </span>
            </h5>
            <p className="card-text">{new Date(entry.createdAt).toLocaleDateString()}</p>
          </div>
    </div>
  ))}
            </div>


          <div className="d-flex justify-content-center mt-4 w-100">
            <Button onClick={handlePrevPage} disabled={currentPage === 0} className="btn button fixed-size-button mx-2">
              &larr; Previous
            </Button>
            <Button onClick={handleNextPage} disabled={currentPage === Math.ceil(entries.length / entriesPerPage) - 1} className="btn button fixed-size-button mx-2">
              Next &rarr;
            </Button>
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
        <Modal.Footer className="d-flex justify-content-center">
          {isEditing ? (
            <>
              <Button className="btn button fixed-size-button mx-2" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button className="btn button fixed-size-button mx-2" onClick={handleSave}>
                Save
              </Button>
            </>
          ) : (
            <>
              <Button className="btn button fixed-size-button mx-2 " onClick={handleEdit}>
                Edit
              </Button>
              <Button variant="btn button fixed-size-button mx-2" onClick={handleClose}>
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
