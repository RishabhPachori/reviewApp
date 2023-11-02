/**
 * @file index.js
 * @summary Initiate and expose routes
 * */
const { getAllReviews, getReviewDetail, addReview, updateReview, deleteReviewDetail } = require('./review/controller');

const initiateRoutes = (router) => {
    // all modules with routes will be added here
    router.post('/reviews/add', addReview);
    router.get('/reviews', getAllReviews);
    router.get('/reviews/:id', getReviewDetail);
    router.put('/reviews/edit', updateReview);
    router.delete('/reviews/delete/:id', deleteReviewDetail);
};

module.exports = initiateRoutes;