import {createSiteMenuTemplate} from "./components/site-menu";
import {createFilterTemplate} from "./components/filter";
import {createBordTemplate} from "./components/board";
import {createSortingTemplate} from "./components/sorting";
import {createTaskTemplate} from "./components/task";
import {createTaskEditTemplate} from "./components/task-edit";
import {createLoadMoreButtonTemplate} from "./components/load-more-button";
import {generateFilters} from "./mock/filter";

const TASK_COUNT_DEFAULT = 1;
const TASK_COUNT = 3;

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const filters = generateFilters();

const render = (container, template, count = TASK_COUNT_DEFAULT, place = `beforeend`) => {
  for (let i = 0; i < count; i++) {
    container.insertAdjacentHTML(place, template);
  }
};

render(siteHeaderElement, createSiteMenuTemplate());
render(siteMainElement, createFilterTemplate(filters));
render(siteMainElement, createBordTemplate());

const boardElement = siteMainElement.querySelector(`.board`);
const taskListElement = siteMainElement.querySelector(`.board__tasks`);

render(boardElement, createSortingTemplate(), TASK_COUNT_DEFAULT, `afterbegin`);
render(taskListElement, createTaskEditTemplate());
render(taskListElement, createTaskTemplate(), TASK_COUNT);
render(boardElement, createLoadMoreButtonTemplate());
