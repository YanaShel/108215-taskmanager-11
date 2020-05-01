import Task from "../components/board/task/task";
import TaskEdit from "../components/board/task/task-edit";
import {replace, render} from "../util/dom-util";
import {Key} from "../util/common";

export default class TaskController {
  constructor(container) {
    this._container = container;
    this._task = null;
    this._task = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(task) {
    this._task = new Task(task);
    this._taskEdit = new TaskEdit(task);

    this._task.setEditButtonClickListener(() => {
      this._replaceTaskToEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._task.setArchiveButtonClickListener(() => {});

    this._task.setFavoriteButtonClickListener(() => {});

    this._taskEdit.setSubmitListener((evt) => {
      evt.preventDefault();
      this._replaceEditToTask();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    });

    render(this._container, this._task);

  }

  _replaceTaskToEdit() {
    replace(this._taskEdit, this._task);
  }

  _replaceEditToTask() {
    replace(this._task, this._taskEdit);
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === Key.ESCAPE;

    if (isEscKey) {
      this._replaceEditToTask();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
