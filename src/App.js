// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './Dashboard';
import News from './News';

function App() {
  const categories = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">News App</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">Dashboard</Link>
              </li>
              {/* Dynamic category links */}
              {categories.map((category) => (
                <li className="nav-item" key={category}>
                  <Link className="nav-link" to={`/news?category=${category}`}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      {/* Define the Routes */}
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/news" element={<News />} />
      </Routes>
    </Router>
  );
}

export default App;
