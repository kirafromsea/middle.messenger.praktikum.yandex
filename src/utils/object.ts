export type Indexed<T = any> = {
    [key in string]: T;
};

export const isPlainObject = (value: unknown): value is Indexed => typeof value === 'object'
        && value !== null
        && value.constructor === Object
        && Object.prototype.toString.call(value) === '[object Object]';

function isArray(value: unknown): value is [] {
  return Array.isArray(value);
}

function isArrayOrObject(value: unknown): value is [] | Indexed {
  return isPlainObject(value) || isArray(value);
}

export const merge = (left: Indexed, right: Indexed): Indexed => {
  Object.keys(right).forEach((key) => {
    if (right.hasOwnProperty(key)) {
      try {
        if (left[key].constructor === Object) {
          left[key] = merge(left[key] as Indexed, right[key] as Indexed);
        } else {
          left[key] = right[key];
        }
      } catch (e) {
        left[key] = right[key];
      }
    }
  });

  return left;
};

export const set = (object: Indexed | unknown, path: string, value: unknown): Indexed | unknown => {
  if (typeof object !== 'object' || object === null) {
    return object;
  }
  const result = path.split('.').reduceRight<Indexed>((acc, key) => ({
    [key]: acc,
  }), value as any);

  return merge(object as Indexed, result);
};

export const isEqual = (a: Indexed, b: Indexed): boolean => {
  if (!a || !b) {
    return a === b;
  }

  if (Object.keys(a).length !== Object.keys(b).length) {
    return false;
  }

  if (Object.keys(a).length === 0 || Object.keys(b).length === 0) {
    return Object.keys(a).length === 0 && Object.keys(b).length === 0;
  }

  for (const [key, value] of Object.entries(a)) {
    if (!b.hasOwnProperty(key) || a[key] === null || b[key] === null) {
      return a[key] === b[key];
    }
    if (isArrayOrObject(value) && isArrayOrObject(b[key])) {
      if (!isEqual(value, b[key])) {
        return false;
      }
    }
  }

  return true;
};

export function cloneDeep(obj: Record<string, unknown | any>): Record<string, unknown | any> {
  return (function _cloneDeep(item: any): Record<string, unknown | any> {
    if (item === null || typeof item !== 'object') {
      return item;
    }

    if (item instanceof Date) {
      return new Date(item.valueOf());
    }

    if (item instanceof Array) {
      const copy: any = [];

      item.forEach((_, i) => { copy[i] = _cloneDeep(item[i]); });

      return copy;
    }

    if (item instanceof Set) {
      const copy = new Set();

      item.forEach((v) => copy.add(_cloneDeep(v)));

      return copy;
    }

    if (item instanceof Map) {
      const copy = new Map();

      item.forEach((v, k) => copy.set(k, _cloneDeep(v)));

      return copy;
    }

    if (item instanceof Object) {
      const copy: any = {};

      Object.getOwnPropertySymbols(item).forEach((s) => { copy[s] = _cloneDeep(item[s]); });

      Object.keys(item).forEach((k) => { copy[k] = _cloneDeep(item[k]); });

      return copy;
    }

    throw new Error(`Unable to copy object: ${item}`);
  }(obj));
}
