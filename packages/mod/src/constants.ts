import { IS_DEV, SkeldRoom } from "common";
import { RENDER_FRAMES_PER_SECOND } from "isaacscript-common";

export const MOD_NAME = "Among Us";

/** The version is updated automatically by a pre-publish script. */
export const VERSION = "0.0.1";

// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
export const REMOTE_HOSTNAME = IS_DEV ? "192.168.1.10" : "isaacracing.net";
export const SOCKET_CONNECT_TIMEOUT_SECONDS = 1;
export const SOCKET_CLIENT_RETURN_SUCCESS = 1;

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
export const UDP_BEACON_FIELDS: ReadonlyArray<
  [name: keyof UDPBeaconInterface, format: string]
> = [
  ["gameID", "I"],
  ["userID", "I"],
  ["message", `c${UDP_BEACON_MESSAGE.length}`],
];
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
export const UDP_POSITION_FIELDS: ReadonlyArray<
  [name: keyof UDPPositionInterface, format: FieldType | string]
> = [
  ["gameID", FieldType.UNSIGNED_INT],
  ["userID", FieldType.UNSIGNED_INT],
  ["x", FieldType.FLOAT],
  ["y", FieldType.FLOAT],
  ["room", FieldType.UNSIGNED_INT],
  ["animation", "c20"],
  ["animationFrame", FieldType.UNSIGNED_INT],
  ["overlayAnimation", "c20"],
  ["overlayAnimationFrame", FieldType.UNSIGNED_INT],
];
export const UDP_POSITION_DATA_FORMAT = UDP_POSITION_FIELDS.map(
  (tuple) => tuple[1],
).join();
