import { IUser, UserRepository } from '../interfaces/user.interface';
import { User } from '../models/user.model';

export default class UserMockRepository implements UserRepository {
  model: any;

  createUser(user: IUser): Promise<User> {
    return Promise.resolve({} as User);
  }
  getByLogin(login: string): Promise<User|null> {
    return Promise.resolve({} as User);
  }
  findAll(loginSubstring?: string, limit?: number): Promise<User[]> {
    return Promise.resolve([]);
  }
  getById(id: string): Promise<User|null> {
    return Promise.resolve({} as User);
  }
  updateUser(user: IUser): Promise<User> {
    return Promise.resolve({} as User);
  }
  deleteUser(id: string): Promise<User> {
    return Promise.resolve({} as User);
  }
}
