const { Model, DataTypes, Sequelize } = require('sequelize');

const { COLOR_TABLE } = require('./color.model');
const { PRODUCT_TABLE } = require('./product.model');

const COLOR_PRODUCT_TABLE = 'colors_products';

const ColorProductSchema =  {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  colorId: {
    field: 'color_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: COLOR_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  productId: {
    field: 'product_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PRODUCT_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

class ColorProduct extends Model {

  static associate(models) {
    this.belongsTo(models.Color, { foreignKey: 'colorId', targetKey: 'id', as: 'colors' })
    this.belongsTo(models.Product, { foreignKey: 'productId', targetKey: 'id', as: 'items' })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: COLOR_PRODUCT_TABLE,
      modelName: 'ColorProduct',
      timestamps: false
    }
  }
}



module.exports = { ColorProduct, ColorProductSchema, COLOR_PRODUCT_TABLE };