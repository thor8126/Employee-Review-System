const express = require('express');
const router = express.Router();
const passport = require('passport');

const { register } = require('../controllers/userController.js');

const { isAuthenticated } = require('../config/isAuthenticated.js');




router.post('/register', register);

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));



module.exports = router;