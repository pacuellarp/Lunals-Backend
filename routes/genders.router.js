const express = require('express');

const GenderService = require('./../services/gender.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createGenderSchema, updateGenderSchema, getGenderSchema } = require('./../schemas/gender.schema');

const router = express.Router();
const service = new GenderService();

router.get('/', 
  async (req, res, next) => {
  try {
      const genders = await service.find();
      res.json(genders);
    } catch (error) {
      next(error);
  }
});

router.get('/:id',
  validatorHandler(getGenderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const gender = await service.findOne(id);
      res.json(gender);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createGenderSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newGender = await service.create(body);
      res.status(201).json(newGender);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(getGenderSchema, 'params'),
  validatorHandler(updateGenderSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const gender = await service.update(id, body);
      res.json(gender);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  validatorHandler(getGenderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({id});
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
