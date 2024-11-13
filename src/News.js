// src/News.js
import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './News.css';

function News() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  // Get the category from the query string in the URL
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || 'business'; // Default to 'business' if no category is selected

  // Fetch the news articles
  const fetchNews = async () => {
    if (!navigator.onLine) {
      setError('No internet connection. Please check your network.');
      setLoading(false);
      return;
    }

    setLoading(true); // Show loading spinner
    setError(null); // Reset error state
    try {
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&category=${category}&page=${currentPage}&pageSize=${pageSize}&apiKey=959040c9954c4979a2376918b57aeaf5`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      console.log("Fetched data:", data); // Debug log
      setArticles(data.articles);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching news:', error);
      setError('Failed to fetch news. Please try again.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [currentPage, category]); // Re-fetch when category or currentPage changes

  const handleRetry = () => {
    setError(null); // Clear error
    fetchNews(); // Retry fetching news on button click
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNext = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="news-container">
      <h1 className="news-title">Top {category.charAt(0).toUpperCase() + category.slice(1)} News</h1>

      {loading && (
        <div className="spinner-container">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}

      {error && !loading && (
        <div className="error-page d-flex flex-column align-items-center">
          <i className="bi bi-wifi-off display-1 text-danger mb-3"></i>
          <h2>{error}</h2>
          <button onClick={handleRetry} className="btn btn-primary mt-3">
            <i className="bi bi-arrow-clockwise me-2"></i> Retry
          </button>
        </div>
      )}

      {!loading && !error && (
        <>
          <div className="news-grid">
            {articles.map((article, index) => (
              <div key={index} className="news-article">
                {article.urlToImage && (
                  <img src={article.urlToImage} alt={article.title} className="news-image" />
                )}
                <h2 className="news-headline">{article.title}</h2>
                <p className="news-description">{article.description}</p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="read-more"
                >
                  Read More
                </a>
              </div>
            ))}
          </div>

          {/* Pagination Buttons */}
          <div className="pagination mt-4 d-flex justify-content-between">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className="btn btn-dark"
            >
              <i className="bi bi-arrow-left me-2"></i> Previous
            </button>
            <span>Page {currentPage}</span>
            <button
              onClick={handleNext}
              disabled={articles.length < pageSize}
              className="btn btn-dark"
            >
              Next <i className="bi bi-arrow-right ms-2"></i>
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default News;
