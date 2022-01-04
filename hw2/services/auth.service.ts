import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';
import userDataAccess, { UserDataAccess } from '../data-access/user.data-access';

export class AuthService {
  userDataAccess: UserDataAccess;

  constructor(dataAccessObj: UserDataAccess) {
    this.userDataAccess = dataAccessObj;
  }

  async login(username: string, password: string) {
    const user = await this.userDataAccess.getByLogin(username);

    if (!user) {
      throw new Error('Password or username is incorrect');
    }

    const isPasswordCorrect = password === user.password;

    if (!isPasswordCorrect) {
      throw new Error('Password or username is incorrect');
    }

    const JWT_TOKEN = jwt.sign({ username: user.login, id: user.id }, JWT_SECRET);

    return JWT_TOKEN;
  }
}

export default new AuthService(userDataAccess);
