import {createElement} from "../../util/dom-util";

export default class Filter {
  constructor(filter, count, isChecked) {
    this._filter = filter;
    this._count = count;
    this._isChecked = isChecked;
    this._element = null;
  }

  getTemplate() {
    return `<input
              type="radio"
              id="filter__${this._filter}"
              class="filter__input visually-hidden"
              name="filter"
              ${this._isChecked ? `checked` : ``}
            />
            <label for="filter__${this._filter}" class="filter__label"
              >${this._filter} <span class="filter__${this._filter}-count">${this._count}</span></label
            >`;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
