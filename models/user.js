import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/database.js';
import Role from './role.js';

class User extends Model {}
  
User.init(
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
        email: {
            type: new DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
        password: {
            type: new DataTypes.STRING(100),
            allowNull: false,
        },
        status: {
            type: new DataTypes.BOOLEAN,
            defaultValue: 1,
            allowNull: false,
        },
        roleId: {
            type: new DataTypes.INTEGER,
            defaultValue: 1,
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
        tableName: 'users',
        sequelize, // passing the `sequelize` instance is required;
    },
);

Role.hasMany(User, { foreignKey: 'roleId', targetKey:'id' });
User.belongsTo(Role);

export default User;