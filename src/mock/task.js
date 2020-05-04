import {COLORS} from "../util/data";
import {getRandomDate, getRandomArrayItem} from "../util/common";


const TASK_DESCRIPTIONS = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`,
];

const DEFAULT_REPEATING_DAYS = {
  'mo': false,
  'tu': false,
  'we': false,
  'th': false,
  'fr': false,
  'sa': false,
  'su': false
};

const getRandomRepeatingDays = () => {
  return Object.assign({}, DEFAULT_REPEATING_DAYS, {'mo': Math.random() > 0.5});
};

const generateTask = () => {
  const dueDate = getRandomDate();
  return {
    description: getRandomArrayItem(TASK_DESCRIPTIONS),
    dueDate,
    repeatingDays: dueDate ? DEFAULT_REPEATING_DAYS : getRandomRepeatingDays(),
    color: getRandomArrayItem(COLORS),
    isArchive: Math.random() > 0.5,
    isFavorite: Math.random() > 0.5,
  };
};

export const generateTasks = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateTask);
};

