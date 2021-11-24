const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const { configs, responseCodesEnum } = require('./constants');
const { userRouter } = require("./routes");


mongoose.connect(configs.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(configs.PORT, () => {
    console.log('App listen on ' + configs.PORT);
});

app.use('/users', userRouter);
app.use('*', _notFoundErrorHandler);
app.use(_mainErrorHandler);

function _notFoundErrorHandler(err, req, res, next) {
    next({
        status: err.status || responseCodesEnum.NOT_FOUND,
        message: err.message || 'Not found'// TODO error messages
    });
}


// eslint-disable-next-line no-unused-vars
function _mainErrorHandler(err, req, res, next) {
    res
        .status(err.status || responseCodesEnum.SERVER_ERROR)
        .json({
            message: err.message || 'Internal server error'
        });
}


