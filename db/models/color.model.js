const { Model, DataTypes, Sequelize } = require('sequelize');

const COLOR_TABLE = 'colors';

const ColorSchema = {
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
      hexCode: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
}

class Color extends Model {

    static associate(models) {
        this.belongsToMany(models.Product, {
            as: 'items',
            through: models.ColorProduct,
            foreignKey: 'colorId',
            otherKey: 'productId'
        });
    }
    
    static config(sequelize) {
        return {
            sequelize,
            tableName: COLOR_TABLE,
            modelName: 'Color',
            timestamps: false
        }
    }
}


      
      
module.exports = { Color, COLOR_TABLE, ColorSchema}