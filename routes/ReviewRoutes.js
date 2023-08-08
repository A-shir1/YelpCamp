const express = require('express');
const wrapAsync = require('../utils/wrapAsync');
const { reviewValidator, isLoggedIn, isReviewAuthor } = require('../middleware');
const ReviewCtrl = require('../controllers/ReviewCtrl');

const router = express.Router({ mergeParams: true });    // NEED THIS SO THAT WE CAN USE REQ.PARAMS


router.post('/', isLoggedIn, reviewValidator, wrapAsync(ReviewCtrl.createReview));

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, wrapAsync(ReviewCtrl.deleteReview));

module.exports = router;