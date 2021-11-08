import express from 'express';
import { ValidatedRequest } from 'express-joi-validation';
import { AutosuggestRequestSchema } from '../middlewares/validateAutosuggest';
import userService from '../../services/user.service';
import { IUserService } from '../../interfaces/user.interface';

class UserController {
  service: IUserService;

  constructor(service: IUserService) {
    this.service = service;
  }

  async getUserById(req: express.Request, res: express.Response) {
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({ message: 'No user id was provided' });
    }

    const user = await this.service.getUserById(userId);

    if (!user) {
      return res.status(400).json({ message: 'No user was found' });
    }

    res.status(200).json({ message: 'Success', user });
  }

  async createUser(req: express.Request, res: express.Response) {
    const userData = req.body;
    const user = await this.service.setUser(userData);

    if (!user) {
      return res.status(400).json({ message: 'Client error' });
    }

    res.status(200).json({ message: 'Success', user });
  }

  async updateUser(req: express.Request, res: express.Response) {
    const userId = req.params.id;
    const newData = req.body;

    const [rowsUpdated, updatedData] = await this.service.updateUser(userId, newData);

    if (!rowsUpdated) {
      return res.status(400).json({ message: 'Client error' });
    }

    res.status(200).json({ message: 'Success', user: updatedData[0] });
  }

  async deleteUser(req: express.Request, res: express.Response) {
    const userId = req.params.id;
    const isDeleted = await this.service.deleteUser(userId);

    if (!isDeleted) {
      return res.status(400).json({ message: 'No user was found or deleted' });
    }

    res.status(200).json({ message: 'User was succesfully deleted' });
  }

  async getAutoSuggestUsers(
    req: ValidatedRequest<AutosuggestRequestSchema>,
    res: express.Response
  ) {
    const { limit = 5, loginSubstring = '' } = req.query;
    const autoSuggestions = await this.service.getAutoSuggestUsers(
      String(loginSubstring),
      Number(limit)
    );

    res.status(200).json({ message: 'Success', autoSuggestions });
  }
}

export default new UserController(userService);
