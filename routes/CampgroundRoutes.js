const express = require('express');
const wrapAsync = require('../utils/wrapAsync');
const { campgroundValidator, isLoggedIn, isCampAuthor } = require('../middleware');
const CampgroundCtrl = require('../controllers/CampgroundCtrl');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });    
// const { check, validationResult } = require("express-validator");

const router = express.Router();

router.route('/')
    .get(wrapAsync(CampgroundCtrl.index))
    .post(isLoggedIn, upload.array('image'), campgroundValidator, wrapAsync(CampgroundCtrl.createCampground));

router.get('/new', isLoggedIn, CampgroundCtrl.renderNewForm);


router.route('/:id')
    .get(wrapAsync(CampgroundCtrl.showCampground))
    .put(isLoggedIn, isCampAuthor, upload.array('image'), campgroundValidator, wrapAsync(CampgroundCtrl.editCampground))
    .delete(isLoggedIn, isCampAuthor, wrapAsync(CampgroundCtrl.deleteCampground));

    
router.get('/:id/edit', isLoggedIn, isCampAuthor, wrapAsync(CampgroundCtrl.renderEditForm));



module.exports = router;