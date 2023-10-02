import ffmpeg from "ffmpeg"

export default function videoToAudio (videoPath, audioPath) {
    try {
        let process = new ffmpeg(videoPath)
        process.then((video) => {
            video.fnExtractSoundToMP3(audioPath, (error, file) => {
                if (!error) {
                    console.log('Audio:', file)
                }
            })
        }, function (err) {
            console.log('Error: ' + err);
        });
    } catch (error) {
        console.log(error.code);
        console.log(error.msg);
    }
}