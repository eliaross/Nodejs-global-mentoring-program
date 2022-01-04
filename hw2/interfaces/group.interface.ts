import { Group } from "../models/group.model";

export interface IGroup {
  id: string;
  name: string;
  permissions: Permission[];
}

export enum Permission {
  READ = 'READ',
  WRITE = 'WRITE',
  DELETE = 'DELETE',
  SHARE = 'SHARE',
  UPLOAD_FILES = 'UPLOAD_FILES',
}

export interface GroupRepository {
  model: any;
  createGroup(user: IGroup): Promise<Group>;
  addUsersToGroup(groupId: string, usersIds: string[]): Promise<Group|null>;
  getAll(): Promise<Group[]>;
  getById(id: string): Promise<Group|null>;
  updateGroup(group: Group): Promise<Group>;
  deleteGroup(id: string): Promise<Group>;
}
