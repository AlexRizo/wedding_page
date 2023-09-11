import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/database.js';
import Order from './order.js';

class Image extends Model {}
  
Image.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: new DataTypes.STRING(225),
            allowNull: false,
        },
        url: {
            type: new DataTypes.STRING(225),
            allowNull: false,
        },
        orderId: {
            type: new DataTypes.INTEGER,
            allowNull: false,
        },
        publicId: {
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
        tableName: 'images',
        sequelize, // passing the `sequelize` instance is required;
    },
);

Order.hasMany(Image, { foreignKey: 'orderId', targetKey:'id' });
Image.belongsTo(Order);

export default Image;