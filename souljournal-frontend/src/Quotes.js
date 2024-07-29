//imports
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Quotes.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';

//quotes component
const Quotes = () => {
    const [quote, setQuote] = useState('');
    const [author, setAuthor] = useState('');
    const [quoteHistory, setQuoteHistory] = useState([]);
    const [currentQuoteIndex, setCurrentQuoteIndex] = useState(-1);


    useEffect(() => {
        fetchQuote();
    }, []);

    //fetch quote
    const fetchQuote = () => {
        fetch('https://api.quotable.io/random')
            .then(response => response.json())
            .then(data => {
                setQuote(data.content);
                setAuthor(data.author);
                setQuoteHistory([...quoteHistory, { text: data.content, author: data.author }]);
                setCurrentQuoteIndex(currentQuoteIndex + 1);
            })
            .catch(console.error);
    };

    //fetch previous quote
    const fetchPreviousQuote = () => {
        if (currentQuoteIndex > 0) {
            const previousIndex = currentQuoteIndex - 1;
            const previousQuote = quoteHistory[previousIndex];
            setQuote(previousQuote.text);
            setAuthor(previousQuote.author);
            setCurrentQuoteIndex(previousIndex);
        } else {
            alert('No previous quotes available.');
        }
    };

    const navigate = useNavigate();

    return (
        <div className="container mt-5 quote-container">
            <div className="card-body">
              <div className="quote-text card-text">{quote}</div>
              <div className="quote-author card-subtitle mb-2 text-muted">{author}</div>
              <div className="quote-buttons d-flex  mt-3">
                <button className="btn button fixed-size-button" onClick={fetchQuote}>Next Quote</button>
                <button className="btn button fixed-size-button" onClick={fetchPreviousQuote}>Previous Quote</button>
              </div>
                <div className="quote-buttons d-flex mt-3">
                <button className="btn button fixed-size-button " onClick={() => navigate('/dashboard')}>Home</button>
                <button className="btn button fixed-size-button " onClick={() => navigate('/journal')}>Journal</button>
              
              </div>
            </div>

        </div>
      );
};

//export
export default Quotes;