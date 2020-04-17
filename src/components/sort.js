import {createElement} from "../dom-util";

export default class Sort {
  constructor(sortItem) {
    this._sortItem = sortItem;
    this._element = null;
  }

  getTemplate() {
    return `<a href="#" class="board__filter" data-sort-type="default">${this._sortItem}</a>`;
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
