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
  return new Array(length)
      .fill('')
      .map((_, index) => start + index);
}
