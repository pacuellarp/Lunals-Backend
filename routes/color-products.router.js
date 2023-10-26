const express = require('express');

const ColorProductService = require('../services/color-product.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createColorProductSchema,updateColorProductSchema,getColorProductSchema,deleteColorProductSchema, getAvailableColorsForProductSchema } = require('../schemas/color-product.schema');

const router = express.Router();
const service = new ColorProductService();

router.get('/', 
  async (req, res, next) => {
  try {
      const colorProducts = await service.find();
      res.json(colorProducts);
    } catch (error) {
      next(error);
  }
});

router.get('/:id',
  validatorHandler(getColorProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const colorProducts = await service.findOne(id);
      res.json(colorProducts);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createColorProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newColorProducts = await service.create(body);
      res.status(201).json(newColorProducts);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(getColorProductSchema, 'params'),
  validatorHandler(updateColorProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const color = await service.update(id, body);
      res.json(color);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  validatorHandler(getColorProductSchema, 'params'),
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

router.get('/colorsbyproduct/:productId/', 
    validatorHandler(getAvailableColorsForProductSchema, 'params'),
    async (req, res, next) => {
    try {
        const { productId } = req.params;
        const availableColors = await service.getAvailableColorsForProduct(productId);
        res.status(201).json({ availableColors }); // Envía las tallas disponibles como un objeto JSON
    } catch (error) {
        next(error);
    }
});

module.exports = router;
