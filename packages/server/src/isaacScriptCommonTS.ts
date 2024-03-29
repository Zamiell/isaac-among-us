// The functions here are copied from `isaacscript-common-ts` because this package uses CommonJS
// instead of ESM. (We cannot convert to ESM because TypeScriptToLua will not work properly with
// ".js" file extensions in the "common" package.)

/* eslint-disable @typescript-eslint/no-explicit-any */

export type ReadonlyRecord<K extends string | number | symbol, V> = Readonly<
  Record<K, V>
>;

interface ReadonlySetConstructor {
  new <T = any>(values?: readonly T[] | Iterable<T> | null): ReadonlySet<T>;
  readonly prototype: ReadonlySet<any>;
}

/** An alias for the `Set` constructor that returns a read-only set. */
export const ReadonlySet = Set as ReadonlySetConstructor;

type TranspiledEnum = Record<string, string | number>;

/**
 * Shallow copies and removes the specified element(s) from the array. Returns the copied array. If
 * the specified element(s) are not found in the array, it will simply return a shallow copy of the
 * array.
 *
 * This function is variadic, meaning that you can specify N arguments to remove N elements.
 */
// eslint-disable-next-line isaacscript/no-mutable-return
function arrayRemove<T>(
  originalArray: readonly T[],
  ...elementsToRemove: readonly T[]
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
  // eslint-disable-next-line isaacscript/prefer-readonly-parameter-types
  array: T[],
  ...elementsToRemove: readonly T[]
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
// eslint-disable-next-line isaacscript/prefer-readonly-parameter-types
export function emptyArray<T>(array: T[]): void {
  array.splice(0, array.length);
}

/**
 * Helper function to get the only the values of an enum.
 *
 * (By default, TypeScript will put the keys inside of the values of a number-based enum, so those
 * have to be filtered out.)
 *
 * This function will work properly for both number and string enums.
 */
export function getEnumValues<T extends TranspiledEnum>(
  transpiledEnum: T,
): ReadonlyArray<T[keyof T]> {
  const values = Object.values(transpiledEnum);
  const numberValues = values.filter((value) => typeof value === "number");

  // If there are no number values, then this must be a string enum, and no filtration is required.
  const valuesToReturn = numberValues.length > 0 ? numberValues : values;
  return valuesToReturn as Array<T[keyof T]>;
}

/**
 * Helper function to get a random element from the provided array.
 *
 * @param array The array to get an element from.
 * @param exceptions Optional. An array of elements to skip over if selected.
 */
export function getRandomArrayElement<T>(
  array: readonly T[],
  exceptions: readonly T[] = [],
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
  array: readonly T[],
  exceptions: readonly number[] = [],
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
  exceptions: readonly number[] = [],
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
// eslint-disable-next-line isaacscript/no-mutable-return
export function newArray<T>(length: number, value: T): T[] {
  return Array.from({ length }, () => value);
}

/**
 * Helper function to repeat code N times. This is faster to type and cleaner than using a for loop.
 *
 * For example:
 *
 * ```ts
 * repeat(10, () => {
 *   foo();
 * });
 * ```
 *
 * The repeated function is passed the index of the iteration, if needed:
 *
 * ```ts
 * repeat(3, (i) => {
 *   console.log(i); // Prints "0", "1", "2"
 * });
 * ```
 */
export function repeat(num: number, func: (i: number) => void): void {
  for (let i = 0; i < num; i++) {
    func(i);
  }
}
