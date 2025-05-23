import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = ({ setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <button onClick={handleLogout} style={{ marginLeft: '10px' }}>
      Logout
    </button>
  );
};

export default LogoutButton;
