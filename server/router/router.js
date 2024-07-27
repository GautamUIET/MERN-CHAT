const express = require("express");
const registerUser = require("../controllers/registerUser.js");
const checkEmail = require("../controllers/checkEmail.js");
const checkPassword = require("../controllers/checkPass.js");
const userDetails = require("../controllers/userDetails.js");
const Logout = require("../controllers/Logout.js");
const updateUserdetails = require("../controllers/updateUserdetails.js");
const searchUser = require("../controllers/searchUser.js");

const router = express.Router();

router.post('/register',registerUser);
router.post('/email',checkEmail);
router.post('/pass',checkPassword);
router.get('/user-details',userDetails);
router.get('/logout',Logout);
router.post('/update-user',updateUserdetails);
router.post('/search-user',searchUser);

module.exports = router;