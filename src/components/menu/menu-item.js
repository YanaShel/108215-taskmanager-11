import AbstractComponent from "../abstract-component";

export default class MenuItem extends AbstractComponent {
  constructor(item) {
    super();

    this._item = item;
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
}
