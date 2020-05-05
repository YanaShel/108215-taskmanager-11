import moment from "moment";

export const Key = {
  ESCAPE: `Escape`,
};

const getRandomSign = () => Math.random() > 0.5 ? 1 : -1;

export const formatTime = (date) => {
  return moment(date).format(`hh:mm`);
};

export const formatDate = (date) => {
  return moment(date).format(`DD MMMM`);
};

export const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

export const getRandomDate = () => {
  const targetDate = new Date();
  const delta = getRandomSign() * getRandomIntegerNumber(0, 8);

  targetDate.setDate(targetDate.getDate() + delta);
  return targetDate;
};
