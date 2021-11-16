import { sequelize } from '../db';
import {
  Association,
  DataTypes,
  HasManyAddAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  Model
} from 'sequelize';
import { Group } from './group.model';

interface UserAttributes {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
}

export class User extends Model<UserAttributes> implements UserAttributes {
  public id!: string;
  public login!: string;
  public password!: string;
  public age!: number;
  public isDeleted!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getGroups!: HasManyGetAssociationsMixin<Group>;
  public addGroups!: HasManyAddAssociationMixin<Group, string>;
  public hasGroup!: HasManyHasAssociationMixin<Group, string>;

  public readonly groups?: Group[];

  public static associations: {
    groups: Association<User, Group>;
  };
}

User.init(
  {
    id: { type: DataTypes.STRING, primaryKey: true, unique: true },
    login: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    age: { type: DataTypes.INTEGER },
    isDeleted: { type: DataTypes.BOOLEAN, defaultValue: false }
  },
  {
    tableName: 'users',
    sequelize
  }
);
