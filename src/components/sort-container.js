import {createElement} from "../dom-util";

export default class SortContainer {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return `<div class="board__filter-list"></div>`;
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
