import {createElement} from "../util";

export default class Filter {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getTemplate() {
    return this.createFilterTemplate(this._filters);
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

  createFilterMarkup({title, count}, selected) {
    return `<input
             type="radio"
             id="filter__${title}"
             class="filter__input visually-hidden"
             name="filter"
             ${selected ? `checked` : ``}
            />
            <label for="filter__${title}" class="filter__label"
            >${title} <span class="filter__${title}-count">${count}</span></label
            >`;
  }

  createFilters(filters) {
    return filters.map((name, i) => this.createFilterMarkup(name, i === 0)).join(`\n`);
  }

  createFilterTemplate(filters) {
    return `<section class="main__filter filter container">${this.createFilters(filters)}</section>`;
  }
}
