import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import BookmarkManager from './components/BookmarkManager';
import TopMenu from './components/TopMenu';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <Router>
      <div className="App">
        <TopMenu loggedIn={loggedIn} setLoggedIn={setLoggedIn} setCurrentUser={setCurrentUser} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setCurrentUser={setCurrentUser} />} />
          <Route path="/register" element={<Register setLoggedIn={setLoggedIn} setCurrentUser={setCurrentUser} />} />
          <Route path="/bookmarks" element={<BookmarkManager loggedIn={loggedIn} currentUser={currentUser} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
