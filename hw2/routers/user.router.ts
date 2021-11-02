import { Router } from 'express';
const router = Router();
import { createValidator } from 'express-joi-validation';
import UserController from './controllers/user.controller';
import { autosuggestQuerySchema } from './middlewares/validateAutosuggest';
import { validateUser } from './middlewares/validateUser';

const validator = createValidator();

router.get(
  '/users',
  validator.query(autosuggestQuerySchema),
  UserController.getAutoSuggestUsers.bind(UserController)
);
router.get('/users/:id', UserController.getUserById.bind(UserController));
router.post('/users', validateUser, UserController.createUser.bind(UserController));
router.put('/users/:id', validateUser, UserController.updateUser.bind(UserController));
router.delete('/users/:id', UserController.deleteUser.bind(UserController));

export default router;
