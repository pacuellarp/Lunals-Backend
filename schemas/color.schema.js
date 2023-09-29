const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(1).max(20);
const hexCode = Joi.string().min(3).max(6);

const createColorSchema = Joi.object({
    name: name.required(),
    hexCode: hexCode.required(),
})

const updateColorSchema = Joi.object({
    name: name,
    hexCode: hexCode,
})

const getColorSchema = Joi.object({
    id: id.required(),
})

module.exports = {createColorSchema,updateColorSchema,getColorSchema}


