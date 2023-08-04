/**
 * Helper function to get the only the values of an enum.
 *
 * (By default, TypeScript will put the keys inside of the values of a number-based enum, so those
 * have to be filtered out.)
 *
 * This function will work properly for both number and string enums.
 */
export function getEnumValues<T>(
  transpiledEnum: Record<string, string | T>,
): T[] {
  const values = Object.values(transpiledEnum);
  const numberValues = values.filter((value) => typeof value === "number");

  // If there are no number values, then this must be a string enum, and no filtration is required.
  const valuesToReturn = numberValues.length > 0 ? numberValues : values;
  return valuesToReturn as T[];
}

// From: https://stackoverflow.com/questions/221294/how-do-you-get-a-timestamp-in-javascript
export function getTimestamp(): number {
  const epochTimestampMilliseconds = Date.now();

  // Lua's method of getting the epoch timestamp results in a value based on seconds.
  const epochTimestampSeconds = epochTimestampMilliseconds / 1000;

  return epochTimestampSeconds;
}

/**
 * Helper function to repeat code N times. This is faster to type and cleaner than using a for loop.
 */
export function repeat(n: number, func: (i: number) => void): void {
  for (let i = 0; i < n; i++) {
    func(i);
  }
}
