import AbstractComponent from "../abstract-component";

export default class Sort extends AbstractComponent {
  constructor(item) {
    super();

    this._item = item;
  }

  getTemplate() {
    return `<a href="#" class="board__filter" data-sort-type="default">
                 ${this._item}
            </a>`;
  }
}
