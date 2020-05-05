import AbstractComponent from "../../abstract-component";
import {formatTime, formatDate} from "../../../util/common";

export default class Task extends AbstractComponent {
  constructor(task) {
    super();

    this._task = task;
    this._description = task.description;
    this._dueDate = task.dueDate;
    this._color = task.color;
    this._repeatingDays = task.repeatingDays;
  }

  getTemplate() {
    const isExpired = this._dueDate instanceof Date && this._dueDate < Date.now();
    const isDateShowing = !!this._dueDate;

    const date = isDateShowing ? formatDate(this._dueDate) : ``;
    const time = isDateShowing ? formatTime(this._dueDate) : ``;

    const repeatClass = Object.values(this._repeatingDays).some(Boolean) ? `card--repeat` : ``;
    const deadlineClass = isExpired ? `card--deadline` : ``;
    const editButton = this._createButtonMarkup(`edit`);
    const archiveButton = this._createButtonMarkup(`archive`, !this._task.isArchive);
    const favoriteButton = this._createButtonMarkup(`favorite`, !this._task.isFavorite);

    return (
      `<article class="card card--${this._color} ${repeatClass} ${deadlineClass}">
            <div class="card__form">
              <div class="card__inner">
                <div class="card__control">
                    ${editButton}
                    ${archiveButton}
                    ${favoriteButton}
                </div>

                <div class="card__color-bar">
                  <svg class="card__color-bar-wave" width="100%" height="10">
                    <use xlink:href="#wave"></use>
                  </svg>
                </div>

                <div class="card__textarea-wrap">
                  <p class="card__text">${this._description}</p>
                </div>

                <div class="card__settings">
                  <div class="card__details">
                    <div class="card__dates">
                      <div class="card__date-deadline">
                        <p class="card__input-deadline-wrap">
                          <span class="card__date">${date}</span>
                          <span class="card__time">${time}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>`
    ).trim();
  }

  _createButtonMarkup(name, isActive = true) {
    return (
      `<button
            type="button"
            class="card__btn card__btn--${name} ${isActive ? `` : `card__btn--disabled`}"
        >${name}
       </button>`
    );
  }

  setEditButtonClickListener(listener) {
    this.getElement().querySelector(`.card__btn--edit`)
      .addEventListener(`click`, listener);
  }

  setFavoriteButtonClickListener(listener) {
    this.getElement().querySelector(`.card__btn--favorite`)
      .addEventListener(`click`, listener);
  }

  setArchiveButtonClickListener(listener) {
    this.getElement().querySelector(`.card__btn--archive`)
      .addEventListener(`click`, listener);
  }
}
