//imports 
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Journal.css';

//journal component
const Journal = () => {
  const [entries, setEntries] = useState([]);
  const [currentEntry, setCurrentEntry] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editMood, setEditMood] = useState(''); 
  const [showModal, setShowModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedEntries, setSelectedEntries] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [entriesPerPage, setEntriesPerPage] = useState(4); 
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const navigate = useNavigate();


  //fetch entries
  useEffect(() => {
    const fetchEntries = async () => {
      const userEmail = localStorage.getItem('userEmail');
      if (!userEmail) {
        console.error('No user email found in local storage.');
        return;
      }

      const response = await fetch(`http://localhost:3300/journal/entries?email=${userEmail}`);
      const data = await response.json();
      //reverse entries order
      setEntries(data.reverse());
    };
    fetchEntries();
  }, []);


  //update entries per page based on window width
  useEffect(() => {
    const updateEntriesPerPage = () => {
      const width = window.innerWidth;
      if (width < 576) setEntriesPerPage(1);
      else if (width < 768) setEntriesPerPage(2);
      else if (width < 992) setEntriesPerPage(3);
      else setEntriesPerPage(4);
    };
    
    //add event listener
    updateEntriesPerPage();
    window.addEventListener('resize', updateEntriesPerPage);

    //handle before unload
    const handleBeforeUnload = (event) => {
      if (isEditing) {
        event.preventDefault();
        event.returnValue = '';
      }
    }

    //add event listeners
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('resize', updateEntriesPerPage);
    };
  }, [isEditing]);

  //handle entry click
  const handleEntryClick = (entry) => {
    setCurrentEntry(entry);
    setEditTitle(entry.title);
    setEditContent(entry.content);
    setEditMood(entry.mood);
    setShowModal(true);
  };

  //handle edit
  const handleEdit = () => {
    setIsEditing(true);
  };

  //handle save
  const handleSave = async () => {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      console.error('No user email found in local storage.');
      return;
    }

    if (window.confirm('Your entry will be updated, are you sure?')) {
      const response = await fetch(`http://localhost:3300/journal/entries/${currentEntry._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: editTitle, content: editContent, mood: editMood }),
      });

      if (response.ok) {
        const updatedEntry = await response.json();
        setEntries((prevEntries) =>
          prevEntries.map((entry) => (entry._id === updatedEntry._id ? updatedEntry : entry))
        );
        setNotificationMessage('Your entry has been updated!');
        setIsEditing(false);
        setShowModal(false);
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(false);
        }, 2500);
      } else {
        console.error('Failed to update entry.');
      }
    }
  }

  //handle close
  const handleClose = () => {
    setShowModal(false);
    setIsEditing(false);
  };

  //handle delete selected entries
  const handleDeleteSelectedEntries = async () => {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      console.error('No user email found in local storage.');
      return;
    }

    const entryString = selectedEntries.length > 1 ? 'entries' : 'entry';

    if (window.confirm(`Are you sure you want to delete the selected ${entryString}?`)) {
      await Promise.all(
        selectedEntries.map((entryId) =>
          fetch(`http://localhost:3300/journal/entries/${entryId}`, {
            method: 'DELETE',
          })
        )
      );



      //refresh entries after deletion
      const response = await fetch(`http://localhost:3300/journal/entries?email=${userEmail}`);
      const data = await response.json();
      setEntries(data);

      //reset deletion state
      setNotificationMessage(`Your ${entryString} has been deleted!`);
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 2500);
      setIsDeleting(false);
      setSelectedEntries([]);

    }
  };

  //handle entry selection
  const handleEntrySelection = (entryId) => {
    if (selectedEntries.includes(entryId)) {
      setSelectedEntries(selectedEntries.filter((id) => id !== entryId));
    } else {
      setSelectedEntries([...selectedEntries, entryId]);
    }
  };

  //format date
  function formatDate(createdAt) {
    const date = new Date(createdAt);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${day}-${month}-${year}`;
  }

  //handle select all
  const handleSelectAll = () => {
    const allEntryIds = entries.map(entry => entry._id);
    setSelectedEntries(allEntryIds);
  };

  //handle deselect all
  const handleDeselectAll = () => {
    setSelectedEntries([]);
  };

  //toggle delete mode
  const toggleDeleteMode = () => {
    if (isDeleting) {
      setSelectedEntries([]);
    }
    setIsDeleting(!isDeleting);
  };

  //pagination logic 
  const startIndex = currentPage * entriesPerPage;
  const selectedEntriesToShow = entries.slice(startIndex, startIndex + entriesPerPage);

  //handle next page
  const handleNextPage = () => {
    if (currentPage < Math.ceil(entries.length / entriesPerPage) - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  //handle previous page
  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="d-flex row container mt-5 justify-content-center ">
      {showNotification && (
        <Alert variant="success" className="animation">
          {notificationMessage}
        </Alert>
      )}
      <h2>
        {entries.length > 0
          ? isDeleting
            ? "Please select one or more entries to delete."
            : "Journal Entries"
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
              <Form.Group controlId="editMood">
                <Form.Label>Mood</Form.Label>
                <Form.Control
                  as="select"
                  value={editMood}
                  onChange={(e) => setEditMood(e.target.value)}
                >
                  <option value={1}>😢 Sad</option>
                  <option value={2}>😟 Worried</option>
                  <option value={3}>😐 Neutral</option>
                  <option value={4}>🙂 Happy</option>
                  <option value={5}>😄 Very Happy</option>
                </Form.Control>
              </Form.Group>
            </Form>
          ) : (
            <div>
              <h2>{currentEntry?.title}                 <span role="img" aria-label={`mood-${currentEntry?.mood}`}>
                {currentEntry?.mood === 1 && '😢'}
                {currentEntry?.mood === 2 && '😟'}
                {currentEntry?.mood === 3 && '😐'}
                {currentEntry?.mood === 4 && '🙂'}
                {currentEntry?.mood === 5 && '😄'}
              </span></h2>
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
              <Button className="btn button fixed-size-button mx-2 " onClick={handleClose}>
                Close
              </Button>
              <Button variant="btn button fixed-size-button mx-2" onClick={handleEdit}>
                Edit
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
      <div className="d-flex justify-content-center mt-4 w-100">
              <Button onClick={() => navigate('/home')} className="btn button fixed-size-button mx-2 ">
        Home
      </Button>
      <Button onClick={() => navigate('/new-entry')} className="btn button fixed-size-button mx-2 ">
        New Entry
      </Button>
      </div>

    </div>
  );
};

//export journal component
export default Journal;
