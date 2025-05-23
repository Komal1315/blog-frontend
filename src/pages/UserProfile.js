import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const [user] = useState(JSON.parse(localStorage.getItem('user')));
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:5000/api/posts/user/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPosts(res.data);
      } catch (err) {
        console.error('Error fetching user posts:', err);
      }
    };

    fetchUserPosts();
  }, [user.id]);

  return (
    <div style={{ maxWidth: 800, margin: '50px auto' }}>
      <h2>Welcome, {user.username}</h2>
      <p>Email: {user.email}</p>

      <h3>Your Posts:</h3>
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} style={{ borderBottom: '1px solid #ccc', padding: '10px 0' }}>
            <h4>{post.title}</h4>
            <p>{post.content}</p>
            <small>{new Date(post.created_at).toLocaleString()}</small>
          </div>
        ))
      )}
    </div>
  );
};

export default UserProfile;
