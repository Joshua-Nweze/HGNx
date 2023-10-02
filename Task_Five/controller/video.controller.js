import Video from "../model/video.model.js"
import fs from "fs"
import ffmpeg from "ffmpeg"

import videoToAudio from "../utils/videoToAudio.js"

async function uploadVideo(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        console.log(req.body)
        console.log(req.file)

        const video = new Video({
            name: req.file.originalname,
            video: req.file.path
        })

        let newVideo = await video.save()

        if (newVideo) {
            res.status(200).json({message: 'Video saved successfully', videDetails: newVideo._id})
        } else {
            res.status(500).json({message: 'Video not saved'})
        }

        // res.json( req.file )
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Something went wrong, try again later'})
    }
}

async function getVideo(req, res){
    try {
        let { id } = req.params

        let video = await Video.findById(id)

        if(video){
            const { range } = req.headers

            if(!range){
                res.status(404).json({ message: 'Requires range' })
                return
            }

            const videoPath = video.video //path of video
            const videoSize = fs.statSync(video.video).size

            const CHUNK_SIZE = 10 ** 6 // 1 mb
            const start = Number(range.replace(/\D/g, ''))
            const end = Math.min(start + CHUNK_SIZE, videoSize - 1)

            const contentLength = end - start + 1

            const headers = {
                "Content-Range": `bytes ${start}-${end}/${videoSize}`,
                "Accept-Ranges": "bytes",
                "Content-Length": contentLength,
                "Content-Type": "video/mp4",
            };

            videoToAudio(`${video.video}`, '../audio')
            // let audioPath = 'audio.mp3'
            // ffmpeg()
            //     .input(`${video.video}`)
            //     .audioCodec('libmp3lame') // Use the MP3 codec
            //     .audioChannels(2) // Use 2 audio channels (stereo)
            //     .toFormat('mp3') // Set the output format to MP3
            //     .on('end', () => {
            //         console.log('Audio file created successfully.');
            //         // Call the transcription function here
            //     })
            //     .on('error', (err) => {
            //         console.error('Error converting video audio to MP3:', err);
            //     })
            //     .save(audioPath);

            res.writeHead(206, headers);
            // console.log(res.writeHead(206, headers))

            const videoStream = fs.createReadStream(videoPath, { start, end });
            videoStream.pipe(res)

            // res.json({message: 'video is playing'})
        } else {
            res.json({message: 'video not found'})
        }
    } catch (error) {
        console.log(error)
    }
}

export default {
    uploadVideo,
    getVideo
}