import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaThumbsUp, FaRegComment } from 'react-icons/fa';
import axios from 'axios';

function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/blogs/${id}`);
        setBlog(response.data);
        setLikes(response.data.likes);
        setComments(response.data.comments || []);
      } catch (error) {
        console.error('Error fetching blog details:', error);
      }
    };

    fetchBlog();
  }, [id]);

  const handleLike = async () => {
    const newLikes = likes + 1;
    setLikes(newLikes);

    try {
      // Send PUT request to update likes
      await axios.put(`http://localhost:5000/api/blogs/${id}/like`, { likes: newLikes });
    } catch (error) {
      console.error('Error updating likes:', error);
    }
  };

  const handleCommentChange = (e) => setCommentText(e.target.value);

  const handleAddComment = async () => {
    if (commentText) {
      const newComments = [...comments, commentText];
      setComments(newComments);
      setCommentText('');

      try {
        // Send PUT request to update comments
        await axios.put(`http://localhost:5000/api/blogs/${id}/comment`, { comments: newComments });
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    }
  };

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold">{blog.title}</h2>
      <p className="text-sm text-gray-500">{blog.author} | {blog.date}</p>
      <div className="mt-4 text-lg">{blog.content}</div>

      <div className="mt-6 flex items-center space-x-6">
        <div className="flex items-center">
          <FaThumbsUp className="text-blue-500 cursor-pointer" onClick={handleLike} />
          <span className="ml-2">{likes}</span>
        </div>
        <div className="flex items-center">
          <FaRegComment className="text-gray-500" />
          <span className="ml-2">{comments.length}</span>
        </div>
      </div>

      <div className="mt-6">
        <textarea
          value={commentText}
          onChange={handleCommentChange}
          className="w-full p-2 border rounded-md"
          placeholder="Add a comment"
        />
        <button onClick={handleAddComment} className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md">
          Add Comment
        </button>
      </div>

      <div className="mt-6">
        <h3 className="text-2xl font-semibold">Comments:</h3>
        <ul>
          {comments.map((comment, index) => (
            <li key={index} className="mt-2">{comment}</li>
          ))}
        </ul>
      </div>

      <button 
        onClick={() => navigate(-1)} 
        className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-md"
      >
        Go Back
      </button>
    </div>
  );
}

export default BlogDetail;
