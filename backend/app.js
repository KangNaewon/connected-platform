const express = require('express')
const connectDB = require('./config/db');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const app = express()

dotenv.config();

connectDB();

app.use(express.json());
app.use(cors());

const userRoutes = require('./routes/user');
const restaurantRoutes = require('./routes/restaurant');
const profileRoutes = require('./routes/profile');
const mediaRoutes = require('./routes/media');

app.use('/user', userRoutes);
app.use('/restaurant', restaurantRoutes);
app.use('/profile', profileRoutes);
app.use('/media', mediaRoutes);

app.get('/', (req, res) => {
    res.send('This is Michelin API!')
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`)
});
