const { UserModel } = require("../dataBase");
const { ErrorHandler, errorMessagesEnum } = require("../errors");
const { responseCodesEnum } = require("../constants");

const userMiddleware = {
    throwIfUserNotExist: (req, res, next) => {
        try {
            const { user } = req;

            if (!user) {
                throw new ErrorHandler(responseCodesEnum.NOT_FOUND, errorMessagesEnum.USER_NOT_FOUND)
            }

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },

    throwIfUserExist: (req, res, next) => {
        try {
            const { user } = req;

            if (user) {
                throw new ErrorHandler(responseCodesEnum.BAD_REQUEST, errorMessagesEnum.USER_ALREADY_EXIST);
            }

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },

    getUserByDynamicParam: (param, searchIn = 'body', fieldInDb = param) => async (req, res, next) => {
        try {
            const value = req[searchIn][param];

            const user = await UserModel.findOne({ [fieldInDb]: value });

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    }
};

module.exports = userMiddleware;