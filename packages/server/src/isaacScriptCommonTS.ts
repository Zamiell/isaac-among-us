// The functions here are copied from `isaacscript-common-ts` because this package uses CommonJS
// instead of ESM. (We cannot convert to ESM because TypeScriptToLua will not work properly with
// ".js" file extensions in the "common" package.)

/* eslint-disable @typescript-eslint/no-explicit-any */

interface ReadonlySetConstructor {
  new <T = any>(values?: readonly T[] | Iterable<T> | null): ReadonlySet<T>;
  readonly prototype: ReadonlySet<any>;
}

/** An alias for the `Set` constructor that returns a read-only set. */
export const ReadonlySet = Set as ReadonlySetConstructor;

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
  const elementsToRemoveSet = new ReadonlySet(elementsToRemove);

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

/** Helper function to remove all of the elements in an array in-place. */
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
  array: T[] | readonly T[],
  exceptions: T[] | readonly T[] = [],
): T {
  if (array.length === 0) {
    throw new Error(
      "Failed to get a random array element since the provided array is empty.",
    );
  }

  const arrayWithoutExceptions = arrayRemove(array, ...exceptions);
  const randomIndex = getRandomArrayIndex(arrayWithoutExceptions);
  const randomElement = arrayWithoutExceptions[randomIndex];
  if (randomElement === undefined) {
    throw new Error(
      `Failed to get a random array element since the random index of ${randomIndex} was not valid.`,
    );
  }

  return randomElement;
}

/**
 * Helper function to get a random index from the provided array.
 *
 * @param array The array to get the index from.
 * @param exceptions Optional. An array of indexes that will be skipped over when getting the random
 *                   index. Default is an empty array.
 */
export function getRandomArrayIndex<T>(
  array: T[] | readonly T[],
  exceptions: number[] | readonly number[] = [],
): number {
  if (array.length === 0) {
    throw new Error(
      "Failed to get a random array index since the provided array is empty.",
    );
  }

  return getRandomInt(0, array.length - 1, exceptions);
}

/**
 * This returns a random integer between min and max. It is inclusive on both ends.
 *
 * For example:
 *
 * ```ts
 * const oneTwoOrThree = getRandomInt(1, 3);
 * ```
 *
 * @param min The lower bound for the random number (inclusive).
 * @param max The upper bound for the random number (inclusive).
 * @param exceptions Optional. An array of elements that will be skipped over when getting the
 *                   random integer. For example, a min of 1, a max of 4, and an exceptions array of
 *                   `[2]` would cause the function to return either 1, 3, or 4. Default is an empty
 *                   array.
 */
function getRandomInt(
  min: number,
  max: number,
  exceptions: number[] | readonly number[] = [],
): number {
  min = Math.ceil(min);
  max = Math.floor(max);

  if (min > max) {
    const oldMin = min;
    const oldMax = max;

    min = oldMax;
    max = oldMin;
  }

  const exceptionsSet = new Set(exceptions);

  let randomInt: number;
  do {
    randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
  } while (exceptionsSet.has(randomInt));

  return randomInt;
}

/** Initializes an array with all elements containing the specified default value. */
export function newArray<T>(length: number, value: T): T[] {
  return Array.from({ length }, () => value);
}
