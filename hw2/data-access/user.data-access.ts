import { User } from '../models/user.model';
import { Op } from 'sequelize';
import { IUser } from '../interfaces/user.interface';
import { Group } from '../models/group.model';

export class UserDataAccess {
  model: typeof User;

  constructor(userModel: typeof User) {
    this.model = userModel;
  }

  async getById(id: string) {
    try {
      const user = await this.model.findByPk(id, { include: [{ model: Group, as: 'groups' }] });

      return user;
    } catch (err) {
      console.log(err.message);
    }
  }

  async createUser(user: IUser) {
    try {
      const newUser = await this.model.create(user);

      return newUser;
    } catch (err) {
      console.log(err.message);
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
      console.log(err);
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
      console.log(err);
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
      console.log(err);
    }
  }
}

export default new UserDataAccess(User);
