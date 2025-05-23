import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // ✅
import './Login.css';

const Login = ({ setUser }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // ✅

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);

      // ✅ Save user and token
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setUser(res.data.user);
      navigate('/profile');
      setMessage('Login successful');

      // ✅ Redirect to user profile/posts
      navigate('/posts');

    } catch (err) {
      setMessage(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    
      <div className="login-container">
        <div className="login-card">
          <h2>Login</h2>
          {message && <p className="login-message">{message}</p>}
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            /><br />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            /><br />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
  
    
  );
};

export default Login;
