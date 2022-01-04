import { Router } from 'express';
const router = Router();
import { createValidator } from 'express-joi-validation';
import UserController from './controllers/user.controller';
import { authMiddleware } from './middlewares/authMiddleware';
import { autosuggestQuerySchema } from './middlewares/validateAutosuggest';
import { validateUser } from './middlewares/validateUser';

const validator = createValidator();

router.get(
  '/users',
  authMiddleware,
  validator.query(autosuggestQuerySchema),
  UserController.getAutoSuggestUsers.bind(UserController)
);
router.get('/users/:id', authMiddleware, UserController.getUserById.bind(UserController));
router.post('/users', authMiddleware, validateUser, UserController.createUser.bind(UserController));
router.put('/users/:id', authMiddleware, validateUser, UserController.updateUser.bind(UserController));
router.delete('/users/:id', authMiddleware, UserController.deleteUser.bind(UserController));

export default router;
