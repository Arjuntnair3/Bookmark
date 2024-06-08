import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Logout = ({ setLoggedIn, setCurrentUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setLoggedIn(false);
    setCurrentUser(null);
    navigate('/');
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      Logout
    </button>
  );
};

export default Logout;
