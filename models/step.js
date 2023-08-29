import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/database.js';

class Step extends Model {}
  
Step.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: new DataTypes.STRING(20),
            allowNull: false,
        },
        createdAt: {
            type: new DataTypes.DATE
        },
        updatedAt: {
            type: new DataTypes.DATE
        }
    },
    {
        tableName: 'steps',
        sequelize, // passing the `sequelize` instance is required;
    },
);

export default Step;