import Sort from "../components/board/sort";
import NoTasks from "../components/board/no-tasks";
import Tasks from "../components/board/task/tasks";
import LoadMoreButton from "../components/board/load-more-button";
import {remove, render} from "../util/dom-util";
import TaskController from "./task-controller";

const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

export default class BoardController {
  constructor(container) {
    this._container = container;

    this._tasks = [];
    this._showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
    this._noTasks = new NoTasks();
    this._sort = new Sort();
    this._tasks = new Tasks();
    this._loadMoreButton = new LoadMoreButton();
  }

  _renderTasks(taskList, tasks) {
    return tasks.map((task) => {
      const taskController = new TaskController(taskList);
      taskController.render(task);

      return taskController;
    });
  }

  render(tasks) {
    this._tasks = tasks;

    const container = this._container.getElement();

    const isAllTasksArchived = tasks.every((task) => task.isArchive);

    if (isAllTasksArchived) {
      render(container, this._noTasks);
      return;
    }

    render(container, this._sort);
    render(container, this._tasks);

    const taskList = this._tasks.getElement();

    this._renderTasks(taskList, tasks.slice(0, this._showingTasksCount));

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
      const taskList = this._tasks.getElement();
      this._showingTasksCount = this._showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

      this._renderTasks(taskList, this._tasks.slice(prevTasksCount, this._showingTasksCount));

      if (this._showingTasksCount >= this._tasks.length) {
        remove(this._loadMoreButton);
      }
    });
  }
}
