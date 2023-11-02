/**
 * @file controller.js
 * @summary Reviews controllers
 * @description This file contains controller definition for review entity.
 * Each method is responsible for extracting data, passing to corresponding action and
 * send response back to client.
*/

const { createId, createReview, deleteReviewById, getReviewById, getReviews, updateReviewById } = require('../../db/controllers/reviews');
const { constants } = require('../../config');

const { SUCCESS, ERROR } = constants;

/**
 * Controller to get all the reviews
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
*/
const getAllReviews = async (req, res) => {
    try {
        const reviewsList = await getReviews();

        const isReviewsListExists = !!reviewsList && reviewsList.length > 0;
        if (!isReviewsListExists) {
            return res.status(SUCCESS.CODE).send({ isSuccess: true, data: [], message: 'Successfully get all the reviews.' });
        }

        return res.status(SUCCESS.CODE).send({ isSuccess: true, data: reviewsList, message: 'Successfully get all the reviews.' }); 
    } catch (error) {
        return res.status(ERROR.BAD_REQUEST.CODE).send({ isSuccess: false, message: error.message });
    }
};

/**
 * Controller to get the review detail
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
*/
const getReviewDetail = async (req, res) => {
    try {
        const id = req.params.id || '';
        const isIdExists = !!id;
        if (!isIdExists) {
            return res.status(ERROR.BAD_REQUEST.CODE).send({ isSuccess: false, message: 'Please provide review id.' });
        }

        const reviewDetails = await getReviewById(id);

        const isReviewDetailsExists = !!reviewDetails && Object.keys(reviewDetails).length > 0;
        if (!isReviewDetailsExists) {
            return res.status(ERROR.BAD_REQUEST.CODE).send({ isSuccess: false, message: 'Review not found.' });
        }

        return res.status(SUCCESS.CODE).send({ isSuccess: true, data: reviewDetails, message: 'Successfully get the review details.' }); 
    } catch (error) {
        return res.status(ERROR.BAD_REQUEST.CODE).send({ isSuccess: false, message: error.message });
    }
};

/**
 * Controller to add the review detail
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
*/
const addReview = async (req, res) => {
    try {
        const requestBody = req.body || {};
        const isRequestBodyExists = !!requestBody && Object.keys(requestBody).length > 0;
        if (!isRequestBodyExists) {
            return res.status(ERROR.BAD_REQUEST.CODE).send({ isSuccess: false, message: 'Please provide review details.' });
        }

        const reviewObject = {
            _id: createId() + '',
            title: requestBody.title,
            content: requestBody.content,
            createdAt: new Date()
        };
        const addedReview = await createReview(reviewObject);

        const isAddedReviewDetails = !!addedReview && Object.keys(addedReview).length > 0;
        if (!isAddedReviewDetails) {
            return res.status(ERROR.BAD_REQUEST.CODE).send({ isSuccess: false, message: 'Adding review failed.' });
        }

        return res.status(SUCCESS.CODE).send({ isSuccess: true, message: 'Successfully created review.' }); 
    } catch (error) {
        return res.status(ERROR.BAD_REQUEST.CODE).send({ isSuccess: false, message: error.message });
    }
};

/**
 * Controller to update the review detail
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
*/
const updateReview = async (req, res) => {
    try {
        const requestBody = req.body || {};
        const isRequestBodyExists = !!requestBody && Object.keys(requestBody).length > 0;
        if (!isRequestBodyExists) {
            return res.status(ERROR.BAD_REQUEST.CODE).send({ isSuccess: false, message: 'Please provide review details to update.' });
        }

        const id = requestBody.id || '';
        const isIdExists = !!id;
        if (!isIdExists) {
            return res.status(ERROR.BAD_REQUEST.CODE).send({ isSuccess: false, message: 'Please provide review id.' });
        }

        const reviewDetails = await getReviewById(id);

        const isReviewDetailsExists = !!reviewDetails && Object.keys(reviewDetails).length > 0;
        if (!isReviewDetailsExists) {
            return res.status(ERROR.BAD_REQUEST.CODE).send({ isSuccess: false, message: 'Review not found.' });
        }

        const updateObject = requestBody.updateObject || {};
        const isDataToBeUpdateExists = !!updateObject && Object.keys(updateObject).length > 0;
        if (!isDataToBeUpdateExists) {
            return res.status(ERROR.BAD_REQUEST.CODE).send({ isSuccess: false, message: 'Please provide review details to update.' });
        }

        const updatedReview = await updateReviewById(id, updateObject);

        const isUpdatedReviewDetails = !!updatedReview && Object.keys(updatedReview).length > 0;
        if (!isUpdatedReviewDetails) {
            return res.status(ERROR.BAD_REQUEST.CODE).send({ isSuccess: false, message: 'Updating review failed.' });
        }

        return res.status(SUCCESS.CODE).send({ isSuccess: true, message: 'Successfully updated review details.' }); 
    } catch (error) {
        return res.status(ERROR.BAD_REQUEST.CODE).send({ isSuccess: false, message: error.message });
    }
};

/**
 * Controller to delete the review detail
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
*/
const deleteReviewDetail = async (req, res) => {
    try {
        const id = req.params.id || '';
        const isIdExists = !!id;
        if (!isIdExists) {
            return res.status(ERROR.BAD_REQUEST.CODE).send({ isSuccess: false, message: 'Please provide review id.' });
        }

        const reviewDetails = await getReviewById(id);

        const isReviewDetailsExists = !!reviewDetails && Object.keys(reviewDetails).length > 0;
        if (!isReviewDetailsExists) {
            return res.status(ERROR.BAD_REQUEST.CODE).send({ isSuccess: false, message: 'Review not found.' });
        }

        const deletedReview = await deleteReviewById(id);

        const isDeleted = deletedReview.deletedCount > 0;
        if (!isDeleted) {
            return res.status(ERROR.BAD_REQUEST.CODE).send({ isSuccess: false, message: 'Deleting review failed.' });
        }

        return res.status(SUCCESS.CODE).send({ isSuccess: true, data: reviewDetails, message: 'Successfully deleted the review details.' }); 
    } catch (error) {
        return res.status(ERROR.BAD_REQUEST.CODE).send({ isSuccess: false, message: error.message });
    }
};

module.exports = {
    getAllReviews,
    getReviewDetail,
    addReview,
    updateReview,
    deleteReviewDetail
};