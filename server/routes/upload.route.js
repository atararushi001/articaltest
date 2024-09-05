const express = require('express');
const multer = require('multer');
const path = require('path');

const uploadRouter = express.Router();

// Configure storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

// Route to handle file uploads
uploadRouter.post('/', upload.single('upload'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  res.json({ url: `http://localhost:3000/uploads/${req.file.filename}` });
});

module.exports = uploadRouter;