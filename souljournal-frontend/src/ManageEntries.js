import React, { useState, useEffect } from 'react';

const ManageEntries = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    // Fetch entries from your API or local data source
    // This is a placeholder for your fetch logic
    const fetchEntries = async () => {
      const response = await fetch('your-api-endpoint/entries');
      const data = await response.json();
      setEntries(data);
    };

    fetchEntries();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Manage Entries</h2>
      <div className="d-flex flex-wrap">
        {entries.length > 0 ? (
          entries.map((entry) => (
            <div key={entry.id} className="card m-2" style={{ width: '18rem' }}>
              <div className="card-body">
                <h5 className="card-title">{entry.title}</h5>
                <p className="card-text">{new Date(entry.date).toLocaleDateString()}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No entries found.</p>
        )}
      </div>
    </div>
  );
};

export default ManageEntries;