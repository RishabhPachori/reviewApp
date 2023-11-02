/**
 * @file server.js
 * @summary Creates HTTP server
 * @description This file is responsible for connecting to mongoDB, creating an HTTP server and adding routes.
 * Server is created by binding express app instance.
 * */
const { createServer } = require('http');
const { log } = require('./errors');
const { constants } = require('./config');
const { app } = require('./app');
const color = require('colors');
const { connectToMongoDb } = require('./db');

const { PORT, LOG_LEVELS } = constants;

connectToMongoDb();

const server = createServer(app);

// Event listeners to catch uncaught errors
process.on('unhandledRejection', error => {
    log(LOG_LEVELS.ERROR, error.message, { time: new Date() });
    process.exit(1);
});

process.on('exit', code => {
    console.log(`Exiting with code: ${code}`);
});

const onError = (error) => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const bind = typeof PORT === 'string' ? 'Pipe ' + PORT : 'Port ' + PORT;

    switch (error.code) {
    case 'EACCES':
        console.error(color.red(bind + ' requires elevated privileges'));
        process.exit(1);
        break;
    case 'EADDRINUSE':
        console.error(color.red(bind + ' is already in use'));
        process.exit(1);
        break;
    default:
        throw error;
    }
};

const onListening = () => {
    const addr = server.address();
    console.log(color.green(`Server is listening on port: http://localhost:${addr.port}`));
};

server.listen(PORT, error => {
    const isErrorExists = !!error;
    if (isErrorExists) {
        return console.log(`Something went wrong: \n${err}`);
    }
    // console.log(`Server is listening on port: http://localhost:${PORT}`);
});

server.on('error', onError);
server.on('listening', onListening);