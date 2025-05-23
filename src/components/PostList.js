import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import './PostList.css';
//this is for user post
const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [editedContent, setEditedContent] = useState('');

  const currentUser = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  const fetchPosts = useCallback(async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/posts', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(res.data);
    } catch (err) {
      console.error('Error fetching posts:', err);
    }
  }, [token]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPosts();
    } catch (err) {
      alert('Error deleting post');
    }
  };

  const startEditing = (post) => {
    setEditingPost(post.id);
    setEditedContent(post.content);
  };

  const handleEdit = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/posts/${id}`,
        { content: editedContent },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditingPost(null);
      fetchPosts();
    } catch (err) {
      alert('Error updating post');
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div className="post-list">
      <h2>All Posts</h2>
      {posts.map((post) => (
        <div key={post.id} className="post-card">
          <h3>{post.title}</h3>

          {post.image_url && (
            <img
              src={`http://localhost:5000${post.image_url}`}
              alt="Post"
              className="post-image"
            />
          )}

          {editingPost === post.id ? (
            <>
              <textarea
                rows="4"
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
              /><br />
              <button onClick={() => handleEdit(post.id)}>Save</button>{' '}
              <button onClick={() => setEditingPost(null)}>Cancel</button>
            </>
          ) : (
            <p>{post.content}</p>
          )}

          <small>
            Posted by <strong>{post.username}</strong> on{' '}
            {new Date(post.created_at).toLocaleString()}
          </small>

          {currentUser && post.user_id === currentUser.id && (
            <div className="post-actions">
              <button onClick={() => startEditing(post)}>Edit</button>{' '}
              <button onClick={() => handleDelete(post.id)}>Delete</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PostList;
