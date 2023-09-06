const { Model, DataTypes, Sequelize } = require('sequelize');

const { PRODUCT_TABLE } = require('./product.model');

const PHOTO_TABLE = 'photos';

const PhotoSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
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
  },
  link: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}


class Photo extends Model {
    static associate(models) {
        this.belongsTo(models.Product, { as: 'product' })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PHOTO_TABLE,
      modelName: 'Photo',
      timestamps: false
    }
  }
}



module.exports = { PHOTO_TABLE, PhotoSchema, Photo }
