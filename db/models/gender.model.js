const { Model, DataTypes, Sequelize } = require('sequelize');

const GENDER_TABLE = 'genders';

const GenderSchema = {
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
}

class Gender extends Model {

    static associate(models) {
        this.hasMany(models.Gender, {
            as: 'gender',
            foreignKey: 'genderId'
        });
    }
    
    static config(sequelize) {
        return {
            sequelize,
            tableName: GENDER_TABLE,
            modelName: 'Gender',
            timestamps: false
        }
    }
}
      
      
module.exports = { Gender, GENDER_TABLE, GenderSchema}