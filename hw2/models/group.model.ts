import { sequelize } from '../db';
import {
  Association,
  DataTypes,
  HasManyAddAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  Model
} from 'sequelize';
import { Permission } from '../interfaces/group.interface';
import { User } from './user.model';

interface GroupAttributes {
  id: string;
  name: string;
  permissions: Permission[];
}

export class Group extends Model<GroupAttributes> implements GroupAttributes {
  public id!: string;
  public name!: string;
  public permissions!: Permission[];

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getUsers!: HasManyGetAssociationsMixin<User>;
  public addUsers!: HasManyAddAssociationMixin<User, string>;
  public hasUser!: HasManyHasAssociationMixin<User, string>;

  public readonly users?: User[];

  public static associations: {
    users: Association<User, Group>;
  };
}

Group.init(
  {
    id: { type: DataTypes.STRING, primaryKey: true, unique: true },
    name: { type: DataTypes.STRING },
    permissions: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      values: Object.values(Permission),
      defaultValue: [Permission.READ]
    }
  },
  {
    tableName: 'groups',
    sequelize
  }
);
