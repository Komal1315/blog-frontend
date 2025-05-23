
import React, { useState } from 'react';
import axios from 'axios';

const AddPost = () => {
  const [postData, setPostData] = useState({
    title: '',
    content: ''
  });
  const [image, setImage] = useState(null); // for image file

  const handleChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login first');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', postData.title);
      formData.append('content', postData.content);
      if (image) {
        formData.append('image', image);
      }

      await axios.post('http://localhost:5000/api/posts', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      alert('Post added successfully');
      setPostData({ title: '', content: '' });
      setImage(null);
    } catch (err) {
      console.error(err);
      alert('Error adding post');
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '50px auto' }}>
      <h2>Add Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Post Title"
          value={postData.title}
          onChange={handleChange}
          required
        /><br /><br />
        <textarea
          name="content"
          placeholder="Post Content"
          value={postData.content}
          onChange={handleChange}
          rows="4"
          required
        /><br /><br />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        /><br /><br />
        <button type="submit">Add Post</button>
      </form>
    </div>
  );
};

export default AddPost;
