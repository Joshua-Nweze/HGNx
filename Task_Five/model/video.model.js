import mongoose, { Schema } from "mongoose";

let videoSchema = Schema({
    name: {
        type: String,
        required: true
    },
    video: {
        type: Buffer,
        required: true
    }
}, {timestamps: true})

let Video = mongoose.model('Video', videoSchema)

export default Video