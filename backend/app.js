/**
 * @file app.js
 * @summary Create and expose express app instance
 * @description This file is responsible for creating instance of express and initializing swagger. All application specific
 * middleware will be used here.
 * The app instance along with the express router are exposed to be used by HTTP server.
*/
const express = require('express');
const cors = require('cors');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const initiateRoutes = require('./modules');

const app = express();

app.use(express.urlencoded({ limit: '100mb', extended: true }));

app.use(express.json({ limit: "100mb", extended: true }));

app.use(cors());

app.use(rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 120, // maximum 100 requests per minute
    message: "Too many requests from this IP, please try again in a minute",
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
}));

initiateRoutes(router);

app.use('/', router);

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access', 'application/json');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});

// For serving files statically from 'public' directory
app.use('/public', express.static('public'));

module.exports = {
    app,
    router
};
