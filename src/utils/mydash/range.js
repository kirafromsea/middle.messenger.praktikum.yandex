/*
Создаёт массив чисел (положительных или отрицательных),
растущих от начальной заданной границы до конечной, не включая её.
Шаг -1 используется, если задано отрицательное начало без конца или шага.
Если не задано значение окончания последовательности,
то скрипт считает первое значение концом последовательности
 и начинает с нуля с шагом один.

range(4); // => [0, 1, 2, 3]
range(-4); // => [0, -1, -2, -3]
range(1, 5); // => [1, 2, 3, 4]
range(0, 20, 5); // => [0, 5, 10, 15]
range(0, -4, -1); // => [0, -1, -2, -3]
range(1, 4, 0); // => [1, 1, 1]
range(0); // => []

 */

function range(start = 0, end, step) {
  if (end === undefined) {
    end = start;
    start = 0;
  }

  step = step === undefined ? 1 : step;

  if (start > end && step > 0) {
    step = -step;
  }

  if (start === end) {
    return [];
  }

  const list = [];

  if (step === 0) {
    for (let i = 1; i < end; i++) {
      list.push(start);
    }
  } else {
    if (end > start) {
      do {
        list.push(start);
        start += step;
      } while (start < end);
    } else {
      do {
        list.push(start);
        start += step;
      } while (start > end);
    }
  }

  return list;
}

export default range;
