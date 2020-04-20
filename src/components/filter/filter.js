import AbstractComponent from "../abstract-component";

export default class Filter extends AbstractComponent {
  constructor(filter, count, isChecked) {
    super();

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
}
