const mongoose = require('mongoose');

const PlaybackSchema = new mongoose.Schema({
    profileId: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile', required: true },
    mediaId: { type: String, required: true },
    progress: { type: Number, required: true},
    updatedAt:{type: Date, default: Date.now }, 
})

module.exports = mongoose.model('Playback', PlaybackSchema);