import { Router } from 'express';
const router = Router();
import GroupController from './controllers/group.controller';
import { authMiddleware } from './middlewares/authMiddleware';
import { validateGroup } from './middlewares/validateGroup';
import { validateUsersToGroup } from './middlewares/validateUsersToGroup';

router.get(
  '/groups',
  GroupController.getAllGroups.bind(GroupController)
);
router.get('/groups/:id', authMiddleware, GroupController.getGroupById.bind(GroupController));
router.post('/groups', authMiddleware, validateGroup, GroupController.createGroup.bind(GroupController));
router.put('/groups/:id', authMiddleware, validateGroup, GroupController.updateGroup.bind(GroupController));
router.delete('/groups/:id', authMiddleware, GroupController.deleteGroup.bind(GroupController));
router.post('/groups/:id/users', authMiddleware, validateUsersToGroup, GroupController.addUser.bind(GroupController));

export default router;
