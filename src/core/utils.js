export function capitalize(string) {
  if (typeof string !== 'string') {
    return '';
  }

  return string.charAt(0).toLocaleUpperCase() + string.slice(1);
}

export function range(start, end) {
  if (start > end) {
    // ниже меняем с помощью деструктуризации значение переменных start на end, и end на start
    // для избежания ошибки при расчете длины массива, когда мы кликаем например с 3 колонки на 1.
    [end, start] = [start, end];
  }
  const length = end - start + 1;
  return new Array(length).fill('').map((_, index) => start + index);
}

export function storage(key, data = null) {
  if (!data) {
    return JSON.parse(localStorage.getItem(key));
  }
  localStorage.setItem(key, JSON.stringify(data));
}

export function isEqual(a, b) {
  const isObjects = typeof a === 'object' && typeof b === 'object';
  if (isObjects) {
    return JSON.stringify(a) === JSON.stringify(b);
  }
  return a === b;
}
