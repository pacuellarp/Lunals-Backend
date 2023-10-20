const { Op } = require('sequelize');
const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class ProductsService {

  constructor(){
    this.products = [];
  }

  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async find(query) {
    const options = {
      include: ['category'],
      where: {}
    }
    const { limit, offset } = query;
    if (limit && offset) {
      options.limit =  limit;
      options.offset =  offset;
    }

    const { price } = query;
    if (price) {
      options.where.price = price;
    }

    const { price_min, price_max } = query;
    if (price_min && price_max) {
      options.where.price = {
        [Op.gte]: price_min,
        [Op.lte]: price_max,
      };
    }
    const products = await models.Product.findAll(options);
    return products;
  }

  async findOne(id) {
    const product = this.products.find(item => item.id === id);
    if (!product) {
      throw boom.notFound('product not found');
    }
    if (product.isBlock) {
      throw boom.conflict('product is block');
    }
    return product;
  }

  async addSize(data) {
    const newSize = await models.SizeProduct.create(data);
    return newSize;
  }

  async addColor(data) {
    const newColor = await models.ColorProduct.create(data);
    return newColor;
  }

  async update(id, changes) {
    try {
      const product = await models.Product.findByPk(id);
  
      if (!product) {
        throw boom.notFound('Product not found');
      }
  
      await product.update(changes);
  
      return product;
    } catch (error) {
      throw boom.badImplementation('Error updating product', error);
    }
  }
  
  async delete(id) {
    try {
      const product = await models.Product.findByPk(id);
  
      if (!product) {
        throw boom.notFound('Product not found');
      }
  
      await product.destroy();
  
      return { message: 'Product deleted successfully' };
    } catch (error) {
      throw boom.badImplementation('Error deleting product', error);
    }
  }
  

}

module.exports = ProductsService;
