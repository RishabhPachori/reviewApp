# Review app backend code

### Prerequisites
```
    node, mongoDB
```

### Usage
* cd backend
* Run `npm i` to install all the dependencies.
* Start mongoDB server.
* Add `.env` file to the root of this project with following configuration.
```
PORT=8080
ENVIRONMENT=DEVELOPMENT
SECRET=test123
DB_HOST=localhost
DB_PORT=27017
DB_NAME=reviewApp
ENABLE_DEBUG_LOGS=true
ENABLE_ACCESS_LOGS=true
```
* Run `npm start` to run the server.

* For api postman collection you can import this file "ReviewApp.postman_collection.json" which is in root level of backend directory
