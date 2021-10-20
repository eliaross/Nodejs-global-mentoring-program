import { getRandomElements } from './helpers/storageHelpers';

export type User = {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
};

export const storage = new Map();

export const getUserByIdFromStorage = (id: string) => {
  return storage.get(id);
};

export const setUserToStorage = (user: User) => {
  storage.set(user.id, user);
};

export const deleteUserFromStorage = (id: string) => {
  const user = getUserByIdFromStorage(id);

  if (user) {
    user.isDeleted = true;
    setUserToStorage(user);
    return true;
  }

  return false;
};

export const getAutoSuggestUsersFromStorage = (loginSubstring = '', limit = 5) => {
  const storageData = [...storage.values()].filter((user: User) =>
    user.login.includes(loginSubstring)
  );
  const storageSize = storageData.length;
  let validatedLimit = limit;

  if (storageSize === 0) {
    return [];
  }
  if (validatedLimit > storageSize) {
    validatedLimit = storageSize;
  }

  const suggestions =
    validatedLimit === storageSize ? storageData : getRandomElements(storageData, validatedLimit);

  return suggestions.sort((userA: User, userB: User) => userA.login.localeCompare(userB.login));
};
