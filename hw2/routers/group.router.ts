import { Router } from 'express';
const router = Router();
import GroupController from './controllers/group.controller';
import { validateGroup } from './middlewares/validateGroup';
import { validateUsersToGroup } from './middlewares/validateUsersToGroup';

router.get(
  '/groups',
  GroupController.getAllGroups.bind(GroupController)
);
router.get('/groups/:id', GroupController.getGroupById.bind(GroupController));
router.post('/groups', validateGroup, GroupController.createGroup.bind(GroupController));
router.put('/groups/:id', validateGroup, GroupController.updateGroup.bind(GroupController));
router.delete('/groups/:id', GroupController.deleteGroup.bind(GroupController));
router.post('/groups/:id/users', validateUsersToGroup, GroupController.addUser.bind(GroupController));

export default router;
