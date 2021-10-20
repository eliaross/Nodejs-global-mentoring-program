import { Router } from 'express';
const router = Router();
import { createValidator } from 'express-joi-validation';
import {
  createUser,
  deleteUser,
  getAutoSuggestUsers,
  getUserById,
  updateUser
} from '../controllers/userController';
import { autosuggestQuerySchema } from './middlewares/validateAutosuggest';
import { validateUser } from './middlewares/validateUser';

const validator = createValidator();

router.get('/users', validator.query(autosuggestQuerySchema), getAutoSuggestUsers);
router.get('/users/:id', getUserById);
router.post('/users', validateUser, createUser);
router.put('/users/:id', validateUser, updateUser);
router.delete('/users/:id', deleteUser);

export default router;
