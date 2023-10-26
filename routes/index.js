const express = require('express');

const productsRouter = require('./products.router');
const categoriesRouter = require('./categories.router');
//const orderRouter = require('./orders.router');
const gendersRouter = require('./genders.router');
const colorsRouter = require('./colors.router');
const sizesRouter = require('./sizes.router');
const photosRouter = require('./photos.route');
const videosRouter = require('./videos.router');
const sizeProductsRouter = require('./size-products.router')
const colorProductsRouter = require('./color-products.router')

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/categories', categoriesRouter);
  router.use('/genders',gendersRouter);
  router.use('/colors',colorsRouter);
  router.use('/sizes',sizesRouter);
  router.use('/photos',photosRouter);
  router.use('/videos',videosRouter);
  router.use('/size-product',sizeProductsRouter)
  router.use('/color-product',colorProductsRouter)
}

module.exports = routerApi;
