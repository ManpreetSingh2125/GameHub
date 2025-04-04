import React, { useState } from 'react';
import api from '../api';
import './AdminPage.css';

const AdminPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    rating: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await api.post('/api/admin/games', formData);
      setSuccessMessage(`Game "${response.data.game.name}" added successfully.`);
      setFormData({ name: '', price: '', description: '', rating: '' }); // Reset form
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Failed to add game.');
    }
  };

  return (
    <div className="admin-page">
      <h1>Admin Panel - Add New Game</h1>
      {successMessage && <p className="success">{successMessage}</p>}
      {errorMessage && <p className="error">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Rating</label>
          <input
            type="number"
            step="0.1"
            min="0"
            max="5"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add Game</button>
      </form>
    </div>
  );
};

export default AdminPage;