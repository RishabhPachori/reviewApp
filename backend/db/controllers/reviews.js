/**
 * @file reviews.js
 * @summary Defines and exposes methods for reviews entity
 * */
const { Reviews } = require('../models');
const mongoose = require('mongoose');

/**
 * Method to get review by id from DB
 * @param {string} reviewId Review id
 * @param {object} [selection] Object with DB projection
 * */
const getReviewById = (id, selection = {}) => Reviews.findOne({
    _id: id
}, selection).lean();

/**
 * Method to get reviews info from DB
 * @param {string} condition Condition by which review will be fetched
 * @param {object} [selection] Object with DB projection
 * */
const getReviews = (condition = {}, selection = {}) => Reviews.find(condition, selection).lean();

/**
 * Method to create Reviews in DB
 * @param {object} reviewObj Review info to save
 * */
const createReview = (reviewObj) => {
    const review = new Reviews(reviewObj);
    return review.save();
};

/**
 * Method to get review by id from DB
 * @param {string} id
 * @param {object} updates Data to update
 * */
const updateReviewById = (id, updates) => Reviews.updateOne({
    _id: id
}, {
    $set: updates
});

/**
 * Create id in string and if you pass a id then it creates mongoId
 * @param {string} id Mongo id (optional) 
*/
const createId = (id = '') => {
    const isIdExists = !!id;
    if (!isIdExists) {
        return new mongoose.Types.ObjectId();
    }
    return new mongoose.Types.ObjectId(id);
};

const deleteReviewById = (id) => Reviews.deleteOne({ _id: id });

module.exports = {
    getReviewById,
    getReviews,
    createReview,
    updateReviewById,
    createId,
    deleteReviewById
};
