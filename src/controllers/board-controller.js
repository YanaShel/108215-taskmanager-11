import Sort from "../components/board/sort";
import NoTasks from "../components/board/no-tasks";
import Tasks from "../components/board/task/tasks";
import LoadMoreButton from "../components/board/load-more-button";
import {remove, render} from "../util/dom-util";
import TaskController from "./task-controller";

const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

export const SortType = {
  DATE_DOWN: `date-down`,
  DATE_UP: `date-up`,
  DEFAULT: `default`,
};

export default class BoardController {
  constructor(container) {
    this._container = container;

    this._tasks = [];
    this._showedTasksControllers = [];
    this._showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
    this._noTasks = new NoTasks();
    this._sort = new Sort();
    this._tasksContainer = new Tasks();
    this._loadMoreButton = new LoadMoreButton();
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._sort.setSortTypeChangeListener(this._onSortTypeChange);
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
  }

  _renderTasks(taskList, tasks, onDataChange, onViewChange) {
    return tasks.map((task) => {
      const taskController = new TaskController(taskList, onDataChange, onViewChange);
      taskController.render(task);

      return taskController;
    });
  }

  _getSortedTasks(tasks, sortType, from, to) {
    let sortedTasks = [];
    const showingTasks = tasks.slice();

    switch (sortType) {
      case SortType.DATE_UP:
        sortedTasks = showingTasks.sort((a, b) => a.dueDate - b.dueDate);
        break;
      case SortType.DATE_DOWN:
        sortedTasks = showingTasks.sort((a, b) => b.dueDate - a.dueDate);
        break;
      case SortType.DEFAULT:
        sortedTasks = showingTasks;
        break;
    }

    return sortedTasks.slice(from, to);
  }

  render(tasks) {
    this._tasks = tasks;

    const container = this._container.getElement();

    const isAllTasksArchived = this._tasks.every((task) => task.isArchive);

    if (isAllTasksArchived) {
      render(container, this._noTasks);
      return;
    }

    render(container, this._sort);
    render(container, this._tasksContainer);

    const taskList = this._tasksContainer.getElement();

    const newTasks = this._renderTasks(taskList, this._tasks.slice(0, this._showingTasksCount), this._onDataChange, this._onViewChange);
    this._showedTasksControllers = this._showedTasksControllers.concat(newTasks);

    this._renderLoadMoreButton();
  }

  _renderLoadMoreButton() {
    if (this._showingTasksCount >= this._tasks.length) {
      return;
    }

    const container = this._container.getElement();
    render(container, this._loadMoreButton);

    this._loadMoreButton.setClickListener(() => {
      const prevTasksCount = this._showingTasksCount;
      const taskList = this._tasksContainer.getElement();
      this._showingTasksCount = this._showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

      const sortedTasks = this._getSortedTasks(this._tasks, this._sort.getSortType(), prevTasksCount, this._showingTasksCount);
      const newTasks = this._renderTasks(taskList, sortedTasks, this._onDataChange, this._onViewChange);

      this._showedTasksControllers = this._showedTasksControllers.concat(newTasks);

      if (this._showingTasksCount >= this._tasks.length) {
        remove(this._loadMoreButton);
      }
    });
  }

  _onSortTypeChange(sortType) {
    const taskList = this._tasksContainer.getElement();
    this._showingTasksCount = SHOWING_TASKS_COUNT_BY_BUTTON;

    const sortedTasks = this._getSortedTasks(this._tasks, sortType, 0, this._showingTasksCount);

    taskList.innerHTML = ``;

    const newTasks = this._renderTasks(taskList, sortedTasks, this._onDataChange, this._onViewChange);
    this._showedTasksControllers = newTasks;

    this._renderLoadMoreButton();
  }

  _onDataChange(taskController, oldData, newData) {
    const index = this._tasks.findIndex((it) => it === oldData);
    if (index === -1) {
      return;
    }
    this._tasks = [].concat(this._tasks.slice(0, index), newData, this._tasks.slice(index + 1));

    taskController.render(this._tasks[index]);
  }

  _onViewChange() {
    this._showedTasksControllers.forEach((it) => it.setDefaultView());
  }
}
