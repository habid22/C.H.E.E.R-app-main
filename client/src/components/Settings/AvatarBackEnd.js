// Backend settings page


// Backend for Avatar
// settingsBackend.js

const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3001;

// Set up multer storage for handling file uploads
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads'); // Uploads will be stored in the 'uploads' directory
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Initialize multer upload middleware
const upload = multer({ storage: storage });

// Route for uploading avatar
app.post('/upload-avatar', upload.single('avatar'), (req, res) => {
  try {
    // File uploaded successfully
    res.status(200).json({ message: 'Avatar uploaded successfully', filename: req.file.filename });
  } catch (error) {
    // Error occurred during upload
    res.status(500).json({ message: 'Avatar upload failed', error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
