import AbstractComponent from "../abstract-component";

const FILTER_NAMES = [
  `all`,
  `overdue`,
  `today`,
  `favorites`,
  `repeating`,
  `archive`
];

export default class Filter extends AbstractComponent {
  getTemplate() {
    return (
      `<section class="main__filter filter container">
            ${this._createFiltersMarkup()}
       </section>`
    );
  }

  _createFilterMarkup(name, isChecked) {
    const count = Math.floor(Math.random() * 20);
    return (
      `<input
            type="radio"
            id="filter__${name}"
            class="filter__input visually-hidden"
            name="filter"
            ${isChecked ? `checked` : ``}
       />
       <label for="filter__${name}" class="filter__label"
            >${name} <span class="filter__${name}-count">${count}</span></label
       >`
    ).trim();
  }

  _createFiltersMarkup() {
    return FILTER_NAMES.map((filter, i) =>
      this._createFilterMarkup(filter, i === 0))
      .join(`\n`);
  }
}
