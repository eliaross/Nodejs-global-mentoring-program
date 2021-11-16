import { Group } from './group.model';
import { UserGroup } from './user-group.model';
import { User } from './user.model';

User.belongsToMany(Group, { through: UserGroup, as: 'groups', foreignKey: 'userId' });
Group.belongsToMany(User, { through: UserGroup, as: 'users', foreignKey: 'groupId' });
