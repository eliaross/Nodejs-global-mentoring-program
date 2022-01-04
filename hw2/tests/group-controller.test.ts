import { NextFunction, Request } from 'express';
import { GroupDataAccess } from '../data-access/group.data-access';
import GroupMockRepository from '../data-access/mock-group-repository';
import UserMockRepository from '../data-access/mock-user-repository';
import { UserDataAccess } from '../data-access/user.data-access';
import { Permission } from '../interfaces/group.interface';
import { Group } from '../models/group.model';
import { GroupController } from '../routers/controllers/group.controller';
import { authMiddleware } from '../routers/middlewares/authMiddleware';
import { GroupService } from '../services/group.service';

jest.mock('../routers/middlewares/authMiddleware.ts');

const mockGroups = [{
  id: '111',
  name: 'Test1234',
  permissions: [Permission.READ, Permission.WRITE]
}, {
  id: '222',
  name: 'Group1234',
  permissions: [Permission.READ]
}];

describe('Testing Group Controller', () => {
  let service: GroupService;
  let controller: GroupController;
  let mRes;
  let mNext;

  beforeEach(() => {
    service = new GroupService(
      new GroupMockRepository() as unknown as GroupDataAccess,
      new UserMockRepository() as unknown as UserDataAccess
    );
    controller = new GroupController(service);
    mNext = jest.fn();
    mRes = getMockedResponse();
    (authMiddleware as jest.Mock).mockImplementation(
      (req: Request, res: Response, next: NextFunction) =>
        new Promise(() => next())
    );
  });

  describe('GET /groups', () => {
    it('responds with 200 when token is correct', async () => {
      jest.spyOn(service, 'getAllGroups').mockResolvedValue(mockGroups as Group[]);
      const mReq = { } as unknown as Request;

      await controller.getAllGroups(mReq, mRes, mNext);
      expect(service.getAllGroups).toBeCalledTimes(1);
      expect(mRes.status).toBeCalledWith(200);
      expect(mRes.json).toHaveBeenCalledTimes(1);
      expect(mRes.json).toBeCalledWith({ message: 'Success', groups: mockGroups });
    });
  });

  describe('POST /groups', () => {
    it('responds with 200 if data is valid', async () => {
      jest.spyOn(service, 'createGroup').mockResolvedValue(mockGroups[0] as Group);
      const mReq = { body: { ...mockGroups[0] } } as unknown as Request;

      await controller.createGroup(mReq, mRes, mNext);
      expect(service.createGroup).toBeCalledWith(mockGroups[0]);
      expect(mRes.status).toBeCalledWith(200);
      expect(mRes.json).toHaveBeenCalledTimes(1);
      expect(mRes.json).toBeCalledWith({ message: 'Success', group: mockGroups[0] });
    });
  });

  describe('GET /groups/:id', () => {
    it('responds with 200 when param is correct', async () => {
      jest.spyOn(service, 'getGroupById').mockResolvedValue(mockGroups[0] as Group);
      const mReq = { params: { id: '1' } } as unknown as Request;

      await controller.getGroupById(mReq, mRes, mNext);
      expect(service.getGroupById).toBeCalledWith('1');
      expect(mRes.status).toBeCalledWith(200);
      expect(mRes.json).toHaveBeenCalledTimes(1);
      expect(mRes.json).toBeCalledWith({ message: 'Success', group: mockGroups[0] });
    });

    it('responds with 400 when user with passed param id does not exist', async () => {
      jest.spyOn(service, 'getGroupById').mockResolvedValue(null);
      const mReq = { params: { id: '5' } } as unknown as Request;

      await controller.getGroupById(mReq, mRes, mNext);
      expect(service.getGroupById).toBeCalledWith('5');
      expect(mRes.status).toBeCalledWith(400);
      expect(mRes.json).toHaveBeenCalledTimes(1);
      expect(mRes.json).toBeCalledWith({ message: 'No group was found' });
    });
  });

  describe('PUT /groups/:id', () => {
    it('responds with 400 when user with passed param id does not exist', async () => {
      jest.spyOn(service, 'updateGroup').mockResolvedValue([0, []]);
      const mReq = { params: { id: '5' }, body: { ...mockGroups[1] } } as unknown as Request;

      await controller.updateGroup(mReq, mRes, mNext);
      expect(service.updateGroup).toBeCalledWith('5', mockGroups[1]);
      expect(mRes.status).toBeCalledWith(400);
      expect(mRes.json).toHaveBeenCalledTimes(1);
      expect(mRes.json).toBeCalledWith({ message: 'Client error' });
    });

    it('responds with 200 when passed data is valid', async () => {
      jest.spyOn(service, 'updateGroup').mockResolvedValue([1, [mockGroups[1]] as Group[]]);
      const mReq = { params: { id: '1' }, body: { ...mockGroups[1] } } as unknown as Request;

      await controller.updateGroup(mReq, mRes, mNext);
      expect(service.updateGroup).toBeCalledWith('1', mockGroups[1]);
      expect(mRes.status).toBeCalledWith(200);
      expect(mRes.json).toHaveBeenCalledTimes(1);
      expect(mRes.json).toBeCalledWith({ message: 'Success', group: mockGroups[1] });
    });
  });

  describe('POST /groups/:id/users', () => {
    it('responds with 400 if group id was not provided', async () => {
      jest.spyOn(service, 'addUsersToGroup');
      const mReq = { params: {}, body: { usersIds: ['111', '222'] } } as unknown as Request;

      await controller.addUser(mReq, mRes, mNext);
      expect(service.addUsersToGroup).toBeCalledTimes(0);
      expect(mRes.status).toBeCalledWith(400);
      expect(mRes.json).toHaveBeenCalledTimes(1);
      expect(mRes.json).toBeCalledWith({ message: 'No group id was provided' });
    });

    it('responds with 200 when all data is valid', async () => {
      jest.spyOn(service, 'addUsersToGroup').mockResolvedValue(mockGroups[0] as Group);
      const mReq = { params: { id: '1' }, body: { usersIds: ['111', '222'] } } as unknown as Request;

      await controller.addUser(mReq, mRes, mNext);
      expect(service.addUsersToGroup).toBeCalledWith('1', ['111', '222']);
      expect(mRes.status).toBeCalledWith(200);
      expect(mRes.json).toHaveBeenCalledTimes(1);
      expect(mRes.json).toBeCalledWith({ message: 'Success', group: mockGroups[0] });
    });
  });

  describe('DELETE /groups/:id', () => {
    it('responds with 400 when group with passed param id does not exist', async () => {
      jest.spyOn(service, 'deleteGroup').mockResolvedValue(false);
      const mReq = { params: { id: '5' } } as unknown as Request;

      await controller.deleteGroup(mReq, mRes, mNext);
      expect(service.deleteGroup).toBeCalledWith('5');
      expect(mRes.status).toBeCalledWith(400);
      expect(mRes.json).toHaveBeenCalledTimes(1);
      expect(mRes.json).toBeCalledWith({ message: 'No group was found or deleted' });
    });

    it('responds with 200', async () => {
      jest.spyOn(service, 'deleteGroup').mockResolvedValue(true);
      const mReq = { params: { id: '1' } } as unknown as Request;

      await controller.deleteGroup(mReq, mRes, mNext);
      expect(service.deleteGroup).toBeCalledWith('1');
      expect(mRes.status).toBeCalledWith(200);
      expect(mRes.json).toHaveBeenCalledTimes(1);
      expect(mRes.json).toBeCalledWith({ message: 'Group was succesfully deleted' });
    });
  });
});

function getMockedResponse(): Response {
  return {
    json: jest.fn(),
    status: jest.fn()
  } as unknown as Response;
}
