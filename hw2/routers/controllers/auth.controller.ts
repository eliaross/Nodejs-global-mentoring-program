import { Request, Response, NextFunction } from 'express';
import authService, { AuthService } from '../../services/auth.service';

class AuthController {
  service: AuthService;

  constructor(service: AuthService) {
    this.service = service;
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;

      const JWT_TOKEN = await this.service.login(username, password);

      res.header('authorization', JWT_TOKEN);
      res.status(200).json({ jwtToken: JWT_TOKEN });
    } catch (err) {
      return next({ error: err.message, method: 'login', params: req.body });
    }
  }
}

export default new AuthController(authService);
