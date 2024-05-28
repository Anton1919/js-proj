import { $ } from '@core/dom';

export function resizeHandler($root, event) {
  return new Promise((resolve) => {
    const $resizer = $(event.target);
    const $parent = $resizer.closest('[data-type="resizable"]');
    const coords = $parent.getCoords();
    const type = $resizer.data.resize;
    const sideProp = type === 'col' ? 'bottom' : 'right';
    let value;

    $resizer.css({
      opacity: 1,
      [sideProp]: '-3000px',
    });

    document.onmousemove = (e) => {
      if (type === 'col') {
        const delta = e.pageX - coords.right;
        value = coords.width + delta;

        // 40px - минимальная ширина колонки в классе .column
        // Убедитесь какая минимальная ширина столбца в классе .column
        const minWidth = 40;
        value = Math.max(value, minWidth);

        // Ниже вычисляем максимально допустимое смещение курсора влево
        // Это значение будет отрицательным,
        // если мы пытаемся уменьшить колонку дальше минимальной ширины
        const maxCursorOffset = coords.width - minWidth;
        const resizerPosition = Math.min(-delta, maxCursorOffset);
        $resizer.css({ right: `${resizerPosition}px` });
      } else {
        const delta = e.pageY - coords.bottom;
        value = coords.height + delta;

        // 20px - минимальная высота строки в классе .row
        // Убедитесь какая минимальная высота строки в классе .row
        const minHeight = 20;
        value = Math.max(value, minHeight);

        // Ниже вычисляем максимально допустимое смещение курсора вверх
        const maxCursorOffset = coords.height - minHeight;
        const resizerPosition = Math.min(-delta, maxCursorOffset);
        $resizer.css({ bottom: `${resizerPosition}px` });
      }
    };

    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;

      if (type === 'col') {
        $parent.css({ width: value + 'px' });
        $root
          .findAllSelectors(`[data-col="${$parent.data.col}"]`)
          .forEach((el) => (el.style.width = value + 'px'));
      } else {
        $parent.css({ height: value + 'px' });
      }

      // В момент окончания ресайза таблицы когда отпускам мышку то передаем уже новые значения чтобы их обновить
      // передаем id и размеры
      resolve({
        value,
        type,
        id: $parent.data[type],
      });

      $resizer.css({
        opacity: 0,
        right: 0,
        bottom: 0,
      });
    };
  });
}
