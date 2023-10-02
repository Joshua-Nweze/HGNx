import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose"
import "dotenv/config"

let app = express()

import videoRoutes from './routes/video.routes.js'

// middleware
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));

// route
app.use('/video', videoRoutes)

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        app.listen(3000, () => {
            console.log('Server running in port 3000')
        })
    })
