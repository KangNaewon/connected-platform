const mongoose = require("mongoose");

const RefreshTokenSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    refresh_token: { type: String, required: true },
    created_at: { type: Date, default: Date.now, expires: '7d' }
})

module.exports = mongoose.model('RefreshToken', RefreshTokenSchema);