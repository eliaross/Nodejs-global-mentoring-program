import { v4 as uuid } from 'uuid';
import userDataAccess from '../data-access/userDataAccess';
import { IDataAccess, IUser } from '../interfaces/user.interface';

class UserService {
  dataAccess: IDataAccess;

  constructor(dataAccessObj: IDataAccess) {
    this.dataAccess = dataAccessObj;
  }

  async getUserById(userId: string) {
    return this.dataAccess.getById(userId);
  }

  async setUser(user: IUser) {
    const id = uuid();
    user.id = id;

    return this.dataAccess.createUser(user);
  }

  async updateUser(userId: string, newData: Partial<IUser>) {
    return this.dataAccess.updateUser(userId, newData);
  }

  async deleteUser(userId: string) {
    const isDeleted = await this.dataAccess.deleteUser(userId);

    return isDeleted[0];
  }

  async getAutoSuggestUsers(loginSubstring = '', limit = 5) {
    const data: any[] = await this.dataAccess.findAll(loginSubstring, limit);

    return (data as IUser[]).sort((userA, userB) =>
      userA.login.localeCompare(userB.login)
    );
  }
}

export default new UserService(userDataAccess);