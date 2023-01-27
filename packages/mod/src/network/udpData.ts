import { SkeldRoom } from "common";
import { RENDER_FRAMES_PER_SECOND } from "isaacscript-common";

enum FieldType {
  SIGNED_CHAR = "b", // 1 byte
  UNSIGNED_CHAR = "B", // 1 byte
  SIGNED_SHORT = "h", // 2 bytes
  UNSIGNED_SHORT = "H", // 2 bytes
  SIGNED_INT = "i", // 4 bytes
  UNSIGNED_INT = "I", // 4 bytes
  SIGNED_LONG = "l", // 8 bytes
  UNSIGNED_LONG = "L", // 8 bytes
  FLOAT = "f", // 4 bytes
  DOUBLE = "d", // 8 bytes
  STRING = "s", // Zero-terminated
  CHAR_SEQUENCE = "cn", // Sequence of exactly n chars corresponding to a single Lua string
}

export interface UDPBeaconInterface {
  gameID: int;
  userID: int;
  message: string;
}
export const UDP_BEACON_MESSAGE = "HELLO";
export const UDP_BEACON_FIELDS = [
  ["gameID", FieldType.UNSIGNED_INT],
  ["userID", FieldType.UNSIGNED_INT],
  ["message", `c${UDP_BEACON_MESSAGE.length}`],
] as const;
export const UDP_BEACON_DATA_FORMAT = UDP_BEACON_FIELDS.map(
  (tuple) => tuple[1],
).join();
export const UDP_BEACON_INTERVAL = 10 * RENDER_FRAMES_PER_SECOND;

export interface UDPPositionInterface {
  gameID: int;
  userID: int;
  x: float;
  y: float;
  room: SkeldRoom;
  animation: string;
  animationFrame: int;
  overlayAnimation: string;
  overlayAnimationFrame: int;
}
export const UDP_POSITION_FIELDS = [
  ["gameID", FieldType.UNSIGNED_INT],
  ["userID", FieldType.UNSIGNED_INT],
  ["x", FieldType.FLOAT],
  ["y", FieldType.FLOAT],
  ["room", FieldType.UNSIGNED_INT],
  ["animation", "c20"],
  ["animationFrame", FieldType.UNSIGNED_INT],
  ["overlayAnimation", "c20"],
  ["overlayAnimationFrame", FieldType.UNSIGNED_INT],
] as const;
export const UDP_POSITION_DATA_FORMAT = UDP_POSITION_FIELDS.map(
  (tuple) => tuple[1],
).join();
