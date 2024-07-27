const UserModel = require("../models/UserModel.js");

async function checkEmail(req, res) {
    try {
        const { email } = req.body;

        // Validate the email input
        if (!email) {
            return res.status(400).json({
                message: "Email is required",
                error: true
            });
        }

        // Check if user already exists
        const user = await UserModel.findOne({ email }).select('-password');
        
        if (!user) {
            return res.status(404).json({
                message: "User does not exist",
                error: true
            });
        }

        return res.status(200).json({
            message: "Email verified",
            success: true,
            data: user
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true
        });
    }
}

module.exports = checkEmail;
