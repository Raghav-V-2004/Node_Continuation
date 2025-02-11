const db = require('../config/db');

// Get all blogs
const getAllBlogs = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM blogs', (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

// Get a blog by ID
const getBlogById = (id) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM blogs WHERE id = ?', [id], (err, results) => {
      if (err) reject(err);
      resolve(results[0]);
    });
  });
};

// Create a new blog
const createBlog = (blog) => {
  return new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO blogs (title, author, content, date, image) VALUES (?, ?, ?, ?, ?)',
      [blog.title, blog.author, blog.content, blog.date, blog.image],
      (err, result) => {
        if (err) reject(err);
        resolve({ id: result.insertId, ...blog });
      }
    );
  });
};

// Update a blog by ID
const updateBlog = (id, blog) => {
  return new Promise((resolve, reject) => {
    db.query(
      'UPDATE blogs SET title = ?, author = ?, content = ?, date = ?, image = ? WHERE id = ?',
      [blog.title, blog.author, blog.content, blog.date, blog.image, id],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

// Delete a blog by ID
const deleteBlog = (id) => {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM blogs WHERE id = ?', [id], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

module.exports = {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
};
