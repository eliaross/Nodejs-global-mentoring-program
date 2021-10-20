import { User } from '../storage';

const getRandomNumber = (maxNum = 1) => {
  return Math.floor(Math.random() * maxNum);
};

export const getRandomElements = (arr: User[], limit = 1) => {
  const usedNumbers = new Set();
  const elements = [];

  for (let i = 0; i < limit; i++) {
    let randomNumber = getRandomNumber(arr.length);

    while (usedNumbers.has(randomNumber)) {
      randomNumber = getRandomNumber(arr.length);
    }
    usedNumbers.add(randomNumber);
    elements.push(arr[randomNumber]);
  }

  return elements;
};
