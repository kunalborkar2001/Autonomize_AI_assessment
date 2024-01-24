import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './InputBox.css';

const InputBox = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  const handleUserClick = () => {
    if (username.length !== 0) {
      navigate(`/repolist/${username}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    handleUserClick();
  };

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  return (
    <form className="inputbox" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter the username you want to search..."
        onChange={handleChange}
        value={username}
        required
      />

      <button type="submit">
        Search User
      </button>
    </form>
  );
};

export default InputBox;
