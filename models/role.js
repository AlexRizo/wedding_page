import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/database.js';

class Role extends Model {}
  
Role.init(
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
        createdAt: {
            type: new DataTypes.DATE
        },
        updatedAt: {
            type: new DataTypes.DATE
        }
    },
    {
        tableName: 'roles',
        sequelize, // passing the `sequelize` instance is required;
    },
);

export default Role;