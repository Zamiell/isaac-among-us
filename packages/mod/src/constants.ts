import { ISAAC_FRAMES_PER_SECOND } from "isaacscript-common";
import { IS_DEV } from "../../common/src/constants";

export {
  IS_DEV,
  MAX_PLAYERS,
  NOT_VOTED_YET,
  TCP_PORT,
  UDP_PORT,
} from "../../common/src/constants";
export { taskDescriptions } from "../../common/src/taskDescriptions";

export const MOD_NAME = "Among Us";

export const REMOTE_HOSTNAME = IS_DEV ? "192.168.1.10" : "isaacracing.net";
export const SOCKET_CONNECT_TIMEOUT_SECONDS = 1;
export const SOCKET_CLIENT_RETURN_SUCCESS = 1;

/*
const FIELD_TYPES: readonly string[] = [
  "b", // signed char
  "B", // unsigned char
  "h", // signed short (2 bytes)
  "H", // unsigned short (2 bytes)
  "i", // signed int (4 bytes)
  "I", // unsigned int (4 bytes)
  "l", // signed long (8 bytes)
  "L", // unsigned long (8 bytes)
  "f", // float (4 bytes)
  "d", // double (8 bytes)
  "s", // zero-terminated string
  "cn", // sequence of exactly n chars corresponding to a single Lua string
];
*/

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
export const UDP_BEACON_INTERVAL = 10 * ISAAC_FRAMES_PER_SECOND;

// This matches the UDPMessageBodyPosition struct
export interface UDPPositionInterface {
  gameID: int;
  userID: int;
  x: float;
  y: float;
  roomIndex: int;
  animation: string;
  animationFrame: int;
  overlayAnimation: string;
  overlayAnimationFrame: int;
}
export const UDP_POSITION_FIELDS: ReadonlyArray<
  [name: keyof UDPPositionInterface, format: string]
> = [
  ["gameID", "I"],
  ["userID", "I"],
  ["x", "f"],
  ["y", "f"],
  ["roomIndex", "I"],
  ["animation", "c20"],
  ["animationFrame", "I"],
  ["overlayAnimation", "c20"],
  ["overlayAnimationFrame", "I"],
];
export const UDP_POSITION_DATA_FORMAT = UDP_POSITION_FIELDS.map(
  (tuple) => tuple[1],
).join();

/** The version is updated automatically by a pre-publish script. */
export const VERSION = "0.0.1";
