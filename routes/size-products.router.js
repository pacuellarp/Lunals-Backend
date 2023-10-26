const express = require('express');

const SizeProductService = require('../services/size-product.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createSizeProductSchema,updateSizeProductSchema,getSizeProductSchema,deleteSizeProductSchema,getAvailableSizesForProductSchema } = require('../schemas/size-product.schema');

const router = express.Router();
const service = new SizeProductService();

router.get('/', 
  async (req, res, next) => {
  try {
      const sizeProducts = await service.find();
      res.json(sizeProducts);
    } catch (error) {
      next(error);
  }
});

router.get('/:id',
  validatorHandler(getSizeProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const sizeProducts = await service.findOne(id);
      res.json(sizeProducts);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createSizeProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newSizeProducts = await service.create(body);
      res.status(201).json(newSizeProducts);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(getSizeProductSchema, 'params'),
  validatorHandler(updateSizeProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const size = await service.update(id, body);
      res.json(size);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  validatorHandler(getSizeProductSchema, 'params'),
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

router.get('/sizesbyproduct/:productId/', 
    validatorHandler(getAvailableSizesForProductSchema, 'params'),
    async (req, res, next) => {
    try {
        const { productId } = req.params;
        const availableSizes = await service.getAvailableSizesForProduct(productId);
        res.status(201).json({ availableSizes }); // Envía las tallas disponibles como un objeto JSON
    } catch (error) {
        next(error);
    }
});

module.exports = router;
