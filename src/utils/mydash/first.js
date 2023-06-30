/*
Выдает первый элемент массива.

first([1, 2, 3]); // => 1
first([]); // => undefined
 */

function first(list) {
  if (!Array.isArray(list) || !list.length) {
    return undefined;
  }

  return list[0];
}

export default first;
