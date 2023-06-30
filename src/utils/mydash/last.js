/*
Выдаёт последний элемент массива.
last([1, 2, 3]); // => 3
 */

function last(list) {
  if (!Array.isArray(list) || !list.length) {
    return undefined;
  }

  const lastElement = list.length - 1;
  return list[lastElement];
}

export default last;
