import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/database.js';
import Step from './step.js';
import User from './user.js';

class Order extends Model {}
  
Order.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        serial_number: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        name: {
            type: new DataTypes.STRING(50),
            allowNull: true,
        },
        description: {
            type: new DataTypes.STRING(200),
            allowNull: false,
            defaultValue: 'Tu pedido aún se encuentra en estado pendiente. Completa el formulario para poder recibir tu pedido.'
        },
        status: {
            type: new DataTypes.BOOLEAN,
            defaultValue: 0,
            allowNull: false
        },
        boyfriend_name: {
            type: new DataTypes.STRING(50),
            allowNull: true,
        },
        girlfriend_name: {
            type: new DataTypes.INTEGER,
            allowNull: true,
        },
        boyfriend_email: {
            type: new DataTypes.STRING(50),
            allowNull: true,
        },
        girlfriend_email: {
            type: new DataTypes.STRING(50),
            allowNull: true,
        },
        wedding_date: {
            type: new DataTypes.STRING(10),
            allowNull: true,
        },
        godfather: {
            type: new DataTypes.STRING(50),
            allowNull: true,
        },
        godmother: {
            type: new DataTypes.STRING(50),
            allowNull: true,
        },
        boyfriend_father: {
            type: new DataTypes.STRING(50),
            allowNull: true,
        },
        boyfriend_mother: {
            type: new DataTypes.STRING(50),
            allowNull: true,
        },
        girlfriend_father: {
            type: new DataTypes.STRING(50),
            allowNull: true,
        },
        girlfriend_mother: {
            type: new DataTypes.STRING(50),
            allowNull: true,
        },
        church: {
            type: new DataTypes.STRING(50),
            allowNull: true,
        },
        church_time: {
            type: new DataTypes.STRING(10),
            allowNull: true,
        },
        church_location: {
            type: new DataTypes.STRING(100),
            allowNull: true,
        },
        church_references: {
            type: new DataTypes.STRING(200),
            allowNull: true,
        },
        event: {
            type: new DataTypes.STRING(50),
            allowNull: true,
        },
        event_time: {
            type: new DataTypes.STRING(10),
            allowNull: true,
        },
        event_location: {
            type: new DataTypes.STRING(100),
            allowNull: true,
        },
        event_references: {
            type: new DataTypes.STRING(200),
            allowNull: true,
        },
        men_clothes: {
            type: new DataTypes.STRING(100),
            allowNull: true,
        },
        women_clothes: {
            type: new DataTypes.STRING(100),
            allowNull: true,
        },
        considerations: {
            type: new DataTypes.STRING(200),
            allowNull: true,
        },
        gif_link: {
            type: new DataTypes.STRING(100),
            allowNull: true,
        },
        bank: {
            type: new DataTypes.STRING(22),
            allowNull: true,
        },
        history: {
            type: new DataTypes.STRING(2000),
            allowNull: true,
        },
        stepId: {
            type: new DataTypes.INTEGER,
            defaultValue: 1,
            allowNull: true,
        },
        userId: {
            type: new DataTypes.INTEGER,
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
        tableName: 'orders',
        sequelize, // passing the `sequelize` instance is required;
    },
);

Step.hasMany(Order, { foreignKey: 'stepId', targetKey:'id' });
Order.belongsTo(Step);

User.hasMany(Order, { foreignKey: 'userId', targetKey:'id' });
Order.belongsTo(User);

export default Order;