import {createSiteMenuTemplate} from "./components/site-menu";
import {createFilterTemplate} from "./components/filter";
import {createBordTemplate} from "./components/board";
import {createSortingTemplate} from "./components/sorting";
import {createTaskTemplate} from "./components/task";
import {createTaskEditTemplate} from "./components/task-edit";
import {createLoadMoreButtonTemplate} from "./components/load-more-button";
import {generateFilters} from "./mock/filter";
import {generateTasks} from "./mock/task";

const TASK_COUNT_DEFAULT = 1;
const TASK_COUNT = 15;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
const filters = generateFilters();
const tasks = generateTasks(TASK_COUNT);

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
render(taskListElement, createTaskEditTemplate(tasks[0]));
render(boardElement, createLoadMoreButtonTemplate());

const renderPartOfTasks = (begin, end) => {
  tasks.slice(begin, end)
    .forEach((task) => render(taskListElement, createTaskTemplate(task)));
};
const addHandlerToLoadMoreButton = () => {
  const loadMoreButton = boardElement.querySelector(`.load-more`);
  loadMoreButton.addEventListener(`click`, () => {
    const prevTasksCount = showingTasksCount;
    showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

    renderPartOfTasks(prevTasksCount, showingTasksCount);

    if (showingTasksCount >= tasks.length) {
      loadMoreButton.remove();
    }
  });
};

renderPartOfTasks(1, showingTasksCount);
addHandlerToLoadMoreButton();


