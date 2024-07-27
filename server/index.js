const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/connectDB.js');
const router = require('./router/router.js');
const cookieParser = require("cookie-parser");

const {app,server} = require('./socket/index.js');
// Middleware
app.use(express.json());

// const app = express()
app.use(cors({
    origin : `${process.env.FRONTEND_URL}`,
    credentials : true
}))

app.use(cookieParser());

console.log(process.env.FRONTEND_URL)
// Root route
app.get('/', (req, res) => {
    res.json("App is running");
});

// API routes
app.use('/api', router);

const PORT = process.env.PORT || 8000;

// Database connection and server startup
connectDB()
    .then(() => {
        server.listen(PORT, () => {
            console.log(`Server is running at port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Failed to connect to the database:", error);
        process.exit(1); // Exit the process with a failure code
    });
