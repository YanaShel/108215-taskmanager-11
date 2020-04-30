import AbstractComponent from "../abstract-component";

const SORT_ITEMS = [
  `SORT BY DEFAULT`,
  `SORT BY DATE up`,
  `SORT BY DATE down`
];

export default class Sort extends AbstractComponent {
  getTemplate() {
    return (
      `<div class="board__filter-list">
          ${this._createFilterItemsMarkup()}
       </div>`
    );
  }

  _createFilterItemMarkup(name) {
    return (
      `<a href="#" class="board__filter" data-sort-type="default">
            ${name}
       </a>`
    ).trim();
  }

  _createFilterItemsMarkup() {
    return SORT_ITEMS.map((item) =>
      this._createFilterItemMarkup(item))
      .join(`\n`);
  }
}
