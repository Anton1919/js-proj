import { $ } from '@/core/dom';
import { Emitter } from '@core/Emitter';
import { StoreSubscriber } from '@core/StoreSubscriber';

export class Excel {
  constructor(selector, option) {
    this.$el = $(selector);
    this.components = option.components || [];
    this.emitter = new Emitter();
    this.store = option.store;
    this.subscriber = new StoreSubscriber(this.store);
  }

  getRoot() {
    const $root = $.create('div', 'excel');

    // Позволяет передать любые опиции в наши компоненеты
    const componentOptions = {
      emitter: this.emitter,
      store: this.store,
    };

    this.components = this.components.map((Component) => {
      const $el = $.create('div', Component.className);
      const component = new Component($el, componentOptions);
      $el.html(component.toHTML());
      $root.append($el);
      return component;
    });

    return $root;
  }

  render() {
    this.$el.append(this.getRoot());
    this.subscriber.subscribeComponent(this.components);
    this.components.forEach((component) => component.init());
  }

  destroy() {
    this.subscriber.unsubscribeComponent();
    this.components.forEach((component) => component.destroy());
  }
}
