export class Excel {
  constructor(selector, option) {
    this.$el = document.querySelector(selector);
    this.components = option.components || [];
  }

  getRoot() {
    const $root = document.createElement('div');

    this.components.forEach((Component) => {
      const component = new Component;
      $root.insertAdjacentHTML('beforeend', component.toHTML());
    });

    return $root;
  }

  render() {
    this.$el.append(this.getRoot());
  }
}
