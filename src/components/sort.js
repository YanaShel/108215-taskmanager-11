import {createElement} from "../util";

export default class Sort {
  constructor(sortList) {
    this._sortList = sortList;
    this._element = null;
  }

  getTemplate() {
    return `<div class="board__filter-list">${this.createSortItems(this._sortList)}</div>`;
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

  createSortItem(item) {
    return `<a href="#" class="board__filter" data-sort-type="default">${item}</a>`;
  }

  createSortItems(items) {
    return items.map((item) => this.createSortItem(item)).join(`\n`);
  }

}
