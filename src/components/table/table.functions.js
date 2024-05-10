import {range} from '@core/utils';
import {CODES} from '@/components/table/table.template';
import {rowCount} from '@/components/table/Table';

export function isShouldResize(event) {
  return event.target.dataset.resize;
}

export function isCell(event) {
  return event.target.dataset.type === 'cell';
}

export function matrix($target, $current) {
  const target = $target.id(true);
  const current = $current.id(true);
  const cols = range(current.col, target.col);
  const rows = range(current.row, target.row);

  return cols.reduce((acc, col) => {
    rows.forEach((row) => acc.push(`${row}:${col}`));
    return acc;
  }, []);
}

export function nextSelector(key, id) {
  let {row, col} = id;
  const colsCount = CODES.Z - CODES.A;
  const minCollRowValue = 0;
  const maxColsValue = colsCount;
  const maxRowsValue = rowCount - 1;

  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row = row + 1 > maxRowsValue ? maxRowsValue : row + 1;
      break;
    case 'Tab':
    case 'ArrowRight':
      col = col + 1 > maxColsValue ? 25 : col + 1;
      break;
    case 'ArrowLeft':
      col = col - 1 < 0 ? minCollRowValue : col - 1;
      break;
    case 'ArrowUp':
      row = row - 1 < 0 ? minCollRowValue : row - 1;
      break;
  }

  return `[data-id="${row}:${col}"]`;
}
