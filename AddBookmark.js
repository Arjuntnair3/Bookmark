import React, { useState } from 'react';
import '../App.css';

const AddBookmark = ({ handleAddBookmark, bookmarks }) => {
  const [formData, setFormData] = useState({ title: '', url: '' });
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, url } = formData;

    if (!title || !url) {
      setErrorMessage('Please provide both title and URL.');
      return;
    }

    if (bookmarks.length >= 5) {
      setErrorMessage('You can only add up to 5 bookmarks.');
      return;
    }

    const newBookmark = { title, url, id: Date.now(), addedTime: new Date().toLocaleString() };
    handleAddBookmark(newBookmark);
    setFormData({ title: '', url: '' });
    setErrorMessage('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="add-bookmark">
      <h2>Add Bookmark</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="url">URL:</label>
          <input
            type="url"
            id="url"
            name="url"
            value={formData.url}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Add Bookmark</button>
        {errorMessage && <p className="error">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default AddBookmark;
