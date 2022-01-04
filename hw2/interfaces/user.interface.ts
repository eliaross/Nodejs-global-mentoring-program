import { User } from "../models/user.model";

export interface IUser {
  login: string;
  password: string;
  age: number;
  id: string;
  isDeleted: boolean;
}

export interface UserRepository {
  model: any;
  createUser(user: IUser): Promise<User>;
  getByLogin(login: string): Promise<User|null>;
  findAll(loginSubstring?: string, limit?: number): Promise<User[]>;
  getById(id: string): Promise<User|null>;
  updateUser(user: User): Promise<User>;
  deleteUser(id: string): Promise<User>;
}
