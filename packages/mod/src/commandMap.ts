import type { SocketCommandServerToModData } from "common";
import { SocketCommandServerToMod } from "common";
import { commandChat } from "./commands/chat";
import { commandEmergencyButtonCooldown } from "./commands/emergencyButtonCooldown";
import { commandEndGame } from "./commands/endGame";
import { commandEndMeeting } from "./commands/endMeeting";
import { commandError } from "./commands/error";
import { commandGameDescription } from "./commands/gameDescription";
import { commandGameList } from "./commands/gameList";
import { commandJoined } from "./commands/joined";
import { commandKilled } from "./commands/killed";
import { commandLeft } from "./commands/left";
import { commandLoggedIn } from "./commands/loggedIn";
import { commandNewGame } from "./commands/newGame";
import { commandNewOwner } from "./commands/newOwner";
import { commandPlayerJoined } from "./commands/playerJoined";
import { commandPlayerLeft } from "./commands/playerLeft";
import { commandReconnect } from "./commands/reconnect";
import { commandSabotage } from "./commands/sabotage";
import { commandStartMeeting } from "./commands/startMeeting";
import { commandStartVoting } from "./commands/startVoting";
import { commandStarted } from "./commands/started";
import { commandTerminated } from "./commands/terminated";
import { commandUserConnected } from "./commands/userConnected";
import { commandUsername } from "./commands/username";
import { commandVote } from "./commands/vote";

type ClientCommandMap = {
  [Value in SocketCommandServerToMod]: (
    data: InstanceType<(typeof SocketCommandServerToModData)[Value]>,
  ) => void;
};

export const CLIENT_COMMAND_MAP = {
  [SocketCommandServerToMod.ERROR]: commandError,
  [SocketCommandServerToMod.USERNAME]: commandUsername,
  [SocketCommandServerToMod.LOGGED_IN]: commandLoggedIn,
  [SocketCommandServerToMod.USER_CONNECTED]: commandUserConnected,
  [SocketCommandServerToMod.GAME_LIST]: commandGameList,
  [SocketCommandServerToMod.NEW_GAME]: commandNewGame,
  [SocketCommandServerToMod.JOINED]: commandJoined,
  [SocketCommandServerToMod.LEFT]: commandLeft,
  [SocketCommandServerToMod.GAME_DESCRIPTION]: commandGameDescription,
  [SocketCommandServerToMod.PLAYER_JOINED]: commandPlayerJoined,
  [SocketCommandServerToMod.PLAYER_LEFT]: commandPlayerLeft,
  [SocketCommandServerToMod.NEW_OWNER]: commandNewOwner,
  [SocketCommandServerToMod.CHAT]: commandChat,
  [SocketCommandServerToMod.STARTED]: commandStarted,
  [SocketCommandServerToMod.RECONNECT]: commandReconnect,
  [SocketCommandServerToMod.EMERGENCY_BUTTON_COOLDOWN]:
    commandEmergencyButtonCooldown,
  [SocketCommandServerToMod.KILLED]: commandKilled,
  [SocketCommandServerToMod.SABOTAGE]: commandSabotage,
  [SocketCommandServerToMod.START_MEETING]: commandStartMeeting,
  [SocketCommandServerToMod.START_VOTING]: commandStartVoting,
  [SocketCommandServerToMod.VOTE]: commandVote,
  [SocketCommandServerToMod.END_MEETING]: commandEndMeeting,
  [SocketCommandServerToMod.END_GAME]: commandEndGame,
  [SocketCommandServerToMod.TERMINATED]: commandTerminated,
} as const satisfies ClientCommandMap;
