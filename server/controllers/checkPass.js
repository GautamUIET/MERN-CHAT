const UserModel = require("../models/UserModel.js");
const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken');

async function checkPassword(req, res) {
    try {
        const { userId, password } = req.body;

        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                error: true
            });
        }
        const verifyPassword = await bcryptjs.compare(password, user.password);

        if (!verifyPassword) {
            return res.status(400).json({
                message: "Wrong password",
                error: true
            });
        }

        const tokenData = {
            id: user._id,
            email: user.email
        };

        const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });

        const cookieOptions = {
            httpOnly: true,
        };

        return res.cookie('token', token, cookieOptions)
            .status(200).json({
                message: "Login successfully",
                token: token,
                success: true
            });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true
        });
    }
}

module.exports = checkPassword;
