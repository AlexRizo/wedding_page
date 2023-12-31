import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/database.js';
import LayoutPicture from './layoutPicture.js';

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
        layoutPictureId: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
        },
    },
    {
        tableName: 'layouts',
        sequelize, // passing the `sequelize` instance is required;
        timestamps: false,
    },
);

LayoutPicture.hasOne(Layout, {foreignKey: 'layoutPictureId'});
Layout.belongsTo(LayoutPicture);

export default Layout;