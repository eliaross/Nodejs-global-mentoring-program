import { v4 as uuid } from 'uuid';
import groupDataAccess, { GroupDataAccess } from '../data-access/group.data-access';
import userDataAccess, { UserDataAccess } from '../data-access/user.data-access';
import { IGroup } from '../interfaces/group.interface';

export class GroupService {
  groupDataAccess: GroupDataAccess;
  userDataAccess: UserDataAccess;

  constructor(groupDataObj: GroupDataAccess, userDataObj: UserDataAccess) {
    this.groupDataAccess = groupDataObj;
    this.userDataAccess = userDataObj;
  }

  async getGroupById(id: string) {
    const group = await this.groupDataAccess.getById(id);
    return group;
  }

  async addUsersToGroup(groupId: string, usersIds: string[]) {
    const group = await this.groupDataAccess.addUsersToGroup(groupId, usersIds);

    return group;
  }

  async createGroup(group: IGroup) {
    const id = uuid();
    group.id = id;

    return this.groupDataAccess.createGroup(group);
  }

  async updateGroup(id: string, newData: Partial<IGroup>) {
    return this.groupDataAccess.updateGroup(id, newData);
  }

  async deleteGroup(id: string) {
    const isDeleted = await this.groupDataAccess.deleteGroup(id);

    return isDeleted[0];
  }

  async getAllGroups() {
    const data = await this.groupDataAccess.getAll();

    return data;
  }
}

export default new GroupService(groupDataAccess, userDataAccess);
