/**
 * @file reviews.js
 * @summary Defines review schema
 * */

const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    _id: { type: String },
    title: { type: String },
    content: { type: String },
    createdAt: { type: Date }
});

module.exports = {
    Reviews: mongoose.model("Reviews", reviewSchema)
};
