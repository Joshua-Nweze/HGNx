import express from "express"
import multer from "multer"
let upload = multer({ dest: 'upload',  })

import videoController from '../controller/video.controller.js'

let { uploadVideo, getVideo } = videoController

let router = express.Router()

router.get('/:id', getVideo)
router.post('/upload', upload.single('video'), uploadVideo)

export default router