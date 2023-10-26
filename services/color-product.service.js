const boom = require('@hapi/boom');

const { models }= require('../libs/sequelize');

class ColorProductService {
    

    async create(data) {
        const newColorProduct = await models.ColorProduct.create(data);
        return newColorProduct;
    }

    async find() {
        const colorProduct = await models.ColorProduct.findAll();
        return colorProduct;
    }

    async findOne(id) {
        const colorProduct = await models.ColorProduct.findByPk(id);
        return colorProduct;
    }

    async update(id, changes) {
        try {

            const colorProduct = await models.ColorProduct.findByPk(id);

            if (!colorProduct) {
                throw boom.notFound('colorProduct not found');
            }

            await colorProduct.update(changes);

            return colorProduct;
        } catch (error) {
            throw boom.badImplementation('Error updating colorProduct', error);
        }
    }

    async delete(id) {
        try {

            const colorProduct = await models.ColorProduct.findByPk(id);
        
            if (!colorProduct) {
                throw boom.notFound('colorProduct not found');
            }

            await colorProduct.destroy();
        

            return { message: 'colorProduct deleted successfully' };
        } catch (error) {
            throw boom.badImplementation('Error deleting colorProduct', error);
        }
    }

    async getAvailableColorsForProduct(productId) {
        try {
          const productColors = await models.ColorProduct.findAll({
            where: { productId },
            include: [
              { model: models.Color, as: 'colors',attributes: ['name'] } 
            ]
          });
    
          const availableColors = productColors.map(colorProduct => colorProduct.colors.name);
          return availableColors;
        } catch (error) {
          throw new Error('Error al obtener los colores disponibles para el producto: ' + error.message);
        }
    }

}

module.exports = ColorProductService;