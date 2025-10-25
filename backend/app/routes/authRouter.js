const express = require('express');
const authController = require('../controllers/authController');
const { validateUser } = require("../validators/userValidator");

const router = express.Router();

router.post('/signup', 
    validateUser,
    authController.signup
);
router.get("/users",
    authController.getAllUsers
);
router.post('/login', authController.login);

module.exports = router;