import { User } from '../models/user.model';
import { authMiddleware } from '../routers/middlewares/authMiddleware';
import { NextFunction, Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { UserController } from '../routers/controllers/user.controller';
import UserMockRepository from '../data-access/mock-user-repository';
import { UserDataAccess } from '../data-access/user.data-access';

jest.mock('../routers/middlewares/authMiddleware.ts');

const mockUsers = [{
  id:       '1',
  login:    'Ivan',
  password: 'qwerty',
  age:       18,
  isDeleted: false
}, {
  id:       '2',
  login:    'Peter',
  password: '123456',
  age:       50,
  isDeleted: false
}];

describe('Testing User Controller', () => {
  let service: UserService;
  let controller: UserController;
  let mRes;
  let mNext;

  beforeEach(() => {
    service = new UserService(new UserMockRepository() as unknown as UserDataAccess);
    controller = new UserController(service);
    mRes = getMockedResponse();
    mNext = jest.fn();
    (authMiddleware as jest.Mock).mockImplementation(
      (req: Request, res: Response, next: NextFunction) =>
        new Promise(() => next())
    );
  });

  describe('GET /users', () => {
    it('responds with 200 when limit is passed and other params are used as default', async () => {
      jest.spyOn(service, 'getAutoSuggestUsers').mockResolvedValue(mockUsers as User[]);
      const mReq = { query: { limit: 3 } } as unknown as Request;

      await controller.getAutoSuggestUsers(mReq, mRes, mNext);
      expect(service.getAutoSuggestUsers).toBeCalledWith('', 3);
      expect(mRes.status).toBeCalledWith(200);
      expect(mRes.json).toHaveBeenCalledTimes(1);
      expect(mRes.json).toBeCalledWith({ message: 'Success', autoSuggestions: mockUsers });
    });
  });

  describe('POST /users', () => {
    it('responds with 200 when request data is valid', async () => {
      jest.spyOn(service, 'setUser').mockResolvedValue(mockUsers[0] as User);
      const mReq = { body: { ...mockUsers[0] } } as unknown as Request;

      await controller.createUser(mReq, mRes, mNext);
      expect(service.setUser).toBeCalledWith(mockUsers[0]);
      expect(mRes.status).toBeCalledWith(200);
      expect(mRes.json).toHaveBeenCalledTimes(1);
      expect(mRes.json).toBeCalledWith({ message: 'Success', user: mockUsers[0] });
    });
  });

  describe('GET /users/id', () => {
    it('responds with 200 when param is correct', async () => {
      jest.spyOn(service, 'getUserById').mockResolvedValue(mockUsers[0] as User);
      const mReq = { params: { id: '1' } } as unknown as Request;

      await controller.getUserById(mReq, mRes, mNext);
      expect(service.getUserById).toBeCalledWith('1');
      expect(mRes.status).toBeCalledWith(200);
      expect(mRes.json).toHaveBeenCalledTimes(1);
      expect(mRes.json).toBeCalledWith({ message: 'Success', user: mockUsers[0] });
    });

    it('responds with 400 when user with passed param id does not exist', async () => {
      jest.spyOn(service, 'getUserById').mockResolvedValue(null);
      const mReq = { params: { id: '5' } } as unknown as Request;

      await controller.getUserById(mReq, mRes, mNext);
      expect(service.getUserById).toBeCalledWith('5');
      expect(mRes.status).toBeCalledWith(400);
      expect(mRes.json).toHaveBeenCalledTimes(1);
      expect(mRes.json).toBeCalledWith({ message: 'No user was found' });
    });
  });

  describe('UPDATE /users/id', () => {
    it('responds with 400 when user with passed param id does not exist', async () => {
      jest.spyOn(service, 'updateUser').mockResolvedValue([0, []]);
      const mReq = { params: { id: '5' }, body: { ...mockUsers[1] } } as unknown as Request;

      await controller.updateUser(mReq, mRes, mNext);
      expect(service.updateUser).toBeCalledWith('5', mockUsers[1]);
      expect(mRes.status).toBeCalledWith(400);
      expect(mRes.json).toHaveBeenCalledTimes(1);
      expect(mRes.json).toBeCalledWith({ message: 'Client error' });
    });

    it('responds with 200 when passed data is valid', async () => {
      jest.spyOn(service, 'updateUser').mockResolvedValue([1, [mockUsers[1]] as User[]]);
      const mReq = { params: { id: '1' }, body: { ...mockUsers[1] } } as unknown as Request;

      await controller.updateUser(mReq, mRes, mNext);
      expect(service.updateUser).toBeCalledWith('1', mockUsers[1]);
      expect(mRes.status).toBeCalledWith(200);
      expect(mRes.json).toHaveBeenCalledTimes(1);
      expect(mRes.json).toBeCalledWith({ message: 'Success', user: mockUsers[1] });
    });
  });

  describe('DELETE /users/id', () => {
    it('responds with 400 when user with passed param id does not exist', async () => {
      jest.spyOn(service, 'deleteUser').mockResolvedValue(0);
      const mReq = { params: { id: '5' } } as unknown as Request;

      await controller.deleteUser(mReq, mRes, mNext);
      expect(service.deleteUser).toBeCalledWith('5');
      expect(mRes.status).toBeCalledWith(400);
      expect(mRes.json).toHaveBeenCalledTimes(1);
      expect(mRes.json).toBeCalledWith({ message: 'No user was found or deleted' });
    });

    it('responds with 200', async () => {
      jest.spyOn(service, 'deleteUser').mockResolvedValue(1);
      const mReq = { params: { id: '1' } } as unknown as Request;

      await controller.deleteUser(mReq, mRes, mNext);
      expect(service.deleteUser).toBeCalledWith('1');
      expect(mRes.status).toBeCalledWith(200);
      expect(mRes.json).toHaveBeenCalledTimes(1);
      expect(mRes.json).toBeCalledWith({ message: 'User was succesfully deleted' });
    });
  });
});

function getMockedResponse(): Response {
  return {
    json: jest.fn(),
    status: jest.fn()
  } as unknown as Response;
}
