import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/database.js';
import Layout from './layout.js';

class LayoutPicture extends Model {}
  
LayoutPicture.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        url: {
            type: new DataTypes.STRING(225),
            allowNull: false,
            defaultValue: '/assets/img/image-not-found.jpg'
        },
    },
    {
        tableName: 'layouts_pictures',
        sequelize, // passing the `sequelize` instance is required;
        timestamps: false,
    },
);

export default LayoutPicture;