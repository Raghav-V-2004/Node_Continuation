import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Feed() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Fetch blogs from the backend API
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/blogs');
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this blog?');
    if (confirmDelete) {
      try {
        // Send DELETE request to backend
        await axios.delete(`http://localhost:5000/api/blogs/${id}`);
        setBlogs(blogs.filter((blog) => blog.id !== id)); // Update state after delete
      } catch (error) {
        console.error('Error deleting blog:', error);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold">Blog Feed</h1>
      <div className="my-4">
        <Link to="/add" className="px-4 py-2 bg-blue-500 text-white rounded-md">Add New Blog</Link>
      </div>

      <div className="mt-6">
        {blogs.map((blog) => {
          return (
            <div key={blog.id} className="bg-white p-4 rounded-md shadow-lg mb-6">
              {blog.image && <img src={`http://localhost:5000/${blog.image}`} alt={blog.title} className="w-32 h-32 object-cover rounded-md mb-4" />}
              <h2 className="text-2xl font-semibold">{blog.title}</h2>
              <p className="text-sm text-gray-500">{blog.author} | {blog.date}</p>
              <p className="text-lg mt-2">{blog.content.substring(0, 150)}...</p>
              <div className="mt-4">
                <Link to={`/blog/${blog.id}`} className="text-blue-500 hover:text-blue-700">Read more</Link>
              </div>

              <div className="mt-4">
                <p>Likes: {blog.likes}</p>
                <p>Comments: {blog.comments.length}</p>
              </div>

              <div className="mt-4">
                <Link to={`/edit/${blog.id}`} className="px-4 py-2 bg-yellow-500 text-white rounded-md mr-4">Edit</Link>
                <button onClick={() => handleDelete(blog.id)} className="px-4 py-2 bg-red-500 text-white rounded-md">Delete</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Feed;
