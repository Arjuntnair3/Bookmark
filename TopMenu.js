import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import Logout from './Logout';

const TopMenu = ({ loggedIn, setLoggedIn, setCurrentUser }) => {
  return (
    <div className="top-menu">
      <h1>Bookmark Manager</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {!loggedIn ? (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/bookmarks">Bookmarks</Link>
              </li>
              <li>
                <Logout setLoggedIn={setLoggedIn} setCurrentUser={setCurrentUser} />
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default TopMenu;
