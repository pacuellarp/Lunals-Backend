const { Model, DataTypes, Sequelize } = require('sequelize');

const { SIZE_TABLE } = require('./size.model');
const { PRODUCT_TABLE } = require('./product.model');

const SIZE_PRODUCT_TABLE = 'sizes_products';

const SizeProductSchema =  {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  sizeId: {
    field: 'size_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: SIZE_TABLE,
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

class SizeProduct extends Model {

  static associate(models) {
    this.belongsTo(models.Size, { foreignKey: 'sizeId', targetKey: 'id', as: 'sizes' })
    this.belongsTo(models.Product, { foreignKey: 'productId', targetKey: 'id', as: 'items' })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: SIZE_PRODUCT_TABLE,
      modelName: 'SizeProduct',
      timestamps: false
    }
  }
}


module.exports = { SizeProduct, SizeProductSchema, SIZE_PRODUCT_TABLE };