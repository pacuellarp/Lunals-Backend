const Joi = require('joi');

const id = Joi.number().integer();
const productId = Joi.number().integer();
const link = Joi.string().min(1).max(100);

const createPhotoSchema = Joi.object({
    productId: productId.required(),
    link: link.required()
});

const updatePhotoSchema = Joi.object({ 
    productId: productId,
    link: link,
});

const getPhotoSchema = Joi.object({
    id: id.required(),
});
  
module.exports = { createPhotoSchema, updatePhotoSchema, getPhotoSchema }