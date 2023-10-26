const Joi = require('joi');

const id = Joi.number().integer();
const sizeId = Joi.number().integer();
const productId = Joi.number().integer();

const createSizeProductSchema= Joi.object({
    sizeId: sizeId.required(),
    productId: productId.required(),
})

const updateSizeProductSchema= Joi.object({
    sizeId: sizeId,
    productId: productId,
})

const getSizeProductSchema= Joi.object({
    id: id.required(),
})

const deleteSizeProductSchema= Joi.object({
    id: id.required(),
})

const getAvailableSizesForProductSchema = Joi.object({
    productId: productId.required(),
})

module.exports = {createSizeProductSchema,updateSizeProductSchema,getSizeProductSchema,deleteSizeProductSchema,getAvailableSizesForProductSchema}