import {createElement} from "../dom-util";

export default class SiteMenuItem {
  constructor(siteMenuId, siteMenuName, isSelected) {
    this._siteMenuId = siteMenuId;
    this._siteMenuName = siteMenuName;
    this._isSelected = isSelected;
    this._element = null;
  }

  getTemplate() {
    return `<div>
             <input
                type="radio"
                name="control"
                id="control__${this._siteMenuId.toLowerCase()}"
                class="control__input visually-hidden"
                ${this._isSelected ? `checked` : ``}
             />
             <label for="control__${this._siteMenuId.toLowerCase()}" class="control__label control__label--${this._siteMenuId.toLowerCase()}"
                >${this._siteMenuName}</label
             >
            </div>`;
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
