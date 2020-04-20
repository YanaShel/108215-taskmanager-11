import MenuContainer from "./components/menu/menu-container";
import MenuItem from "./components/menu/menu-item";
import FilterContainer from "./components/filter/filter-container";
import Filter from "./components/filter/filter";
import Board from "./components/board/board";
import SortContainer from "./components/board/sort-container";
import Sort from "./components/board/sort";
import Task from "./components/task/task";
import Tasks from "./components/task/tasks";
import NoTasks from "./components/board/no-tasks";
import TaskEdit from "./components/task/task-edit";
import LoadMoreButton from "./components/board/load-more-button";
import {generateTasks} from "./mock/task";
import {render} from "./util/dom-util";
import {Key} from "./util/util";

const TASK_COUNT = 15;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const FILTER_NAMES = [
  `all`,
  `overdue`,
  `today`,
  `favorites`,
  `repeating`,
  `archive`
];
const SITE_MENU_ITEMS = [
  {id: `new-task`, name: `+ ADD NEW TASK`},
  {id: `task`, name: `TASKS`},
  {id: `statistic`, name: `STATISTICS`},
];
const SORT_ITEMS = [
  `SORT BY DEFAULT`,
  `SORT BY DATE up`,
  `SORT BY DATE down`
];

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const renderMenu = (siteMenuContainer, menuItems) => {
  menuItems.forEach((menuItem, i) => {
    const menu = new MenuItem(menuItem, i === 1);
    render(siteMenuContainer.getElement(), menu.getElement());
  });
};
const renderFilters = (filterContainer, filters) => {
  filters.forEach((filterName, i) => {
    const taskCount = Math.floor(Math.random() * 10);
    const filter = new Filter(filterName, taskCount, i === 0);
    render(filterContainer.getElement(), filter.getElement());
  });
};
const renderTask = (taskListElement, task) => {

  const replaceTaskToEdit = () => {
    taskListElement.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
  };

  const replaceEditToTask = () => {
    taskListElement.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === Key.ESCAPE;

    if (isEscKey) {
      replaceEditToTask();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const taskComponent = new Task(task);
  const editButton = taskComponent.getElement().querySelector(`.card__btn--edit`);
  editButton.addEventListener(`click`, () => {
    replaceTaskToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const taskEditComponent = new TaskEdit(task);
  const editForm = taskEditComponent.getElement().querySelector(`form`);
  editForm.addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceEditToTask();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(taskListElement, taskComponent.getElement());

};
const renderSort = (sortContainer, sortItems) => {
  sortItems.forEach((sortItem) => {
    render(sortContainer.getElement(), new Sort(sortItem).getElement());
  });
};
const renderBoard = (boardComponent, tasks) => {
  const isAllTasksArchived = tasks.every((task) => task.isArchive);

  if (isAllTasksArchived) {
    render(boardComponent.getElement(), new NoTasks().getElement());
    return;
  }

  renderSort(sortContainerComponent, SORT_ITEMS);

  render(boardComponent.getElement(), new Tasks().getElement());
  const taskListElement = boardComponent.getElement().querySelector(`.board__tasks`);
  let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
  tasks.slice(0, showingTasksCount)
      .forEach((task) => renderTask(taskListElement, task));

  const loadMoreButtonComponent = new LoadMoreButton();
  render(boardComponent.getElement(), loadMoreButtonComponent.getElement());

  loadMoreButtonComponent.getElement().addEventListener(`click`, () => {
    const prevTasksCount = showingTasksCount;
    showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

    tasks.slice(prevTasksCount, showingTasksCount)
      .forEach((task) => renderTask(taskListElement, task));

    if (showingTasksCount >= tasks.length) {
      loadMoreButtonComponent.getElement().remove();
      loadMoreButtonComponent.removeElement();
    }
  });
};

const tasks = generateTasks(TASK_COUNT);

const siteMenuContainerComponent = new MenuContainer();
const filterContainerComponent = new FilterContainer();
const boardComponent = new Board();
const sortContainerComponent = new SortContainer();

render(siteHeaderElement, siteMenuContainerComponent.getElement());
render(siteMainElement, filterContainerComponent.getElement());
render(siteMainElement, boardComponent.getElement());
render(boardComponent.getElement(), sortContainerComponent.getElement());

renderMenu(siteMenuContainerComponent, SITE_MENU_ITEMS);
renderFilters(filterContainerComponent, FILTER_NAMES);
renderBoard(boardComponent, tasks);
