const boom = require('@hapi/boom');

const { models }= require('../libs/sequelize');

class SizeProductService {

    async create(data) {
        const newSizeProduct = await models.SizeProduct.create(data);
        return newSizeProduct;
    }

    async find() {
        const sizeProduct = await models.SizeProduct.findAll();
        return sizeProduct;
    }

    async findOne(id) {
        const sizeProduct = await models.SizeProduct.findByPk(id);
        return sizeProduct;
    }

    async update(id, changes) {
        try {

            const sizeProduct = await models.SizeProduct.findByPk(id);
        
            if (!sizeProduct) {
                throw boom.notFound('sizeProduct not found');
            }

            await sizeProduct.update(changes);
        
            return sizeProduct;
        } catch (error) {
            throw boom.badImplementation('Error updating sizeProduct', error);
        }
    }

    async delete(id) {
        try {

            const sizeProduct = await models.SizeProduct.findByPk(id);
        
            if (!sizeProduct) {
                throw boom.notFound('sizeProduct not found');
            }

            await sizeProduct.destroy();
        

            return { message: 'sizeProduct deleted successfully' };
        } catch (error) {
            throw boom.badImplementation('Error deleting sizeProduct', error);
        }
    }

    async getAvailableSizesForProduct(productId) {
        try {
          const productSizes = await models.SizeProduct.findAll({
            where: { productId },
            include: [
              { model: models.Size, as: 'sizes',attributes: ['name'] } // Incluye el modelo Size para obtener los detalles de la talla
            ]
          });
    
          const availableSizes = productSizes.map(sizeProduct => sizeProduct.sizes.name);
          return availableSizes;
        } catch (error) {
          throw new Error('Error al obtener las tallas disponibles para el producto: ' + error.message);
        }
    }
    
}

module.exports = SizeProductService;