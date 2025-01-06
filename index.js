require('dotenv').config();
const express = require('express');
const session = require('express-session');
const Redis = require('ioredis');
const connectRedis = require('connect-redis');
const mongoose = require('mongoose');
const router = require('./routes');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cookieParser());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('MongoDB connection error:', err));

// Initialize Redis client
const redisClient = new Redis({
    host: 'localhost',
    port: 6379
});

// Initialize Redis store
const RedisStore = connectRedis.default;

async function startServer() {
    try {
        // Create and configure RedisStore
        const redisStore = new RedisStore({
            client: redisClient,
            prefix: 'myapp:',
        });

        // Session middleware
        app.use(session({
            store: redisStore,
            secret: process.env.SESSION_SECRET || 'secret',
            saveUninitialized: false,
            resave: false,
            cookie: {
                secure: false,
                httpOnly: true,
                maxAge: 60000,
            },
        }));

        app.use(router);

        app.listen(3000, () => console.log('Server is running on port 3000'));

    } catch (err) {
        console.error('Redis connection error:', err);
    }
}

startServer();