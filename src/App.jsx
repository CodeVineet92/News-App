import React, { useState, useEffect } from 'react';
import './App.css';

const API_KEY = import.meta.env.VITE_NEWS_API_KEY; // Correct way to access environment variables in Vite
const API_URL = `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${API_KEY}`;

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data && Array.isArray(data.articles)) {
          setArticles(data.articles);
        } else {
          throw new Error('Invalid data structure returned');
        }
      } catch (error) {
        setError(`Error: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="container">
      <h1 className="heading">BBC News Headlines</h1>
      {articles.length > 0 ? (
        <ul className="content-list">
          {articles.map((article, index) => (
            <li key={index} className="content-item">
              <h2>{article.title || 'No title available'}</h2>
              <p>{article.description || 'No description available'}</p>
              <a
                href={article.url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="link"
              >
                Read more
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No content available</p>
      )}
    </div>
  );
}

export default App;
