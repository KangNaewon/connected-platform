const express = require('express');
const router = express.Router();
const path = require('path');
const Playback = require('../models/playback');

router.get('/:videoName/master.m3u8', (req, res) => {
    const videoName = req.params.videoName;
    const m3u8Path = path.join(__dirname, '..', 'videos', videoName, 'master.m3u8');
    console.log(m3u8Path);
    console.log(`videoName: ${videoName}`)

    res.sendFile(m3u8Path, (err)=>{
        if (err) {
            console.log(err)
            res.status(err.status).end();
        }
    })
});

router.get('/:videoName/:resolution/:segment', (req, res) => {
    const videoName = req.params.videoName;
    const segment = req.params.segment;
    const resolution = req.params.resolution;
    const segmentPath = path.join(__dirname, '..', 'videos', videoName, resolution, segment);

    console.log(`videoName: ${videoName}, resolution: ${resolution}, segment: ${segment}`)

    res.sendFile(segmentPath, (err)=>{
        if (err) {
            console.log(err)
            res.status(err.status).end();
        }
    })
});

router.post('/playback', async(req, res) => {
    const profileId = req.body.profile_id;
    const mediaId = req.body.media_id;
    const progress = req.body.progress;

    console.log(profileId, mediaId, progress);

    try {
        const playback = await Playback.findOneAndUpdate(
            { profileId, mediaId },
            { progress, updatedAt: new Date() },
            { upsert: true, new: true}
        );
        res.status(200).json({ message: 'Playback position saved' });
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: "Error saving playback position"});
    }
})

router.get('/playback', async(req, res) => {
    const { profileId, mediaId } = req.query; 
    console.log(profileId, mediaId);

    try {
        const playback = await Playback.findOne({ profileId, mediaId });
        console.log(playback);
        if(playback != null) {
            res.status(200).json({ progress: playback.progress });
        } else {
            res.status(200).json({ progress: 0 });
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: "Error retrieving playback position" });
    }
});

module.exports = router;