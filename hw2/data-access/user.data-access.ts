import { User } from '../models/user.model';
import { Op } from 'sequelize';
import { IDataAccess, IUser, ModelType } from '../interfaces/user.interface';

class UserDataAccess implements IDataAccess {
  model: ModelType;

  constructor(userModel: ModelType) {
    this.model = userModel;
  }

  async getById(id: string) {
    try {
      const user = await this.model.findByPk(id);

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
