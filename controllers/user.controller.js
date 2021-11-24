const { User } = require("../dataBase");
const { userService } = require("../services");
const { responseCodesEnum } = require("../constants");

const userController = {
    getAllUsers: async (req, res, next) => {
        const users = await User.find();

        res.json(users);
    },

    createUser: async (req, res, next) => {
        try {
            const user = new User(req.body);

            await user.save();

            res.json(user);
        } catch (e) {
            next(e);
        }

    },

    getSingleUser: async (req, res, next) => {
        try {
            res.json(req.user);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const { user } = req;

            await User.deleteOne({ _id: user._id });

            res.status(responseCodesEnum.NO_CONTENT);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const { user } = req;

            await User.updateOne({ _id: user.id }, req.body);
        } catch (e) {
            next(e);
        }
    }
};

module.exports = userController;