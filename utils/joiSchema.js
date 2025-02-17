const Joi = require('joi');

module.exports.postSchema = Joi.object({
    post: Joi.object({
        question: Joi.string().required(),
        description: Joi.string().required(),
        img: Joi.string().allow("", null),
    }).unknown(true)
}).required();

module.exports.answerSchema = Joi.object({
    answer: Joi.object({
        intuition: Joi.string().required(),
        explanation: Joi.string().required(),
        img: Joi.string().allow("", null),
    }).unknown(true)
}).required();
