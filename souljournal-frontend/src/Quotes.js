//imports
import React, { useState, useEffect } from 'react';
import './Quotes.css'; 

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

    //navigate to page
    const navigateTo = (page) => {
        window.location.href = `/${page}`;
    };

    return (
        <div className="quote-container">
            <div className="quote-text">{quote}</div>
            <div className="quote-author">{author}</div>
            <div className="quote-buttons">
                <button className="button" onClick={fetchQuote}>Next Quote</button>
                <button className="button" onClick={fetchPreviousQuote}>Previous Quote</button>
            </div>
            <footer className="footer">
                <button className="button" onClick={() => navigateTo('dashboard')}>Home</button>
                <button className="button" onClick={() => navigateTo('journal')}>Journal</button>
                <button className="button" onClick={() => navigateTo('settings')}>Settings</button>
            </footer>
        </div>
    );
};

//export
export default Quotes;