import { Model, ModelCtor } from "sequelize/types";

export interface IUser {
  login: string;
  password: string;
  age: number;
  id: string;
  isDeleted: boolean;
}

export type ModelType = ModelCtor<Model<any, any>>;

export interface IDataAccess {
  model: ModelType;
  getById(id: string): Promise<Model<any, any>>;
  createUser(user: IUser): Promise<Model<any, any>>;
  updateUser(id: string, newData: Partial<IUser>): Promise<[number, Model<any, any>[]]>;
  deleteUser(id: string): Promise<[number, Model<any, any>[]]>;
  findAll(loginSubstring: string, limit: number): Promise<Model<any, any>[]>;
}

export interface IUserService {
  dataAccess: IDataAccess;
  getUserById(userId: string): Promise<Model<any, any>>;
  setUser(user: IUser): Promise<Model<any, any>>; 
  updateUser(userId: string, newData: Partial<IUser>): Promise<[number, Model<any, any>[]]>; 
  deleteUser(userId: string): Promise<number>;
  getAutoSuggestUsers(loginSubstring: string, limit: number): Promise<IUser[]>;
}
