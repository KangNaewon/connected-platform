const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user_id: {type: String, required: true },
    profile_name:  { type: String, required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' }],
    dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' }],
    visited: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' }],
    created_at: { type: Date, default: Date.now },
});

module.exports = {
    ProfileSchema,
    Profile: mongoose.model("Profile", ProfileSchema),
}