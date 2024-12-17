const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Restaurant = require('../models/restaurant');
const restaurant = require('../models/restaurant');

router.get('/recommendations', async (req, res) => {
    try {
        // "돼지국밥" 타입은 고정으로 추가
        const fixedType = "돼지국밥";

        // 나머지 랜덤 타입을 추출 (중복 방지를 위해 "돼지국밥" 제외)
        const randomTypes = await Restaurant.aggregate([
            { $match: { type: { $ne: fixedType } } },
            { $group: { _id: '$type' } },
            { $sample: { size: 4 } }, // 5개 중 4개만 추출
        ]);

        // 타입 리스트에 "돼지국밥" 추가
        const types = [fixedType, ...randomTypes.map(type => type._id)];

        // 각 타입에 해당하는 레스토랑 데이터 가져오기
        const restaurantsByType = await Promise.all(
            types.map(async (type) => {
                const restaurants = await Restaurant.aggregate([
                    { $match: { type: type } },
                    { $sample: { size: 10 } },
                    {
                        $project: {
                            _id: 0,
                            restaurant_id: '$_id',
                            restaurant_name: 1,
                            rating: 1,
                            img: 1,
                            city: 1,
                        }
                    }
                ]);
                return { type, restaurants };
            })
        );

        res.status(200).json(restaurantsByType);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/:restaurantId', async (req, res) => {
    try {
        const { restaurantId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
            return res.status(400).json({ message: 'Invalid restaurant ID' });
        }
        
        const restaurant = await Restaurant.findById(restaurantId, {
            restaurant_name: 1,
            location: 1,
            type: 1,
            rating: 1,
            phone: 1,
            price: 1,
            description: 1,
            media: 1,
        })

        console.log(restaurant.media);

        if(!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }

        res.status(200).json({
            restaurant_name: restaurant.restaurant_name,
            location: restaurant.location,
            rating: restaurant.rating,
            type: restaurant.type,
            phone: restaurant.phone,
            price: restaurant.price,
            description: restaurant.description,
            media: restaurant.media,
        });
    } catch(err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/', async (req, res) => {
    const {q, limit = 10 } = req.query;

    if(!q || typeof q !== 'string') {
        return res.status(400).json({ message: 'Query parameter q is required' });
    }

    try {
        const results = await Restaurant.aggregate([
            {
                $search: {
                    index: 'default',
                    autocomplete: {
                        query: q,
                        path: 'restaurant_name',
                        tokenOrder: 'sequential'
                    }
                },
            },
            {  $limit: Number(limit) },
            {
                $project: {
                    _id: 1,
                    restaurant_name: 1,
                    rating: 1,
                    city: 1,
                    img: 1
                }
            }
        ]);

        res.status(200).json({
            results: results.map((restaurant) => ({
                restaurant_id: restaurant._id,
                restaurant_name: restaurant.restaurant_name,
                rating: restaurant.rating,
                city: restaurant.city,
                img: restaurant.img
            }))
        });
    } catch(err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;