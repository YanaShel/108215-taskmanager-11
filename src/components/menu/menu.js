import AbstractComponent from "../abstract-component";

const SITE_MENU_ITEMS = [
  {id: `new-task`, name: `+ ADD NEW TASK`},
  {id: `task`, name: `TASKS`},
  {id: `statistic`, name: `STATISTICS`},
];

export default class Menu extends AbstractComponent {
  getTemplate() {
    return (
      `<section class="control__btn-wrap">
        ${this._createMenuItemsMarkup()}
       </section>`
    );
  }

  _createMenuItemMarkup(id, name, isSelected) {
    return (
      `<input
            type="radio"
            name="control"
            id="control__${id}"
            class="control__input visually-hidden"
            ${isSelected ? `checked` : ``}
       />
       <label
            for="control__${id}"
            class="control__label control__label--${id}"
            >${name}</label
       >`
    );
  }

  _createMenuItemsMarkup() {
    return SITE_MENU_ITEMS.map(({id, name}, i) =>
      this._createMenuItemMarkup(id, name, i === 1))
     .join(`\n`);
  }
}
