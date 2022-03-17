import { getRandomInt } from "./random";

/**
 * Shallow copies and removes the specified element(s) from the array. Returns the copied array. If
 * the specified element(s) are not found in the array, it will simply return a shallow copy of the
 * array.
 *
 * This function is variadic, meaning that you can specify N arguments to remove N elements.
 */
function arrayRemove<T>(
  originalArray: T[] | readonly T[],
  ...elementsToRemove: T[]
): T[] {
  const elementsToRemoveSet = new Set(elementsToRemove);

  const array: T[] = [];
  for (const element of originalArray) {
    if (!elementsToRemoveSet.has(element)) {
      array.push(element);
    }
  }

  return array;
}

/**
 * Removes the specified element(s) from the array. If the specified element(s) are not found in the
 * array, this function will do nothing. Returns whether or not one or more elements were removed.
 *
 * This function is variadic, meaning that you can specify N arguments to remove N elements.
 */
export function arrayRemoveInPlace<T>(
  array: T[],
  ...elementsToRemove: T[]
): boolean {
  let removedOneOrMoreElements = false;
  for (const element of elementsToRemove) {
    const index = array.indexOf(element);
    if (index > -1) {
      removedOneOrMoreElements = true;
      array.splice(index, 1);
    }
  }

  return removedOneOrMoreElements;
}

export function emptyArray<T>(array: T[]): void {
  array.splice(0, array.length);
}

/**
 * Helper function to get a random element from the provided array.
 *
 * @param array The array to get an element from.
 * @param exceptions Optional. An array of elements to skip over if selected.
 */
export function getRandomArrayElement<T>(
  array: T[],
  exceptions: T[] | readonly T[] = [],
): T {
  if (array.length === 0) {
    throw new Error(
      "Failed to get a random array element since the provided array is empty.",
    );
  }

  const arrayWithoutExceptions = arrayRemove(array, ...exceptions);
  const randomIndex = getRandomArrayIndex(arrayWithoutExceptions);
  return arrayWithoutExceptions[randomIndex];
}

export function getRandomArrayIndex<T>(array: T[]): number {
  if (array.length === 0) {
    throw new Error(
      "Failed to get a random array index since the provided array is empty.",
    );
  }

  return getRandomInt(0, array.length - 1);
}

export function initArray<T>(length: number, value: T): T[] {
  return Array.from({ length }, () => value);
}
