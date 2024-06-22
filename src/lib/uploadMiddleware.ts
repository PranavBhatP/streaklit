// uploadMiddleware.ts

import multer from 'multer';
import path from 'path';
import fs from 'fs';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = './uploads'; // Directory to store uploaded files
    fs.mkdirSync(uploadDir, { recursive: true }); // Create the directory if it doesn't exist
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

export default upload.single('image'); // Use 'single' if uploading a single file
