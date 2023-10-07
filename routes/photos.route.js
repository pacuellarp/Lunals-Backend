const express = require('express');

const PhotoService = require('../services/photo.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createPhotoSchema, updatePhotoSchema, getPhotoSchema } = require('../schemas/photo.schema');

const router = express.Router();
const service = new PhotoService();

router.get('/', 
  async (req, res, next) => {
  try {
      const photos = await service.find();
      res.json(photos);
    } catch (error) {
      next(error);
  }
});

router.get('/:id',
  validatorHandler(getPhotoSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const photo = await service.findOne(id);
      res.json(photo);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createPhotoSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newPhoto = await service.create(body);
      res.status(201).json(newPhoto);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(getPhotoSchema, 'params'),
  validatorHandler(updatePhotoSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const photo = await service.update(id, body);
      res.json(photo);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  validatorHandler(getPhotoSchema, 'params'),
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
