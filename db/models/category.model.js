const { Model, DataTypes, Sequelize } = require('sequelize');

const { GENDER_TABLE } = require('./gender.model');

const CATEGORY_TABLE = 'categories';

const CategorySchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  genderId: {
    field: 'gender_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: GENDER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
}


class Category extends Model {

  static associate(models) {
    this.belongsTo(models.Gender, { as: 'gender' })
    this.hasMany(models.Product, {
      as: 'products',
      foreignKey: 'categoryId'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CATEGORY_TABLE,
      modelName: 'Category',
      timestamps: false
    }
  }
}

module.exports = { Category, CategorySchema, CATEGORY_TABLE };
