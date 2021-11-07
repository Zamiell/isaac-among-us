export function arrayRemoveInPlace<T>(array: T[], element: T): boolean {
  const index = array.indexOf(element);
  if (index === -1) {
    return false;
  }

  array.splice(index, 1);
  return true;
}

export const ensureAllCases = (obj: never): never => obj;

/**
 * Helper function to get the only the number values of an enum. (By default, TypeScript will
 * include the keys inside of the enum object, so we have to filter those out.)
 */
export function getEnumValues<T>(
  transpiledEnum: Record<string, string | T>,
): T[] {
  const enumValues: T[] = [];
  for (const value of Object.values(transpiledEnum)) {
    if (typeof value === "number") {
      enumValues.push(value);
    }
  }

  if (enumValues.length === 0) {
    throw new Error(
      "Failed to get the enum values. Did you use getEnumValues on a string enum?",
    );
  }

  enumValues.sort();

  return enumValues;
}

export function getRandomArrayElement<T>(array: T[]): T {
  if (array.length === 0) {
    throw new Error(
      "Failed to get a random array element since the provided array is empty.",
    );
  }
  const randomIndex = getRandomInt(0, array.length - 1);
  return array[randomIndex];
}

export function getRandomArrayIndex<T>(array: T[]): number {
  if (array.length === 0) {
    throw new Error(
      "Failed to get a random array index since the provided array is empty.",
    );
  }

  const randomIndex = getRandomInt(0, array.length - 1);
  return randomIndex;
}

// From: https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// From: https://stackoverflow.com/questions/221294/how-do-you-get-a-timestamp-in-javascript
export function getTimestamp(): number {
  const epochTimestampMilliseconds = +new Date();

  // Lua's method of getting the epoch timestamp results in a value based on seconds
  const epochTimestampSeconds = epochTimestampMilliseconds / 1000;

  return epochTimestampSeconds;
}

export function initArray<T>(length: number, value: T): T[] {
  return Array.from({ length }, () => value);
}
