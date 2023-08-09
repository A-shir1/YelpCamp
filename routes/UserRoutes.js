const express = require('express');
const wrapAsync = require('../utils/wrapAsync');
const passport = require('passport');
const { storeReturnTo } = require('../middleware');
const UserCtrl = require('../controllers/UserCtrl');


const router = express.Router();

router.route('/register')
    .get(UserCtrl.renderRegisterForm)
    .post(wrapAsync(UserCtrl.registerUser));

router.route('/login')
    .get(UserCtrl.renderLoginForm)
    .post(storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), UserCtrl.loginUser);

    
router.post('/logout', UserCtrl.logoutUser);

module.exports = router;
