import {createElement} from "../util";

export default class SiteMenu {
  constructor(siteMenuItems) {
    this._siteMenuItem = siteMenuItems;
    this._element = null;
  }

  getTemplate() {
    return `<section class="control__btn-wrap">
              <input
              type="radio"
              name="control"
              id="control__new-task"
              class="control__input visually-hidden"
            />
            <label for="control__new-task" class="control__label control__label--new-task"
              >+ ADD NEW TASK</label
            >${this.createSiteMenu(this._siteMenuItem)}</section>`;
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

  createSiteMenuItemTemplate(siteMenuItem, selected) {
    return `<input
                type="radio"
                name="control"
                id="control__${siteMenuItem.toLowerCase()}"
                class="control__input visually-hidden"
                ${selected ? `checked` : ``}
              />
              <label for="control__${siteMenuItem.toLowerCase()}" class="control__label control__label--${siteMenuItem.toLowerCase()}"
                >${siteMenuItem}</label
              >`;
  }

  createSiteMenu(siteMenuItems) {
    return siteMenuItems.map((item, i) => this.createSiteMenuItemTemplate(item, i === 0)).join(`\n`);
  }
}
