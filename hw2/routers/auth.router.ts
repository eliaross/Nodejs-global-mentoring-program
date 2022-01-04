import { Router } from 'express';
import AuthController from './controllers/auth.controller';
const router = Router();

router.post('/auth/login', AuthController.login.bind(AuthController));

export default router;
