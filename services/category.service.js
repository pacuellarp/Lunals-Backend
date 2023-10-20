const boom = require('@hapi/boom');

const { models }= require('./../libs/sequelize');

class CategoryService {

  constructor(){
  }
  async create(data) {
    const newCategory = await models.Category.create(data);
    return newCategory;
  }

  async find() {
    const categories = await models.Category.findAll();
    return categories;
  }

  async findOne(id) {
    const category = await models.Category.findByPk(id, {
      include: ['products']
    });
    return category;
  }

  async update(id, changes) {
    try {
      const category = await models.Category.findByPk(id);
  
      if (!category) {
        throw boom.notFound('Category not found');
      }
  
      await category.update(changes);
  
      return category;
    } catch (error) {
      throw boom.badImplementation('Error updating category', error);
    }
  }
  
  async delete(id) {
    try {
      const category = await models.Category.findByPk(id);
  
      if (!category) {
        throw boom.notFound('Category not found');
      }
  
      await category.destroy();
  
      return { message: 'Category deleted successfully' };
    } catch (error) {
      throw boom.badImplementation('Error deleting category', error);
    }
  }
  

}

module.exports = CategoryService;
