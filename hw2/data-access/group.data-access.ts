import { sequelize } from '../db';
import { IGroup } from '../interfaces/group.interface';
import { Group } from '../models/group.model';
import { User } from '../models/user.model';

export class GroupDataAccess {
  model: typeof Group;

  constructor(userModel: typeof Group) {
    this.model = userModel;
  }

  async getById(id: string) {
    try {
      const group = await this.model.findByPk(id, { include: [{ model: User, as: 'users' }] });

      return group;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async createGroup(group: IGroup) {
    try {
      const newGroup = await this.model.create(
        { ...group },
        {
          include: [
            {
              model: User,
              as: 'users'
            }
          ]
        }
      );

      return newGroup;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async updateGroup(id: string, newData: Partial<IGroup>) {
    try {
      const updatedGroup = await this.model.update(
        { ...newData },
        {
          where: { id },
          returning: true
        }
      );

      return updatedGroup;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async deleteGroup(id: string) {
    try {
      const deletedRows = await this.model.destroy({ where: { id } });

      return deletedRows;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async getAll() {
    try {
      const users = await this.model.findAll();

      return users;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async addUsersToGroup(groupId: string, usersIds: string[]) {
    try {
      await sequelize.transaction(async (transaction) => {
        const group = await this.getById(groupId);

        for (const id of usersIds) {
          await group.addUsers(id, { transaction });
        }
      });

      const groupWithUsers = await this.getById(groupId);

      return groupWithUsers;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

export default new GroupDataAccess(Group);
