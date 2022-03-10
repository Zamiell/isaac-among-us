/**
 * Helper function to get type safety on a switch statement.
 * Very useful to be future-safe against people adding values to a type or an enum.
 */
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

// From: https://stackoverflow.com/questions/221294/how-do-you-get-a-timestamp-in-javascript
export function getTimestamp(): number {
  const epochTimestampMilliseconds = +new Date();

  // Lua's method of getting the epoch timestamp results in a value based on seconds
  const epochTimestampSeconds = epochTimestampMilliseconds / 1000;

  return epochTimestampSeconds;
}
