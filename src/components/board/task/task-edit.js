import AbstractSmartComponent from "../../abstract-smart-component";
import {COLORS, DAYS} from "../../../util/data";
import {formatTime, formatDate} from "../../../util/common";
import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";

export default class TaskEdit extends AbstractSmartComponent {
  constructor(task) {
    super();

    this._task = task;
    this._description = task.description;
    this._dueDate = task.dueDate;
    this._color = task.color;
    this._isDateShowing = !!task.dueDate;
    this._isRepeatingTask = Object.values(task.repeatingDays).some(Boolean);
    this._activeRepeatingDays = Object.assign({}, task.repeatingDays);
    this._flatpickr = null;
    this._submitListener = null;

    this._applyFlatpickr();
    this._setDateDeadlineButtonClickListener();
    this._setRepeatStatusButtonClickListener();
    this._setRepeatDayButtonClickListener();
  }

  getTemplate() {
    const isExpired = this._dueDate instanceof Date && this._dueDate < Date.now();

    const isBlockSaveButton = (this._isDateShowing && this._isRepeatingTask) ||
      (this._isRepeatingTask && !this._isRepeating(this._activeRepeatingDays));

    const date = (this._isDateShowing && this._dueDate) ? formatDate(this._dueDate) : ``;
    const time = (this._isDateShowing && this._dueDate) ? formatTime(this._dueDate) : ``;

    const repeatClass = this._isRepeatingTask ? `card--repeat` : ``;
    const deadlineClass = isExpired ? `card--deadline` : ``;

    const colorsMarkup = this._createColorsMarkup(COLORS, this._color);
    const repeatingDaysMarkup = this._createRepeatingDaysMarkup(DAYS, this._activeRepeatingDays);

    return `<article class="card card--edit card--${this._color} ${repeatClass} ${deadlineClass}">
            <form class="card__form" method="get">
              <div class="card__inner">
                <div class="card__color-bar">
                  <svg class="card__color-bar-wave" width="100%" height="10">
                    <use xlink:href="#wave"></use>
                  </svg>
                </div>

                <div class="card__textarea-wrap">
                  <label>
                    <textarea
                      class="card__text"
                      placeholder="Start typing your text here..."
                      name="text"
                    >${this._description}</textarea>
                  </label>
                </div>

                <div class="card__settings">
                  <div class="card__details">
                    <div class="card__dates">
                      <button class="card__date-deadline-toggle" type="button">
                        date: <span class="card__date-status">${this._isDateShowing ? `yes` : `no`}</span>
                      </button>

                      ${this._isDateShowing ? `<fieldset class="card__date-deadline">
                        <label class="card__input-deadline-wrap">
                          <input
                            class="card__date"
                            type="text"
                            placeholder=""
                            name="date"
                            value="${date} ${time}"
                          />
                        </label>
                      </fieldset>` : `` }

                      <button class="card__repeat-toggle" type="button">
                        repeat:<span class="card__repeat-status">${this._isRepeatingTask ? `yes` : `no`}</span>
                      </button>

                      ${this._isRepeatingTask ? `<fieldset class="card__repeat-days">
                        <div class="card__repeat-days-inner">
                          ${repeatingDaysMarkup}
                         </div>
                      </fieldset>` : `` }
                    </div>
                  </div>

                  <div class="card__colors-inner">
                    <h3 class="card__colors-title">Color</h3>
                    <div class="card__colors-wrap">
                      ${colorsMarkup}
                    </div>
                  </div>
                 </div>

                <div class="card__status-btns">
                  <button class="card__save" type="submit" ${isBlockSaveButton ? `disabled` : ``}>save</button>
                  <button class="card__delete" type="button">delete</button>
                </div>
              </div>
            </form>
          </article>`;
  }

  recoveryListeners() {
    this.setSubmitListener(this._submitListener);
    this._setDateDeadlineButtonClickListener();
    this._setRepeatStatusButtonClickListener();
    this._setRepeatDayButtonClickListener();
  }

  rerender() {
    super.rerender();

    this._applyFlatpickr();
  }

  reset() {
    const task = this._task;
    this._isDateShowing = Object.values(task.repeatingDays).some(Boolean);
    this._activeRepeatingDays = Object.assign({}, task.repeatingDays);

    this.rerender();
  }

  _isRepeating(repeatingDays) {
    return Object.values(repeatingDays).some(Boolean);
  }

  _setDateDeadlineButtonClickListener() {
    this.getElement().querySelector(`.card__date-deadline-toggle`)
      .addEventListener(`click`, () => {
        this._isDateShowing = !this._isDateShowing;
        this.rerender();
      });
  }

  _setRepeatStatusButtonClickListener() {
    this.getElement().querySelector(`.card__repeat-toggle`)
      .addEventListener(`click`, () => {
        this._isRepeatingTask = !this._isRepeatingTask;
        this.rerender();
      });
  }

  _setRepeatDayButtonClickListener() {
    const repeatDays = this.getElement().querySelector(`.card__repeat-days`);
    if (repeatDays) {
      repeatDays.addEventListener(`change`, (evt) => {
        this._activeRepeatingDays[evt.target.value] = evt.target.checked;
        this.rerender();
      });
    }
  }

  setSubmitListener(listener) {
    this.getElement().querySelector(`form`)
      .addEventListener(`submit`, listener);

    this._submitListener = listener;
  }

  _applyFlatpickr() {
    if (this._flatpickr) {
      this._flatpickr.destroy();
      this._flatpickr = null;
    }

    if (this._isDateShowing) {
      const dateElement = this.getElement().querySelector(`.card__date`);
      this._flatpickr = flatpickr(dateElement, {
        altInput: true,
        allowInput: true,
        defaultDate: this._dueDate || `today`,
      });
    }
  }

  _createRepeatingDaysMarkup(days, repeatingDays) {
    return days.map((day, index) => {
      const isChecked = repeatingDays[day];
      return `<input
            class="visually-hidden card__repeat-day-input"
            type="checkbox"
            id="repeat-${day}-${index}"
            name="repeat"
            value="${day}"
            ${isChecked ? `checked` : ``}
          />
          <label class="card__repeat-day" for="repeat-${day}-${index}"
            >${day}</label
          >`;
    }).join(`\n`);
  }

  _createColorsMarkup(colors, currentColor) {
    return colors.map((color, index) => {
      return `<input
               type="radio"
               id="color-${color}-${index}"
               class="card__color-input card__color-input--${color} visually-hidden"
               name="color"
               value="${color}"
               ${currentColor === color ? `checked` : ``}
            />
            <label
               for="color-${color}-${index}"
               class="card__color card__color--${color}"
            >${color}</label
            >`;
    }).join(`\n`);
  }
}
