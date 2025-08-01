import { DataTypes } from 'sequelize';
import { getSequelize } from '../helpers/connectDb.js';

let User;

export const initUserModel = () => {
    const sequelize = getSequelize();
    if (!sequelize) throw new Error('Sequelize instance not initialized');
    
    User = sequelize.define('User', {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING },
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
        password: { type: DataTypes.STRING, allowNull: false },
        image: { type: DataTypes.TEXT },
    });
    return User;
};

export const getUserModel = () => User;
