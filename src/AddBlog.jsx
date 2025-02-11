import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddBlog() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState('');
  const [image, setImage] = useState(null); 
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file); // Change to store file for backend upload
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBlog = {
      title,
      author,
      content,
      date,
      image, // Send file as part of the form-data
    };

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('author', author);
      formData.append('content', content);
      formData.append('date', date);
      if (image) formData.append('image', image);

      // Send POST request to backend API
      axios.post('http://localhost:5000/api/blogs', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      

      navigate('/');
    } catch (error) {
      console.error('Error adding blog:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Add a New Blog</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md shadow-md">
        {/* Form inputs remain unchanged */}
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
          Add Blog
        </button>
      </form>
    </div>
  );
}

export default AddBlog;
