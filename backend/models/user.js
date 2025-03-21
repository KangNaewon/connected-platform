const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { ProfileSchema } = require("./profile");

const UserSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    password: {type: String, required: true },
    profiles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Profile" }],
});

UserSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports = mongoose.model("User", UserSchema);