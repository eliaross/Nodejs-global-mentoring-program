import express from 'express';
import groupService, { GroupService } from '../../services/group.service';

class GroupController {
  service: GroupService;

  constructor(service: GroupService) {
    this.service = service;
  }

  async getGroupById(req: express.Request, res: express.Response) {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ message: 'No group id was provided' });
    }

    const group = await this.service.getGroupById(id);

    if (!group) {
      return res.status(400).json({ message: 'No group was found' });
    }

    res.status(200).json({ message: 'Success', group });
  }

  async createGroup(req: express.Request, res: express.Response) {
    const data = req.body;
    const group = await this.service.createGroup(data);

    if (!group) {
      return res.status(400).json({ message: 'Client error' });
    }

    res.status(200).json({ message: 'Success', group });
  }

  async updateGroup(req: express.Request, res: express.Response) {
    const id = req.params.id;
    const newData = req.body;

    const [rowsUpdated, updatedData] = await this.service.updateGroup(id, newData);

    if (!rowsUpdated) {
      return res.status(400).json({ message: 'Client error' });
    }

    res.status(200).json({ message: 'Success', group: updatedData[0] });
  }

  async deleteGroup(req: express.Request, res: express.Response) {
    const id = req.params.id;
    const isDeleted = !!(await this.service.deleteGroup(id));

    if (isDeleted) {
      return res.status(400).json({ message: 'No group was found or deleted' });
    }

    res.status(200).json({ message: 'Group was succesfully deleted' });
  }

  async getAllGroups(
    req: express.Request,
    res: express.Response
  ) {
    const groups = await this.service.getAllGroups();

    if (!groups) {
      return res.status(400).json({ message: 'No groups found' });
    }

    res.status(200).json({ message: 'Success', groups });
  }

  async addUser(req: express.Request,
    res: express.Response) {
    const { usersIds } = req.body;
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ message: 'No group id was provided' });
    }

    const group = await this.service.addUsersToGroup(id, usersIds);

    res.status(200).json({ message: 'Success', group });
  }
}

export default new GroupController(groupService);
