import Task from "../components/board/task/task";
import TaskEdit from "../components/board/task/task-edit";
import {replace, render} from "../util/dom-util";
import {Key} from "../util/common";

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};

export default class TaskController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._mode = Mode.DEFAULT;
    this._task = null;
    this._task = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(task) {
    const oldTask = this._task;
    const oldTaskEdit = this._taskEdit;
    this._task = new Task(task);
    this._taskEdit = new TaskEdit(task);

    this._task.setEditButtonClickListener(() => {
      this._replaceTaskToEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._task.setArchiveButtonClickListener(() => {
      this._onDataChange(this, task, Object.assign({}, task, {
        isArchive: !task.isArchive,
      }));
    });

    this._task.setFavoriteButtonClickListener(() => {
      this._onDataChange(this, task, Object.assign({}, task, {
        isFavorite: !task.isFavorite,
      }));
    });

    this._taskEdit.setSubmitListener((evt) => {
      evt.preventDefault();
      this._replaceEditToTask();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    });

    if (oldTask && oldTaskEdit) {
      replace(this._task, oldTask);
      replace(this._taskEdit, oldTaskEdit);
    } else {
      render(this._container, this._task);
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToTask();
    }
  }

  _replaceTaskToEdit() {
    this._onViewChange();
    replace(this._taskEdit, this._task);
    this._mode = Mode.EDIT;
  }

  _replaceEditToTask() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._taskEdit.reset();
    replace(this._task, this._taskEdit);
    this._mode = Mode.DEFAULT;
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === Key.ESCAPE;

    if (isEscKey) {
      this._replaceEditToTask();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
