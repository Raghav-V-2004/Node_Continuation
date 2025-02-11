const Blog = require('../models/blogModel');

// Get all blogs
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.getAllBlogs();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
};

// Get a blog by ID
const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.getBlogById(req.params.id);
    if (blog) {
      res.json(blog);
    } else {
      res.status(404).json({ error: 'Blog not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
};

// Create a new blog
const createBlog = async (req, res) => {
  try {
    const { title, author, content, date } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;
    const newBlog = await Blog.createBlog({ title, author, content, date, image });
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
};

// Update a blog
const updateBlog = async (req, res) => {
  try {
    const { title, author, content, date } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;
    const updatedBlog = await Blog.updateBlog(req.params.id, { title, author, content, date, image });
    res.json(updatedBlog);
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
};

// Delete a blog
const deleteBlog = async (req, res) => {
  try {
    await Blog.deleteBlog(req.params.id);
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
};

module.exports = {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
};
