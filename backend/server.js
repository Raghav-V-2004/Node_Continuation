const express = require('express');
const cors = require('cors');
const multer = require('multer');  // Import multer
const path = require('path');
const blogRoutes = require('./routes/blogRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Set up multer storage
const storage = multer.diskStorage({
  destination: './uploads/', // Ensure this folder exists
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Routes
app.use('/api', blogRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
