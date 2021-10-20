import express from 'express';
import { ValidatedRequest } from 'express-joi-validation';
import { v4 as uuid } from 'uuid';
import { AutosuggestRequestSchema } from '../routers/middlewares/validateAutosuggest';
import {
  deleteUserFromStorage,
  getAutoSuggestUsersFromStorage,
  getUserByIdFromStorage,
  setUserToStorage
} from '../storage/storage';

export const getUserById = (req: express.Request, res: express.Response) => {
  const userId = req.params.id;

  if (!userId) {
    return res.status(400).json({ message: 'No user id was provided' });
  }

  const user = getUserByIdFromStorage(userId);

  if (!user) {
    return res.status(400).json({ message: 'No user was found' });
  }

  res.status(200).json({ message: 'Success', user });
};

export const createUser = (req: express.Request, res: express.Response) => {
  const user = req.body;
  const id = uuid();
  user.id = id;
  user.isDeleted = false;

  setUserToStorage(user);

  res.status(200).json({ message: 'Success', user });
};

export const updateUser = (req: express.Request, res: express.Response) => {
  const userId = req.params.id;
  const newData = req.body;

  const user = getUserByIdFromStorage(userId);

  if (!user) {
    return res.status(400).json({ message: 'No user was found' });
  }

  const updatedUser = { ...user, ...newData };
  setUserToStorage(updatedUser);

  res.status(200).json({ message: 'Success', updatedUser });
};

export const deleteUser = (req: express.Request, res: express.Response) => {
  const userId = req.params.id;
  const isDeleted = deleteUserFromStorage(userId);

  if (!isDeleted) {
    return res.status(400).json({ message: 'No user was found or deleted' });
  }

  res.status(200).json({ message: 'User was succesfully deleted' });
};

export const getAutoSuggestUsers = (
  req: ValidatedRequest<AutosuggestRequestSchema>,
  res: express.Response
) => {
  const { limit = 5, loginSubstring = '' } = req.query;
  const autoSuggestions = getAutoSuggestUsersFromStorage(String(loginSubstring), Number(limit));

  res.status(200).json({ message: 'Success', autoSuggestions });
};
