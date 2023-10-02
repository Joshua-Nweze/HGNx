import express from "express"
import multer from "multer"
// let upload = multer({ dest: 'upload',  })

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Specify the destination directory where uploaded files will be saved.
      // You can provide an absolute path or a relative path to your project's root.
      cb(null, 'upload/'); // Example: 'uploads/' directory in your project
    },
    filename: function (req, file, cb) {
      // Customize the filename if needed (e.g., add a timestamp or use the original filename)
      cb(null, file.originalname);
    },
  });
  
  const upload = multer({
    storage: storage, // Set the storage configuration
    limits: {
      fileSize: 50 * 1024 * 1024, // Set the maximum file size (e.g., 50MB)
    },
  });

import videoController from '../controller/video.controller.js'

let { uploadVideo, getVideo } = videoController

let router = express.Router()

router.get('/:id', getVideo)
router.post('/upload', upload.single('video'), uploadVideo)

export default router