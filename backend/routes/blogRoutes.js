const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const multer = require('multer');

// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// Routes for blogs
router.get('/blogs', blogController.getAllBlogs);
router.get('/blogs/:id', blogController.getBlogById);
router.post('/blogs', upload.single('image'), blogController.createBlog);
router.put('/blogs/:id', upload.single('image'), blogController.updateBlog);
router.delete('/blogs/:id', blogController.deleteBlog);

module.exports = router;
