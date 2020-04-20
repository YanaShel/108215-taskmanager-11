import {createElement} from "../../util/dom-util";

export default class MenuItem {
  constructor(item) {
    this._item = item;
    this._element = null;
  }

  getTemplate() {
    const {id, name, isSelected} = this._item;
    return `<input
              type="radio"
              name="control"
              id="control__${id.toLowerCase()}"
              class="control__input visually-hidden"
              ${isSelected ? `checked` : ``}
            />
            <label for="control__${id.toLowerCase()}" class="control__label control__label--${id.toLowerCase()}"
              >${name}</label
            >`;
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
