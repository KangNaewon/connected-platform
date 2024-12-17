const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const RefreshToken = require('../models/token.js');
const Profile = require('../models/profile.js');
const authenticateToken = require('../middlewares/authenticateToken.js');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const token = require('../models/token.js');

router.post('/signup', async (req, res) => {
    const { id, password } = req.body;
    if(!id || !password) { 
        return res.status(400).json({ message: "id and password are required" });
    }

    try {
        const isIdDuplicate = await User.findOne({ id });
        if(isIdDuplicate) {
            return res.status(400).json({ message: "id already exists" });
        }

        const newUser = new User({
            id,
            password,
            profiles: [],
        });

        const savedUser = await newUser.save();

        const defaultProfile = new Profile.Profile({
            user_id: savedUser.id,
            profile_name: "Default Profile",
            likes: [],
            visited: [],
        });

        const savedProfile = await defaultProfile.save();

        savedUser.profiles.push(savedProfile._id);

        await savedUser.save();
        
        res.status(201).json({ message: "User signed up successfully" });
    } catch(err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server error" });
    }
});

router.post('/login', async (req, res) => {
    const { id, password } = req.body;
    if(!id || !password) { 
        return res.status(400).json({ message: "id and password are required" });
    }

    try {
        const user = await User.findOne({ id });
        console.log(user);
        if(!user) {
            return res.status(401).json({ message: "Invalid id or password" });
        }
        
        console.log(password);
        console.log(user.password);
        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log(isPasswordValid);
        if(!isPasswordValid) {
            return res.status(401).json({ message: "Invalid id or password" });
        }

        const accessToken = jwt.sign(
            {
                user_id: user._id,
                id: user.id,
                active_profile_id: user.profiles[0]._id,
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        const refreshToken = jwt.sign(
            {
                user_id: user._id,
                id: user.id,
                active_profile_id: user.profiles[0]._id,
            },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );  
        
        await RefreshToken.deleteMany({ user_id: user._id });

        const newRefreshToken = new RefreshToken({ user_id: user._id, refresh_token: refreshToken });
        await newRefreshToken.save();
        
        res.status(200).json({ accessToken: accessToken, refreshToken: refreshToken });
    } catch(err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server error" });
    }
});

router.post('/logout', async (req, res) => {
    try {
        const refreshToken = req.body.refreshToken;

        if (!refreshToken) {
            return res.status(400).json({ message: "Refresh Token is required" });
        }

        await RefreshToken.deleteOne({ token: refreshToken });
        
        res.status(200).json({ message: "Logged out successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server error" });
    }
});

router.post('/refresh', async(req, res) => {
    const refreshToken = req.body.refresh_token;

    if(!refreshToken) {
        return res.status(400).json({ message: "Refresh token is required" });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);

        const tokenEntry = await RefreshToken.findOne({ user_id: decoded.user_id, refresh_token: refreshToken});
        if(!tokenEntry) {
            return res.status(401).json({ message: "Invalid refresh token" });
        }

        const newAccesToken = jwt.sign(
            {
                user_id: decoded.user_id,
                id: decoded.id,
                active_profile_id: decoded.active_profile_id,
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        
        res.status(200).json({ accessToken: newAccesToken });
    } catch(err) {
        console.error(err);
        if(err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Refresh token expired" });
        }
        res.status(500).json({ message: "Internal Server error" });
    }
});

router.post('/refresh-token', async(req, res) => {
    const refreshToken = req.body.refresh_token;

    if(!refreshToken) {
        return res.status(400).json({ message: "Refresh token is required" });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);

        const tokenEntry = await RefreshToken.findOne({ user_id: decoded.user_id, refresh_token: refreshToken});
        if(!tokenEntry) {
            return res.status(401).json({ message: "Invalid refresh token" });
        }

        const newAccesToken = jwt.sign(
            {
                user_id: decoded.user_id,
                id: decoded.id,
                active_profile_id: decoded.active_profile_id,
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        const newRefreshToken = jwt.sign(
            {
                user_id: decoded.user_id,
                id: decoded.id,
                active_profile_id: decoded.active_profile_id,
            },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        tokenEntry.refresh_token = newRefreshToken;
        await tokenEntry.save();

        res.status(200).json({ accessToken: newAccesToken, refreshToken: newRefreshToken });
    } catch(err) {
        console.error(err);
        if(err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Refresh token expired" });
        }
        res.status(500).json({ message: "Internal Server error" });
    }
})

router.get('/:userId/profile', authenticateToken, async(req, res) => {
    const { userId } = req.params;

    // if(req.user.id !== userId) {
    //     return res.status(403).json({ message: "Forbidden: You cannot access profile of other users" });
    // }

    try {
        const profiles = await Profile.Profile.find({ user_id: userId });
        console.log(profiles);
        if(!profiles.length) {
            return res.status(404).json({ message: "No profiles found for the user" });
        }

        const response = profiles.map(profile => ({
            profile_id: profile._id,
            profile_name: profile.profile_name,
        }));

        res.status(200).json({ profiles: response });
    } catch(err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server error" });
    }
});

module.exports = router;