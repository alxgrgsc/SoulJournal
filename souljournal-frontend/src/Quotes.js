import React, { useState, useEffect } from 'react';
import './Quotes.css';

const Quotes = () => {
    const [quote, setQuote] = useState('');
    const [author, setAuthor] = useState('');

    const fetchQuote = async () => {
        try {
            const response = await fetch('https://api.quotable.io/random');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setQuote(data.content);
            setAuthor(data.author);
        } catch (error) {
            console.error('There was a problem with your fetch operation:', error);
            setQuote('Failed to fetch quote. Please try again later.');
            setAuthor('');
        }
    };

    useEffect(() => {
      fetchQuote();
      const quoteContainer = document.querySelector('.quote-container');
      if (quoteContainer) {
          quoteContainer.classList.add('loaded');
      }
  }, []);

    const shareQuote = () => {
        const shareText = `"${quote}" - ${author}`;
        if (navigator.share) {
            navigator.share({
                title: 'Quote',
                text: shareText,
            }).catch(console.error);
        } else {
            alert('Share feature is not supported in your browser.');
        }
    };

    const navigateTo = (page) => {
        window.location.href = `/${page}`;
    };

    return (
        <div className="quote-container">
            <div className="quote-text">{quote}</div>
            <div className="quote-author">{author}</div>
            <div className="quote-buttons">
                <button className="button" onClick={fetchQuote}>Refresh Quote</button>
                <button className="button" onClick={shareQuote}>Share Quote</button>
            </div>
            <footer className="footer">
                <button className="button" onClick={() => navigateTo('home')}>Home</button>
                <button className="button" onClick={() => navigateTo('journal')}>Journal</button>
                <button className="button" onClick={() => navigateTo('settings')}>Settings</button>
            </footer>
        </div>
    );
};

export default Quotes;