import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/database.js';

class Layout extends Model {}
  
Layout.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: new DataTypes.STRING(10),
            allowNull: false,
        },
        description: {
            type: new DataTypes.STRING(1000),
            allowNull: false,
        },
    },
    {
        tableName: 'layouts',
        sequelize, // passing the `sequelize` instance is required;
        timestamps: false,
    },
);

export default Layout;