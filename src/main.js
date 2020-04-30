import Menu from "./components/menu/menu";
import Filter from "./components/filter/filter";
import Board from "./components/board/board";
import Sort from "./components/board/sort";
import Tasks from "./components/board/task/tasks";
import NoTasks from "./components/board/no-tasks";
import Task from "./components/board/task/task";
import TaskEdit from "./components/board/task/task-edit";
import LoadMoreButton from "./components/board/load-more-button";
import {generateTasks} from "./mock/task";
import {remove, render, replace} from "./util/dom-util";
import {Key} from "./util/common";

const TASK_COUNT = 15;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const mainElement = document.querySelector(`.main`);
const menuContainer = document.querySelector(`.main__control`);

const renderTask = (taskListElement, task) => {

  const replaceTaskToEdit = () => {
    replace(taskEditComponent, taskComponent);
  };

  const replaceEditToTask = () => {
    replace(taskComponent, taskEditComponent);
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

  render(taskListElement, taskComponent);

};

const renderBoard = (boardComponent, tasks) => {
  const sortComponent = new Sort();
  render(boardComponent.getElement(), sortComponent);

  const isAllTasksArchived = tasks.every((task) => task.isArchive);

  if (isAllTasksArchived) {
    render(boardComponent.getElement(), new NoTasks());
    return;
  }

  render(boardComponent.getElement(), new Tasks());
  const taskListElement = boardComponent.getElement().querySelector(`.board__tasks`);
  let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
  tasks.slice(0, showingTasksCount)
      .forEach((task) => renderTask(taskListElement, task));

  const loadMoreButtonComponent = new LoadMoreButton();
  render(boardComponent.getElement(), loadMoreButtonComponent);

  loadMoreButtonComponent.getElement().addEventListener(`click`, () => {
    const prevTasksCount = showingTasksCount;
    showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

    tasks.slice(prevTasksCount, showingTasksCount)
      .forEach((task) => renderTask(taskListElement, task));

    if (showingTasksCount >= tasks.length) {
      remove(loadMoreButtonComponent);
    }
  });
};

const tasks = generateTasks(TASK_COUNT);

const menu = new Menu();
const filter = new Filter();
const board = new Board();

render(menuContainer, menu);
render(mainElement, filter);
render(mainElement, board);

renderBoard(board, tasks);
