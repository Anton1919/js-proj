import { ExcelComponent } from '@/core/ExcelComponent';
import { $ } from '@core/dom';
import { changeTitle } from '@/redux/actions';
import { defaultTitle } from '@/constants';

export class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options, // это позволит передать в родительский класс ExcelComponent любые параметры
    });
  }

  onInput(event) {
    const $target = $(event.target);
    this.$dispatch(changeTitle($target.text()));
  }

  toHTML() {
    const title = this.store.getState().title || defaultTitle;

    return `
    <input class="input" type="text" value="${title}"/>
    <div>
      <div class="button">
        <i class="material-icons">delete</i>
      </div>
      <div class="button">
        <i class="material-icons">exit_to_app</i>
      </div>
    </div>
    `;
  }
}
