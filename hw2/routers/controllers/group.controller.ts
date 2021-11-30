import { NextFunction, Request, Response } from 'express';
import groupService, { GroupService } from '../../services/group.service';

class GroupController {
  service: GroupService;

  constructor(service: GroupService) {
    this.service = service;
  }

  async getGroupById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;

      if (!id) {
        return res.status(400).json({ message: 'No group id was provided' });
      }

      const group = await this.service.getGroupById(id);

      if (!group) {
        return res.status(400).json({ message: 'No group was found' });
      }

      res.status(200).json({ message: 'Success', group });
    } catch (err) {
      return next({ error: err.message, method: 'getGroupById', params: req.params });
    }
  }

  async createGroup(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const group = await this.service.createGroup(data);

      if (!group) {
        return res.status(400).json({ message: 'Client error' });
      }

      res.status(200).json({ message: 'Success', group });
    } catch (err) {
      return next({ error: err.message, method: 'createGroup', params: req.body });
    }
  }

  async updateGroup(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const newData = req.body;

      const [rowsUpdated, updatedData] = await this.service.updateGroup(id, newData);

      if (!rowsUpdated) {
        return res.status(400).json({ message: 'Client error' });
      }

      res.status(200).json({ message: 'Success', group: updatedData[0] });
    } catch (err) {
      return next({
        error: err.message,
        method: 'updateGroup',
        params: { ...req.params, ...req.body }
      });
    }
  }

  async deleteGroup(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const isDeleted = !!(await this.service.deleteGroup(id));

      if (isDeleted) {
        return res.status(400).json({ message: 'No group was found or deleted' });
      }

      res.status(200).json({ message: 'Group was succesfully deleted' });
    } catch (err) {
      return next({ error: err.message, method: 'deleteGroup', params: req.params });
    }
  }

  async getAllGroups(req: Request, res: Response, next: NextFunction) {
    try {
      const groups = await this.service.getAllGroups();

      if (!groups) {
        return res.status(400).json({ message: 'No groups found' });
      }

      res.status(200).json({ message: 'Success', groups });
    } catch (err) {
      return next({ error: err.message, method: 'getAllGroups' });
    }
  }

  async addUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { usersIds } = req.body;
      const id = req.params.id;

      if (!id) {
        return res.status(400).json({ message: 'No group id was provided' });
      }

      const group = await this.service.addUsersToGroup(id, usersIds);

      res.status(200).json({ message: 'Success', group });
    } catch (err) {
      return next({
        error: err.message,
        method: 'addUser',
        params: { ...req.params, ...req.body }
      });
    }
  }
}

export default new GroupController(groupService);
