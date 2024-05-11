import { capitalize } from './utils';

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error('No $root provided for DomListener');
    }
    this.$root = $root;
    this.listeners = listeners;
  }

  initDomListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener);
      /* this[method] содержит такие названия как например  this['onInput']
        - и мы такой записью получаем доступ к инстансам класса,
        например у Formula есть метод onInput и мы имеем доступ
      */
      if (!this[method]) {
        const componentName = this.name || '';

        throw new Error(`Method ${method} is not implemented in ${componentName} component`);
      }

      this[method] = this[method].bind(this);
      /* теперь куда бы ни передавали this[method] он всегда будет забинден на
      свой собственный контекcт и в методе ниже removeDomListeners
      мы юзаем ту же самоу функцию this[method] что и тут
      */
      this.$root.on(listener, this[method]);
    });
  }

  removeDomListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener);
      this.$root.off(listener, this[method]);
    });
  }
}

function getMethodName(eventName) {
  return 'on' + capitalize(eventName);
}
