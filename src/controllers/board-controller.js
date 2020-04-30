import Task from "../components/board/task/task";
import TaskEdit from "../components/board/task/task-edit";
import Sort from "../components/board/sort";
import NoTasks from "../components/board/no-tasks";
import Tasks from "../components/board/task/tasks";
import LoadMoreButton from "../components/board/load-more-button";
import {remove, render, replace} from "../util/dom-util";
import {Key} from "../util/common";

const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

export default class BoardController {
  constructor(container) {
    this._container = container;
    this._noTasks = new NoTasks();
    this._sort = new Sort();
    this._tasks = new Tasks();
    this._loadMoreButton = new LoadMoreButton();
  }

  render(tasks) {
    const container = this._container.getElement();
    const isAllTasksArchived = tasks.every((task) => task.isArchive);

    if (isAllTasksArchived) {
      render(container, this._noTasks);
      return;
    }

    render(container, this._sort);
    render(container, this._tasks);

    const taskList = this._tasks.getElement();

    let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
    tasks.slice(0, showingTasksCount)
      .forEach((task) => this._renderTask(taskList, task));

    render(container, this._loadMoreButton);

    this._loadMoreButton.setClickListener(() => {
      const prevTasksCount = showingTasksCount;
      showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

      tasks.slice(prevTasksCount, showingTasksCount)
        .forEach((task) => this._renderTask(taskList, task));

      if (showingTasksCount >= tasks.length) {
        remove(this._loadMoreButton);
      }
    });
  }

  _renderTask(taskListElement, task) {

    const replaceTaskToEdit = () => {
      replace(taskEditCard, taskCard);
    };

    const replaceEditToTask = () => {
      replace(taskCard, taskEditCard);
    };

    const onEscKeyDown = (evt) => {
      const isEscKey = evt.key === Key.ESCAPE;

      if (isEscKey) {
        replaceEditToTask();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    const taskCard = new Task(task);
    taskCard.setEditButtonClickListener(() => {
      replaceTaskToEdit();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    const taskEditCard = new TaskEdit(task);
    taskEditCard.setSubmitListener((evt) => {
      evt.preventDefault();
      replaceEditToTask();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    render(taskListElement, taskCard);

  }

}
