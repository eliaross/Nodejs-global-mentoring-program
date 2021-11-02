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
      return await this.model.findByPk(id);
    } catch (err) {
      console.log(err.message);
    }
  }

  async createUser(user: IUser) {
    try {
      return await this.model.create(user);
    } catch (err) {
      console.log(err.message);
    }
  }

  async updateUser(id: string, newData: Partial<IUser>) {
    try {
      return await this.model.update(
        { ...newData },
        {
          where: { id },
          returning: true
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  async deleteUser(id: string) {
    try {
      return await this.model.update(
        { isDeleted: true },
        {
          where: { id },
          returning: true
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  async findAll(loginSubstring = '', limit = 5) {
    try {
      return await this.model.findAll({
        limit,
        where: {
          login: {
            [Op.substring]: loginSubstring
          }
        }
      });
    } catch (err) {
      console.log(err);
    }
  }
}

export default new UserDataAccess(User);
