const Joi = require('joi');

const id = Joi.number().integer();
const colorId = Joi.number().integer();
const productId = Joi.number().integer();

const createColorProductSchema= Joi.object({
    colorId: colorId.required(),
    productId: productId.required(),
})

const updateColorProductSchema= Joi.object({
    colorId: colorId,
    productId: productId,
})

const getColorProductSchema= Joi.object({
    id: id.required(),
})

const deleteColorProductSchema= Joi.object({
    id: id.required(),
})

const getAvailableColorsForProductSchema = Joi.object({
    productId: productId.required(),
})

module.exports = {createColorProductSchema,updateColorProductSchema,getColorProductSchema,deleteColorProductSchema, getAvailableColorsForProductSchema}