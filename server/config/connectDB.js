const mongoose = require('mongoose');

async function connectDB() {
    if (!process.env.MONGO_URL) {
        console.log("MongoDB connection string is not defined in environment variables");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URL, {
            serverSelectionTimeoutMS: 5000, // Increase timeout to 5000ms
            socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        });

        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log("Connected to the database");
        });

        connection.on('error', (error) => {
            console.error("Database connection error:", error);
        });
    } catch (error) {
        console.error("Database connection failed:", error);
    }
}

module.exports = connectDB;
