const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

const PORT = 6060;

app.use(cors());

app.get('/videos/:videoName/master.m3u8', (req, res) => {
    const videoName = req.params.videoName;
    const m3u8Path = path.join(__dirname, 'videos', videoName, 'master.m3u8');

    console.log(`videoName: ${videoName}`)

    res.sendFile(m3u8Path, (err)=>{
        if (err) {
            console.log(err)
            res.status(err.status).end();
        }
    })
});

app.get('/videos/:videoName/:resolution/:segment', (req, res) => {
    const videoName = req.params.videoName;
    const segment = req.params.segment;
    const resolution = req.params.resolution;
    const segmentPath = path.join(__dirname, 'videos', videoName, resolution, segment);

    console.log(`videoName: ${videoName}, resolution: ${resolution}, segment: ${segment}`)

    res.sendFile(segmentPath, (err)=>{
        if (err) {
            console.log(err)
            res.status(err.status).end();
        }
    })
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});