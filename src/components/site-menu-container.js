import {createElement} from "../dom-util";

export default class SiteMenuContainer {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return `<section class="control__btn-wrap"></section>`;
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
