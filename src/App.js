import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import PostList from './components/PostList';
import AddPost from './components/AddPost';
import LogoutButton from './components/LogoutButton';
import './App.css';
import ProfilePage from './pages/ProfilePage';
function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <h1 className="logo">Blog Platform</h1>
          <nav>
            <Link to="/" className="login-link">Home</Link>
            {user ? (
              <>
                <Link to="/posts" className="login-link">Profile</Link>
                <Link to="/add" className="login-link">Add Post</Link>
                <LogoutButton setUser={setUser} />
              </>
            ) : (
              <>
                <Link to="/login" className="login-link">Login</Link>
              </>
            )}
          </nav>
        </header>

        <Routes>
        <Route path="/profile" element={<ProfilePage user={user} />} />
          <Route path="/" element={user ? <Navigate to="/posts" /> : <Signup />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/posts" element={user ? <PostList /> : <Navigate to="/login" />} />
          <Route path="/add" element={user ? <AddPost /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
