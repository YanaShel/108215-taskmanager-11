import AbstractComponent from "../abstract-component";

export const SortType = {
  'SORT BY DEFAULT': `default`,
  'SORT BY DATE up': `date-up`,
  'SORT BY DATE down': `date-down`,
};

export default class Sort extends AbstractComponent {
  constructor() {
    super();

    this._currenSortType = `default`;
  }

  getTemplate() {
    return (
      `<div class="board__filter-list">
          ${this._getFilterItemsMarkup()}
       </div>`
    );
  }

  getSortType() {
    return this._currenSortType;
  }

  setSortTypeChangeListener(listener) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName.toLowerCase() !== `a`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (this._currenSortType === sortType) {
        return;
      }

      this._currenSortType = sortType;
      listener(this._currenSortType);
    });
  }

  _createFilterItemMarkup(name, sortType) {
    return (
      `<a href="#" class="board__filter" data-sort-type="${sortType}">
            ${name}
       </a>`
    ).trim();
  }

  _getFilterItemsMarkup() {
    return Object.entries(SortType).map(([name, sortType]) =>
      this._createFilterItemMarkup(name, sortType))
      .join(`\n`);
  }
}
