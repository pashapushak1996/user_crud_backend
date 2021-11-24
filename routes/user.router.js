const router = require('express').Router();

const { userController } = require("../controllers");
const { userMiddleware } = require("../middlewares");

router.get('/', userController.getAllUsers);

router.post('/', userController.createUser);

router.get('/:user_id',
    userMiddleware.getUserByDynamicParam('user_id', 'params', '_id'),
    userMiddleware.throwIfUserNotExist,
    userController.getSingleUser);

router.delete('/:user_id',
    userMiddleware.getUserByDynamicParam('user_id', 'params', '_id'),
    userMiddleware.throwIfUserNotExist,
    userController.deleteUser);

router.patch('/:user_id',
    userMiddleware.getUserByDynamicParam('user_id', 'params', '_id'),
    userController.updateUser);

module.exports = router;