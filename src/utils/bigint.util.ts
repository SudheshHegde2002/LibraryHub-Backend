/**
 * Converts BigInt values to strings recursively in objects and arrays.
 * This is necessary because JSON.stringify() cannot serialize BigInt values.
 */
export function convertBigIntToString(obj: any): any {
  if (obj === null || obj === undefined) {
    return obj;
  }
  if (typeof obj === 'bigint') {
    return obj.toString();
  }
  if (Array.isArray(obj)) {
    return obj.map((item) => convertBigIntToString(item));
  }
  if (typeof obj === 'object') {
    const converted: any = {};
    for (const key in obj) {
      converted[key] = convertBigIntToString(obj[key]);
    }
    return converted;
  }
  return obj;
}

