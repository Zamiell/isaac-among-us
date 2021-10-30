/*

pack/unpack reference:

- "b" a signed char, "B" an unsigned char
- "h" a signed short (2 bytes), "H" an unsigned short (2 bytes)
- "i" a signed int (4 bytes), "I" an unsigned int (4 bytes)
- "l" a signed long (8 bytes), "L" an unsigned long (8 bytes)
- "f" a float (4 bytes), "d" a double (8 bytes)
- "s" a zero-terminated string
- "cn" a sequence of exactly n chars corresponding to a single Lua string

*/

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

// The lobby has a room index of GridRooms.ROOM_DEBUG_IDX, but we cannot use negative numbers in the
// struct, so we substitute it for an arbitrary room index
// This has to be high enough to not conflict with a vanilla room
export const LOBBY_ROOM_INDEX = 1000;

export const REMOTE_HOSTNAME = IS_DEV ? "192.168.1.10" : "isaacracing.net";
export const SOCKET_CONNECT_TIMEOUT_SECONDS = 1;
export const SOCKET_CLIENT_RETURN_SUCCESS = 1;

export const UDP_BEACON_INTERVAL = 10 * ISAAC_FRAMES_PER_SECOND;
export const UDP_BEACON_FIELDS = ["gameID", "userID", "message"];
export const UDP_BEACON_DATA_FORMAT = "IIc5";
export const UDP_BEACON_MESSAGE = "HELLO";
// This matches the UDPMessageBodyPosition struct
export const UDP_POSITION_FIELDS = [
  "gameID",
  "userID",
  "x",
  "y",
  "roomIndex",
  "animation",
  "animationFrame",
  "overlayAnimation",
  "overlayAnimationFrame",
];
export const UDP_POSITION_DATA_FORMAT = "IIffIc20Ic20I";

/** The version is updated automatically by a pre-publish script. */
export const VERSION = "0.0.1";
