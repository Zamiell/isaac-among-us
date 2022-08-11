/**
 * - The enum values must match the variant IDs defined in "map.xml" / "map.stb" files.
 * - Comments indicate the number of tasks in the room.
 */
export enum SkeldRoom {
  CAFETERIA, // 1
  ADMIN_HALL,
  ADMIN, // 2
  STORAGE, // 2
  MEDBAY_HALL,
  MEDBAY, // 1
  UPPER_ENGINE, // 1
  ENGINE_HALL,
  REACTOR, // 1
  SECURITY, // 2
  LOWER_ENGINE, // 1
  ELECTRICAL_HALL,
  ELECTRICAL, // 2
  WEAPONS, // 2
  O2_HALL,
  O2, // 1
  NAVIGATION, // 1
  NAVIGATION_HALL,
  SHIELDS, // 1
  COMMUNICATION_HALL,
  COMMUNICATION, // 2

  /** The task room value is hard-coded in the XML/STB. */
  TASK = 98,

  // The "map" room takes variant 99.

  /** The lobby is not actually variant 100; we arbitrarily assign this value. */
  LOBBY = 100,
}
