const Joi = require('joi');

const id = Joi.number().integer();
const productId = Joi.number().integer();
const link = Joi.string().min(1).max(100);

const createVideoSchema = Joi.object({
    productId: productId.required(),
    link: link.required()
});

const updateVideoSchema = Joi.object({ 
    productId: productId,
    link: link,
});

const getVideoSchema = Joi.object({
    id: id.required(),
});
  
module.exports = { createVideoSchema, updateVideoSchema, getVideoSchema }