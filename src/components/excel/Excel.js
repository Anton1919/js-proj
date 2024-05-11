import { $ } from '@/core/dom';
import { Emitter } from '@core/Emitter';

export class Excel {
  constructor(selector, option) {
    this.$el = $(selector);
    this.components = option.components || [];
    this.emitter = new Emitter();
  }

  getRoot() {
    const $root = $.create('div', 'excel');
    const componentOptions = {
      emitter: this.emitter,
    };

    this.components = this.components.map((Component) => {
      const $el = $.create('div', Component.className);
      const component = new Component($el, componentOptions);
      // DEBUG
      // if (component.name) {
      //   window['c'+ component.name] = component;
      // }
      $el.html(component.toHTML());
      $root.append($el);
      return component;
    });

    return $root;
  }

  render() {
    this.$el.append(this.getRoot());
    this.components.forEach((component) => component.init());
  }
}
