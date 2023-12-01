// From: https://stackoverflow.com/questions/221294/how-do-you-get-a-timestamp-in-javascript
export function getTimestamp(): number {
  const epochTimestampMilliseconds = Date.now();

  // Lua's method of getting the epoch timestamp results in a value based on seconds.
  const epochTimestampSeconds = epochTimestampMilliseconds / 1000;

  return epochTimestampSeconds;
}
