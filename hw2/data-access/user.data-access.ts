import { User } from '../models/user.model';
import { Op } from 'sequelize';
import { IUser } from '../interfaces/user.interface';
import { Group } from '../models/group.model';

export class UserDataAccess {
  model: typeof User;

  constructor(userModel: typeof User) {
    this.model = userModel;
  }

  async getByLogin(login: string) {
    try {
      const user = await this.model.findOne({ where: { login } });

      return user;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async getById(id: string) {
    try {
      const user = await this.model.findByPk(id, { include: [{ model: Group, as: 'groups' }] });

      return user;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async createUser(user: IUser) {
    try {
      const newUser = await this.model.create(user);

      return newUser;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async updateUser(id: string, newData: Partial<IUser>) {
    try {
      const updatedUser = await this.model.update(
        { ...newData },
        {
          where: { id },
          returning: true
        }
      );

      return updatedUser;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async deleteUser(id: string) {
    try {
      const deletedUser = await this.model.update(
        { isDeleted: true },
        {
          where: { id },
          returning: true
        }
      );

      return deletedUser;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async findAll(loginSubstring = '', limit = 5) {
    try {
      const users = await this.model.findAll({
        limit,
        where: {
          login: {
            [Op.substring]: loginSubstring
          }
        }
      });

      return users;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

export default new UserDataAccess(User);
