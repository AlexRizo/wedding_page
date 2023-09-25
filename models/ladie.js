import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/database.js';
import Order from './order.js';

class Ladie extends Model {}
  
Ladie.init(
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
        tableName: 'ladies',
        sequelize, // passing the `sequelize` instance is required;
    },
);

Order.hasMany(Ladie, { foreignKey: 'orderId', targetKey:'id' });
Ladie.belongsTo(Order);

export default Ladie;