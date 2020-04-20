import AbstractComponent from "../abstract-component";

export default class MenuContainer extends AbstractComponent {
  getTemplate() {
    return `<section class="control__btn-wrap"></section>`;
  }
}
