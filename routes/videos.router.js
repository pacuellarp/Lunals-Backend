const express = require('express');

const VideoService = require('../services/video.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createVideoSchema, updateVideoSchema, getVideoSchema } = require('../schemas/video.schema');

const router = express.Router();
const service = new VideoService();

router.get('/', 
  async (req, res, next) => {
  try {
      const videos = await service.find();
      res.json(videos);
    } catch (error) {
      next(error);
  }
});

router.get('/:id',
  validatorHandler(getVideoSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const video = await service.findOne(id);
      res.json(video);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createVideoSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newVideo = await service.create(body);
      res.status(201).json(newVideo);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(getVideoSchema, 'params'),
  validatorHandler(updateVideoSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const video = await service.update(id, body);
      res.json(video);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  validatorHandler(getVideoSchema, 'params'),
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
