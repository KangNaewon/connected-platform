const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/user');
const { Profile } = require('../models/profile');
const Restaurant = require('../models/restaurant');

const jwt = require('jsonwebtoken');

const authenticateToken = require('../middlewares/authenticateToken');

router.post('/switch/:profileId', authenticateToken, async(req, res) => {
    const { profileId } = req.params;

    console.log("profileID: " + profileId);
    
    if(!profileId) {
        return res.status(400).json({ message: "Profile ID is required"});
    }

    try {
        const user = await User.findById(req.user.user_id);
        console.log("User: " + user);
        if(!user) {
            return res.status(401).json({ message: "Invalid token" });
        }

        const profile = user.profiles.some(p => p.toString() === profileId);

        console.log("Profile: " + profile)

        if(!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }

        const newToken = jwt.sign(
            {
                user_id: user._id,
                id: user.id,
                active_profile_id: profileId,
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        )

        res.status(200).json({ token: newToken });
    } catch(err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error " });
    }
});

router.post('/', authenticateToken, async(req, res) => {
    const profileName = req.body.profile_name;
    if(!profileName) {
        return res.status(400).json({ message: "Profile name is required" });
    }

    const userId = req.user.user_id;
    const id = req.user.id;

    try {
        const userExists = await User.findById(userId);
        if (!userExists) {
            return res.status(404).json({ message: "User not found" });
        }

        const existingProfile = await Profile.findOne({ user_id: id, profile_name: profileName });
        if (existingProfile) {
            return res.status(400).json({ message: "Profile name already exists for this user" });
        }
    
        const newProfile = new Profile({
            user_id: id,
            profile_name: profileName,
        })

        const savedProfile = await newProfile.save();

        await User.findByIdAndUpdate(userId, { $push: { profiles: savedProfile._id } });

        res.status(201).json({
            message: "New profile created successfully",
            created_profile: {
                profile_id: savedProfile._id,
                profile_name: savedProfile.profile_name,
            },
        });    } catch(err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server error" });
    }
});

router.delete('/:profileId', authenticateToken, async(req, res) => {
    const { profileId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(profileId)) {
        return res.status(400).json({ message: "Invalid profile ID" });
    }

    try {
        const profile = await Profile.findOne({ _id: profileId, user_id: req.user.id });
        if(!profile) {
            return res.status(404).json({ message: "Profile not found or does not belong to the user" });
        }

        await Profile.findByIdAndDelete(profileId);

        await User.findByIdAndUpdate(req.user.user_id, {
            $pull: { profiles: profileId },
        });

        res.status(200).json({ message: "Profile deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server error" });
    }
});

router.patch('/:profileId', authenticateToken, async(req, res) => {
    const { profileId } = req.params;
    const profileName = req.body.profile_name;

    if(!profileName) {
        return res.status(400).json({ message: "Profile name is required" });
    }

    try {
        const profile = await Profile.findOne({ _id: profileId, user_id: req.user.id});
        if(!profile) {
            return res.status(404).json({ message: "Profile not found or does not belong to the user" });
        }

        profile.profile_name = profileName;
        const updatedProfile = await profile.save();

        res.status(200).json({
            message: "Profile name updated successfully",
            updated_profile: updatedProfile,
        })
    } catch(err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server error" });
    }
});

router.get('/:profileId', authenticateToken, async(req, res) => {
    const { profileId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(profileId)) {
        return res.status(400).json({ message: "Invalid profile ID" });
    }

    try {
        const profile = await Profile.findById(profileId);
        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }

        const likesRestaurants = await Restaurant.find({ _id: { $in: profile.likes }});
        const visitedRestaurants = await Restaurant.find({ _id: { $in: profile.visited }});

        res.status(200).json({
            likes: likesRestaurants.map((restaurant) => ({
                restaurant_id: restaurant._id,
                restaurant_name: restaurant.restaurant_name,
                rating: restaurant.rating,
                city: restaurant.city,
                img: restaurant.img,
            })),  
            visited: visitedRestaurants.map((restaurant) => ({
                restaurant_id: restaurant._id,
                restaurant_name: restaurant.restaurant_name,
                rating: restaurant.rating,
                city: restaurant.city,
                img: restaurant.img,
            })),
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server error" });
    }
});

router.get('/:profileId/:restaurantId', authenticateToken, async(req, res) => {
    const { profileId, restaurantId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(profileId) || !mongoose.Types.ObjectId.isValid(restaurantId)) {
        return res.status(400).json({ message: "Invalid profile ID or restaurant ID" });
    }

    try {
        const profile = await Profile.findById(profileId);
        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }

        const liked = profile.likes.includes(restaurantId);
        const disliked = profile.dislikes.includes(restaurantId);
        const visited = profile.visited.includes(restaurantId);

        res.status(200).json({ liked, disliked, visited });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server error" });
    }
});

router.post('/:profileId/like', authenticateToken, async(req, res) => {
    const { profileId } = req.params;
    const restaurantId = req.body.restaurant_id;
    
    console.log("post like profile" + profileId);
    console.log("post like:" + restaurantId);


    if(!restaurantId) {
        return res.status(400).json({ message: "Restaurant id is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
        return res.status(400).json({ message: "Invalid restaurant ID" });
    }
    
    try {
        const profile = await Profile.findOne({ _id: profileId, user_id: req.user.id });
        if(!profile) {
            return res.status(404).json({ message: "Profile not found or does not belong to the user" });
        }

        const restaurantExists = await Restaurant.findById(restaurantId);
        if (!restaurantExists) {
            return res.status(404).json({ message: "Restaurant not found" });
        }

        if (profile.likes.includes(restaurantId)) {
            return res.status(400).json({ message: "Restaurant is already in the like list" });
        }

        // dislike에서 제거
        profile.dislikes = profile.dislikes.filter(id => id.toString() !== restaurantId);

        profile.likes.push(restaurantId);
        
        await profile.save();

        res.status(200).json({ message: "Restaurant added to like list successfully" });
    } catch(err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server error" });
    }
});

router.delete('/:profileId/like', authenticateToken, async(req, res) => {
    const { profileId } = req.params;
    const restaurantId = req.body.restaurant_id;

    console.log("delete like" + profileId);
    console.log("delete like:" + restaurantId);


    if(!restaurantId) {
        return res.status(400).json({ message: "Restaurant id is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
        return res.status(400).json({ message: "Invalid restaurant ID" });
    }

    try {
        const profile = await Profile.findOne({ _id: profileId, user_id: req.user.id });
        if(!profile) {
            return res.status(404).json({ message: "Profile not found or does not belong to the user" });
        }

        const initialLength = profile.likes.length;
        profile.likes = profile.likes.filter(id => id.toString() !== restaurantId);

        if(initialLength === profile.likes.length) {
            return res.status(404).json({ message: "Restaurant not found in like list" });
        }

        await profile.save();

        res.status(200).json({ message: "Restaurant deleted from like list successfully" });
    } catch(err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server error" });
    }
});

router.post('/:profileId/dislike', authenticateToken, async(req, res) => {
    const { profileId } = req.params;
    const restaurantId = req.body.restaurant_id;

    console.log("post dislike:" + restaurantId);

    if(!restaurantId) {
        return res.status(400).json({ message: "Restaurant id is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
        return res.status(400).json({ message: "Invalid restaurant ID" });
    }
    
    try {
        const profile = await Profile.findOne({ _id: profileId, user_id: req.user.id });
        if(!profile) {
            return res.status(404).json({ message: "Profile not found or does not belong to the user" });
        }

        const restaurantExists = await Restaurant.findById(restaurantId);
        if (!restaurantExists) {
            return res.status(404).json({ message: "Restaurant not found" });
        }

        if (profile.dislikes.includes(restaurantId)) {
            return res.status(400).json({ message: "Restaurant is already in the dislike list" });
        }

        // like에서 제거
        profile.likes = profile.likes.filter(id => id.toString() !== restaurantId);

        profile.dislikes.push(restaurantId);
        
        await profile.save();

        res.status(200).json({ message: "Restaurant added to dislike list successfully" });
    } catch(err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server error" });
    }
});

router.delete('/:profileId/dislike', authenticateToken, async(req, res) => {
    const { profileId } = req.params;
    const restaurantId = req.body.restaurant_id;

    console.log("delete dislike:" + restaurantId);

    if(!restaurantId) {
        return res.status(400).json({ message: "Restaurant id is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
        return res.status(400).json({ message: "Invalid restaurant ID" });
    }

    try {
        const profile = await Profile.findOne({ _id: profileId, user_id: req.user.id });
        if(!profile) {
            return res.status(404).json({ message: "Profile not found or does not belong to the user" });
        }

        const initialLength = profile.dislikes.length;
        profile.dislikes = profile.dislikes.filter(id => id.toString() !== restaurantId);

        if(initialLength === profile.dislikes.length) {
            return res.status(404).json({ message: "Restaurant not found in dislike list" });
        }

        await profile.save();

        res.status(200).json({ message: "Restaurant deleted from dislike list successfully" });
    } catch(err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server error" });
    }
});

router.post('/:profileId/visit', authenticateToken, async(req, res) => {
    const { profileId } = req.params;
    const restaurantId = req.body.restaurant_id;

    if(!restaurantId) {
        return res.status(400).json({ message: "Restaurant id is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
        return res.status(400).json({ message: "Invalid restaurant ID" });
    }
    
    try {
        const profile = await Profile.findOne({ _id: profileId, user_id: req.user.id });
        if(!profile) {
            return res.status(404).json({ message: "Profile not found or does not belong to the user" });
        }

        const restaurantExists = await Restaurant.findById(restaurantId);
        if (!restaurantExists) {
            return res.status(404).json({ message: "Restaurant not found" });
        }

        if (profile.visited.includes(restaurantId)) {
            return res.status(400).json({ message: "Restaurant is already in the visit list" });
        }

        profile.visited.push(restaurantId);
        
        await profile.save();

        res.status(200).json({ message: "Restaurant added to visit list successfully" });
    } catch(err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server error" });
    }
});

router.delete('/:profileId/visit', authenticateToken, async(req, res) => {
    const { profileId } = req.params;
    const restaurantId = req.body.restaurant_id;

    if(!restaurantId) {
        return res.status(400).json({ message: "Restaurant id is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
        return res.status(400).json({ message: "Invalid restaurant ID" });
    }

    try {
        const profile = await Profile.findOne({ _id: profileId, user_id: req.user.id });
        if(!profile) {
            return res.status(404).json({ message: "Profile not found or does not belong to the user" });
        }

        const initialLength = profile.visited.length;
        profile.visited = profile.visited.filter(id => id.toString() !== restaurantId);

        if(initialLength === profile.visited.length) {
            return res.status(404).json({ message: "Restaurant not found in visit list" });
        }

        await profile.save();

        res.status(200).json({ message: "Restaurant deleted from visit list successfully" });
    } catch(err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server error" });
    }
});

module.exports = router;