import SiteMenuContainerComponent from "./components/site-menu-container";
import SiteMenuItemComponent from "./components/site-menu";
import FilterContainerComponent from "./components/filter-container";
import FilterComponent from "./components/filter";
import BoardComponent from "./components/board";
import SortContainerComponent from "./components/sort-container";
import SortComponent from "./components/sort";
import TaskComponent from "./components/task";
import TasksComponent from "./components/tasks";
import TaskEditComponent from "./components/task-edit";
import LoadMoreButtonComponent from "./components/load-more-button";
import {generateTasks} from "./mock/task";
import {render, RenderPosition} from "./dom-util";

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
    const menu = new SiteMenuItemComponent(menuItem.id, menuItem.name, i === 1);
    render(siteMenuContainer.getElement(), menu.getElement(), RenderPosition.BEFOREEND);
  });
};
const renderFilters = (filterContainer, filters) => {
  filters.forEach((filterName, i) => {
    const taskCount = Math.floor(Math.random() * 10);
    const filter = new FilterComponent(filterName, taskCount, i === 0);
    render(filterContainer.getElement(), filter.getElement(), RenderPosition.BEFOREEND);
  });
};
const renderTask = (taskListElement, task) => {

  const onEditButtonClick = () => {
    taskListElement.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
  };

  const onEditFormSubmit = (evt) => {
    evt.preventDefault();
    taskListElement.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
  };

  const taskComponent = new TaskComponent(task);
  const editButton = taskComponent.getElement().querySelector(`.card__btn--edit`);
  editButton.addEventListener(`click`, onEditButtonClick);

  const taskEditComponent = new TaskEditComponent(task);
  const editForm = taskEditComponent.getElement().querySelector(`form`);
  editForm.addEventListener(`submit`, onEditFormSubmit);

  render(taskListElement, taskComponent.getElement(), RenderPosition.BEFOREEND);

};
const renderSort = (sortContainer, sortItems) => {
  sortItems.forEach((sortItem) => {
    render(sortContainer.getElement(), new SortComponent(sortItem).getElement(), RenderPosition.BEFOREEND);
  });
};
const renderBoard = (boardComponent, tasks) => {
  renderSort(sortContainerComponent, SORT_ITEMS);

  render(boardComponent.getElement(), new TasksComponent().getElement(), RenderPosition.BEFOREEND);
  const taskListElement = boardComponent.getElement().querySelector(`.board__tasks`);
  let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
  tasks.slice(0, showingTasksCount)
      .forEach((task) => renderTask(taskListElement, task));

  const loadMoreButtonComponent = new LoadMoreButtonComponent();
  render(boardComponent.getElement(), loadMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

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

const siteMenuContainerComponent = new SiteMenuContainerComponent();
const filterContainerComponent = new FilterContainerComponent();
const boardComponent = new BoardComponent();
const sortContainerComponent = new SortContainerComponent();

render(siteHeaderElement, siteMenuContainerComponent.getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, filterContainerComponent.getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, boardComponent.getElement(), RenderPosition.BEFOREEND);
render(boardComponent.getElement(), sortContainerComponent.getElement(), RenderPosition.BEFOREEND);

renderMenu(siteMenuContainerComponent, SITE_MENU_ITEMS);
renderFilters(filterContainerComponent, FILTER_NAMES);
renderBoard(boardComponent, tasks);
