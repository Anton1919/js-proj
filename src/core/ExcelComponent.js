import { DomListener } from './DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.emitter = options.emitter; // теперь у всех наследников будет эта переменная
    this.subscribe = options.subscribe || [];
    this.unsubscribers = [];
    this.store = options.store;

    this.prepare();
  }

  // Настраиваем наш компонент до init
  prepare() {}

  // Возвращает шаблон компонента
  toHTML() {
    return '';
  }

  // Уведомляем слушателей про событие event
  $emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }

  // Подписываемся на событие event
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn);
    this.unsubscribers.push(unsub);
  }

  $dispatch(action) {
    this.store.dispatch(action);
  }

  // сюда приходят только изменения по тем полям, на которые мы подписались
  storeChanged() {}

  isWatching(key) {
    return this.subscribe.includes(key);
  }

  // Инициализируем компонент
  // Добавляем DOM слушателей
  init() {
    this.initDomListeners();
  }

  // Удаляем компонент
  // Чистим слушатели
  destroy() {
    this.removeDomListeners();
    this.unsubscribers.forEach((unsub) => unsub());
  }
}
