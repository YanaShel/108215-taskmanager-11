export const Key = {
  ESCAPE: `Escape`,
};

const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

const getRandomSign = () => Math.random() > 0.5 ? 1 : -1;

export const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours() % 12);
  const minutes = castTimeFormat(date.getMinutes());

  return `${hours}:${minutes}`;
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
