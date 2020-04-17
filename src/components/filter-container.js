import {createElement} from "../dom-util";

export default class FilterContainer {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return `<section class="main__filter filter container"></section>`;
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
