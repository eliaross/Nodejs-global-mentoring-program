import { GroupRepository, IGroup } from '../interfaces/group.interface';
import { Group } from '../models/group.model';

export default class GroupMockRepository implements GroupRepository {
  model: any;

  createGroup(group: IGroup): Promise<Group> {
    return Promise.resolve({} as Group);
  }
  addUsersToGroup(groupId: string, usersIds: string[]): Promise<Group|null> {
    return Promise.resolve({} as Group);
  }
  getAll(): Promise<Group[]> {
    return Promise.resolve([]);
  }
  getById(id: string): Promise<Group|null> {
    return Promise.resolve({} as Group);
  }
  updateGroup(user: IGroup): Promise<Group> {
    return Promise.resolve({} as Group);
  }
  deleteGroup(id: string): Promise<Group> {
    return Promise.resolve({} as Group);
  }
}
