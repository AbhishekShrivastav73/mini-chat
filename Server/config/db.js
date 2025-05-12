const mongoose = require('mongoose');
const db = process.env.MONGO_URI || 'mongodb://localhost:27017/mini-whatsapp-clone';

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}`);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
    };

module.exports = connectDB;
