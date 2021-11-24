const Joi = require('joi');
const { regExpEnum, userTypesEnum } = require("../constants");


const createValidator = Joi.object({
    username: Joi.string().required().trim(),
    first_name: Joi.string().min(2).max(30).required(),
    last_name: Joi.string().min(2).max(30).required(),
    email: Joi.string().regex(regExpEnum.EMAIL_REGEX).trim().required(),
    password: Joi.string().regex(regExpEnum.PASSWORD_REGEX).trim().required(),
    user_type: Joi.string().valid(...Object.values(userTypesEnum)).required().default(userTypesEnum.DRIVER)
});

const updateValidator = Joi.object({
    username: Joi.string().trim(),
    first_name: Joi.string().min(2).max(30),
    last_name: Joi.string().min(2).max(30),
    password: Joi.string().regex(regExpEnum.PASSWORD_REGEX).trim(),
});

module.exports = {
    createValidator,
    updateValidator
};
