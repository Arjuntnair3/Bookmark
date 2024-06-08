import React from 'react';
import '../App.css';

const DeleteBookmark = ({ id, onDelete }) => {
  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <button onClick={handleDelete}>Delete</button>
  );
};

export default DeleteBookmark;
