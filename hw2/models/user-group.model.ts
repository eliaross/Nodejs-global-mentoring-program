import { sequelize } from '../db';
import { DataTypes } from 'sequelize';

export const UserGroup = sequelize.define(
  'user_group',
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, unique: true }
  }
);
