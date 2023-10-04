import mongoose from 'mongoose'
import Video from '../model/video.model.js'
import fs from 'fs'

import dbOperations from '../dbOpreations/dbOperations.js';

let { saveToDb, getFileById, deleteFile } = dbOperations

async function downloadVideo (req, res) {
  const videoId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(videoId)) {
    return res.status(400).json({ message: 'Not a valid mongoose id' });
  }

  try {
    const video = await Video.findById({ _id: videoId });
    if (!video) {
      return res.status(404).json({
        message: 'File not found',
      });
    }

    video.set('mimeType', 'video/webm');
    await video.save();

    // Get chunks of data from client
    const videoChunks = [];
    req.on('data', (chunk) => {
      videoChunks.push(chunk);
    });

    req.on('end', async () => {
      const dataBuffer = Buffer.concat(videoChunks);

      // Save to a local file in the server
      await saveToDb(dataBuffer, videoId);
    });
    return res.json({  message: `Chunks of data for videoId ${video._id} recieved`});
  } catch (error) {
    res.json({ message: 'Something went wrong, try again later' });
  }
};

async function finalVideoChunk (req, res) {
  try {
    const videoId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(videoId)) {
      return console.log('Invalid Id');
    }

    const videoData = await Video.findById({ _id: videoId });
    if (!videoData) {
      return res.status(404).json({  message: 'Video file missing' });
    }

    const chunks = [];
    req.on('data', (chunk) => {
      chunks.push(chunk);
    });

    req.on('end', async () => {
      const dataBuffer = Buffer.concat(chunks);

      await saveToDb(dataBuffer, videoId);
    });

    const binaryArray = await getFileById(videoId);

    const videoBuffer = Buffer.from(binaryArray);

    if (Buffer.isBuffer(videoBuffer)) {
      fs.writeFile(`./videos/${videoId}.webm`, videoBuffer, async (err) => {
        if (err) {
          return res.json({ message: err });
        } else {
          const link = `http://${req.hostname}:${process.env.PORT}/video/play/${videoId}.webm`;

          videoData.set({
            url: link,
          });
          await videoData.save();

          await deleteFile(videoId);

          return res.status(200).json({ message: 'Video saved' });
        }
      });
    } else {
      return res.json({message: 'Buffer not valid',});
    }
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export default { downloadVideo, finalVideoChunk };