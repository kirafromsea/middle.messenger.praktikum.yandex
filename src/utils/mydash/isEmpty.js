/*
Проверяет является ли переданный аргумент пустым.

isEmpty([1, 2, 3]); // => false
isEmpty(''); // => true
 */

function isEmpty(value) {
  if (
   value === null ||
   value === undefined ||
   typeof(value) === 'boolean' ||
   typeof(value) === 'number'
  ) {
    return true;
  }

  if (typeof value === 'function' && Object.keys(value).length === 0) {
    return true;
  }

  const valueProtorype = Object.prototype.toString.call(value);
  if (valueProtorype === '[object Map]' || valueProtorype === '[object Set]') {
    return !value.size
  }

  if (
   (typeof value === 'object' || typeof value === 'function') &&
   Object.keys(value).length === 0
  ) {
    return true;
  }

  if (typeof value === 'string' && value.trim().length === 0) {
    return true;
  }

  return !value;
}

export default isEmpty;
