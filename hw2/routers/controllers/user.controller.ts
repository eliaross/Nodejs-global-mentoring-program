import { Request, Response, NextFunction } from 'express';
import { ValidatedRequest } from 'express-joi-validation';
import { AutosuggestRequestSchema } from '../middlewares/validateAutosuggest';
import userService, { UserService } from '../../services/user.service';

class UserController {
  service: UserService;

  constructor(service: UserService) {
    this.service = service;
  }

  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id;

      if (!userId) {
        return res.status(400).json({ message: 'No user id was provided' });
      }

      const user = await this.service.getUserById(userId);

      if (!user) {
        return res.status(400).json({ message: 'No user was found' });
      }

      res.status(200).json({ message: 'Success', user });
    } catch (err) {
      return next({ error: err.message, method: 'getUserById', params: req.params });
    }
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userData = req.body;
      const user = await this.service.setUser(userData);

      if (!user) {
        return res.status(400).json({ message: 'Client error' });
      }

      res.status(200).json({ message: 'Success', user });
    } catch (err) {
      return next({ error: err.message, method: 'createUser', params: req.body });
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id;
      const newData = req.body;

      const [rowsUpdated, updatedData] = await this.service.updateUser(userId, newData);

      if (!rowsUpdated) {
        return res.status(400).json({ message: 'Client error' });
      }

      res.status(200).json({ message: 'Success', user: updatedData[0] });
    } catch (err) {
      return next({
        error: err.message,
        method: 'updateUser',
        params: { ...req.params, ...req.body }
      });
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id;
      const isDeleted = await this.service.deleteUser(userId);

      if (!isDeleted) {
        return res.status(400).json({ message: 'No user was found or deleted' });
      }

      res.status(200).json({ message: 'User was succesfully deleted' });
    } catch (err) {
      return next({ error: err.message, method: 'deleteUser', params: req.params });
    }
  }

  async getAutoSuggestUsers(
    req: ValidatedRequest<AutosuggestRequestSchema>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { limit = 5, loginSubstring = '' } = req.query;
      const autoSuggestions = await this.service.getAutoSuggestUsers(
        String(loginSubstring),
        Number(limit)
      );

      res.status(200).json({ message: 'Success', autoSuggestions });
    } catch (err) {
      return next({ error: err.message, method: 'getAutoSuggestUsers', params: req.query });
    }
  }
}

export default new UserController(userService);
