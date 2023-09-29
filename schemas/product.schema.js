const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(50);
const categoryId = Joi.number().integer();
const reference = Joi.number().integer();
const price = Joi.number().integer();
const overview = Joi.string();
const material = Joi.string();


const price_min = Joi.number().integer();
const price_max = Joi.number().integer();

const limit = Joi.number().integer();
const offset = Joi.number().integer();

const createProductSchema = Joi.object({
  name: name.required(),
  categoryId: categoryId.required(),
  reference: reference.required(),
  price: price.required(),
  overview: overview.required(),
  material: material.required(),
});

const updateProductSchema = Joi.object({
  name: name,
  categoryId: categoryId,
  reference: reference,
  price: price,
  overview: overview,
  material: material,
});

const getProductSchema = Joi.object({
  id: id.required(),
});

const queryProductSchema = Joi.object({
  limit,
  offset,
  price,
  price_min,
  price_max: Joi.when('price_min', {
    is: Joi.exist(),
    then: price_max.required(),
  })
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema, queryProductSchema }
