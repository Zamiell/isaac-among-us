/**
 * Helper function to get type safety on a switch statement.
 * Very useful to be future-safe against people adding values to a type or an enum.
 */
export const ensureAllCases = (obj: never): never => obj;

/**
 * Helper function to get only the keys of an enum.
 *
 * (By default, TypeScript will put the values inside of the keys of a number-based enum, so those
 * have to be filtered out.)
 *
 * This function will work properly for both number and string enums.
 */
export function getEnumNames<T extends string>(
  transpiledEnum: Record<T, unknown>,
): T[] {
  const keys = Object.keys(transpiledEnum);
  return keys.filter((x) => isNaN(parseInt(x, 10))) as T[];
}

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

  // If there are no number values, then this must be a string enum, and no filtration is required
  const valuesToReturn = numberValues.length > 0 ? numberValues : values;
  return valuesToReturn as T[];
}

// From: https://stackoverflow.com/questions/221294/how-do-you-get-a-timestamp-in-javascript
export function getTimestamp(): number {
  const epochTimestampMilliseconds = +new Date();

  // Lua's method of getting the epoch timestamp results in a value based on seconds
  const epochTimestampSeconds = epochTimestampMilliseconds / 1000;

  return epochTimestampSeconds;
}
