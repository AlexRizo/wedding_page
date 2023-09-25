import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/database.js';

class Gentleman extends Model {}
  
Gentleman.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: new DataTypes.STRING(50),
            allowNull: false,
        },
        number: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        orderId: {
            type: DataTypes.INTEGER,
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
        tableName: 'gentlemen',
        sequelize, // passing the `sequelize` instance is required;
    },
);

export default Gentleman;