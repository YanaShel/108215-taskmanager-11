import AbstractComponent from "../abstract-component";

export default class FilterContainer extends AbstractComponent {
  getTemplate() {
    return `<section class="main__filter filter container"></section>`;
  }
}
