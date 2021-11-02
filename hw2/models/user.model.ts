import { sequelize } from '../db';
import { DataTypes } from 'sequelize';

export const User = sequelize.define('user', {
  id: { type: DataTypes.STRING, primaryKey: true, unique: true },
  login: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  age: { type: DataTypes.INTEGER },
  isDeleted: { type: DataTypes.BOOLEAN, defaultValue: false }
});
