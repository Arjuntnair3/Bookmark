import React, { useState, useEffect } from 'react';
import '../App.css';

const BookmarkManager = ({ loggedIn, currentUser }) => {
  const [formData, setFormData] = useState({ title: '', url: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [bookmarks, setBookmarks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedData, setEditedData] = useState({ title: '', url: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [bookmarkToDelete, setBookmarkToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Number of items per page

  useEffect(() => {
    if (currentUser) {
      const storedBookmarks = localStorage.getItem(`bookmarks_${currentUser}`);
      if (storedBookmarks) {
        setBookmarks(JSON.parse(storedBookmarks));
      }
    }
  }, [currentUser]);

  const handleAddBookmark = (e) => {
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
    const newBookmarks = [...bookmarks, newBookmark];
    setBookmarks(newBookmarks);
    localStorage.setItem(`bookmarks_${currentUser}`, JSON.stringify(newBookmarks));
    setFormData({ title: '', url: '' });
    setErrorMessage('');
  };

  const handleDeleteBookmark = () => {
    const updatedBookmarks = bookmarks.filter((bookmark) => bookmark.id !== bookmarkToDelete.id);
    setBookmarks(updatedBookmarks);
    localStorage.setItem(`bookmarks_${currentUser}`, JSON.stringify(updatedBookmarks));
    setShowDeletePopup(false);
    setBookmarkToDelete(null);
  };

  const handleEditBookmark = (id) => {
    const bookmark = bookmarks.find((bookmark) => bookmark.id === id);
    setEditingId(id);
    setEditedData({ title: bookmark.title, url: bookmark.url });
  };

  const handleUpdateBookmark = () => {
    const updatedBookmarks = bookmarks.map((bookmark) =>
      bookmark.id === editingId ? { ...bookmark, ...editedData } : bookmark
    );
    setBookmarks(updatedBookmarks);
    localStorage.setItem(`bookmarks_${currentUser}`, JSON.stringify(updatedBookmarks));
    setEditingId(null);
    setEditedData({ title: '', url: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditedInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredBookmarks = bookmarks.filter((bookmark) =>
    bookmark.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bookmark.url.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bookmark-manager">
      <h2>Bookmark Manager</h2>
      {loggedIn && (
        <form onSubmit={handleAddBookmark}>
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
      )}
      <div>
        <input
          type="text"
          placeholder="Search bookmarks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>URL</th>
            <th>Date Added</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredBookmarks
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((bookmark) => (
              <tr key={bookmark.id}>
                <td>
                  {editingId === bookmark.id ? (
                    <input
                      type="text"
                      name="title"
                      value={editedData.title}
                      onChange={handleEditedInputChange}
                    />
                  ) : (
                    bookmark.title
                  )}
                </td>
                <td>
                  {editingId === bookmark.id ? (
                    <input
                      type="url"
                      name="url"
                      value={editedData.url}
                      onChange={handleEditedInputChange}
                    />
                  ) : (
                    <a href={bookmark.url} target="_blank" rel="noopener noreferrer">
                      {bookmark.url}
                    </a>
                  )}
                </td>
                <td>{bookmark.addedTime}</td>
                <td>
                  {loggedIn && (
                    <>
                      {editingId === bookmark.id ? (
                        <button onClick={handleUpdateBookmark}>Save</button>
                      ) : (
                        <>
                          <button onClick={() => handleEditBookmark(bookmark.id)}>Edit</button>
                          <button onClick={() => { setShowDeletePopup(true); setBookmarkToDelete(bookmark); }}>Delete</button>
                        </>
                      )}
                    </>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: Math.ceil(filteredBookmarks.length / itemsPerPage) }).map((_, index) => (
          <button key={index + 1} onClick={() => handlePageChange(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
      {showDeletePopup && (
        <div className="delete-popup">
          <p>Are you sure you want to delete this bookmark?</p>
          <button onClick={handleDeleteBookmark}>Yes</button>
          <button onClick={() => setShowDeletePopup(false)}>No</button>
        </div>
      )}
    </div>
  );
};

export default BookmarkManager;
