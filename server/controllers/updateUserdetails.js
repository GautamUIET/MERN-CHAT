const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');

const updateUserdetails = async (req, res) => {
  try {
    const token = req.cookies.token || "";

    // Log the token to debug
    console.log("Token from cookies:", token);

    if (!token) {
      return res.status(401).json({
        message: "No token provided",
        success: false
      });
    }

    // Verify and decode the token
    const secretKey = process.env.JWT_SECRET_KEY; // Ensure you have a secret key set in your environment variables
    let user;
    try {
      user = jwt.verify(token, secretKey);
    } catch (error) {
      return res.status(401).json({
        message: "Invalid token",
        success: false
      });
    }

    // Extract user ID from the decoded token
    const userId = user._id;
    const { name, profile_pic } = req.body;

    if (!name && !profile_pic) {
      return res.status(400).json({
        message: "No data provided to update",
        success: false
      });
    }

    await UserModel.updateOne({ _id: userId }, { name, profile_pic });

    const userInformation = await UserModel.findById(userId);

    if (!userInformation) {
      return res.status(404).json({
        message: "User not found after update",
        success: false
      });
    }

    return res.json({
      message: "User updated successfully",
      data: userInformation,
      success: true
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false
    });
  }
};

module.exports = updateUserdetails;
