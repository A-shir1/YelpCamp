const { campgroundJOISchema, reviewJOISchema } = require('./JoiSchema');
const Campground = require('./models/campgrounds');
const Review = require('./models/reviews');
const AppError = require('./utils/AppError'); 

module.exports.campgroundValidator = (req, res, next) => {

    const { error } = campgroundJOISchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',')
        throw new AppError(msg, 400);
    } else{
        next();
    }
}

module.exports.reviewValidator = (req, res, next) => {
    
    const { error } = reviewJOISchema.validate(req.body);
    
    if(error){
        const msg = error.details.map(el => el.message).join(',')
        throw new AppError(msg, 400);
    } else{
        next();
    }
}


module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
    next();
}

module.exports.isCampAuthor = async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if(!campground.author.equals(req.user._id)){
        req.flash('error', 'You do not have the permission to do that!');
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}

module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if(!review.author.equals(req.user._id)){
        req.flash('error', 'You do not have the permission to do that!');
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}