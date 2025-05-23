
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProfilePage.css';

const ProfilePage = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/posts');
        setPosts(res.data);
      } catch (err) {
        console.error('Error fetching posts:', err);
      }
    };

    fetchAllPosts();
  }, []);

  const getImageUrl = (post) => {
    if (!post.image_url || post.image_url === 'null') return null; // No image available

    return post.image_url.startsWith('/uploads')
      ? `http://localhost:5000${post.image_url}` // Relative path handling
      : `http://localhost:5000/uploads/${post.image_url}`; // Ensures correct access to images
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>Explore Feed</h2>
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="post-grid">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div className="post-card" key={post.id}>
              <h3>{post.title}</h3>

              {/* Image Rendering Fix */}
              {post.image_url && getImageUrl(post) && (
                <img
                  src={getImageUrl(post)}
                  alt="Post"
                  className="post-image"
                  onError={(e) => { e.target.style.display = 'none'; }} // Hide broken images
                />
              )}

              <p>{post.content}</p>

              <small>
                by <strong>{post.username}</strong> • {new Date(post.created_at).toLocaleString()}
              </small>
            </div>
          ))
        ) : (
          <p>No posts found.</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
