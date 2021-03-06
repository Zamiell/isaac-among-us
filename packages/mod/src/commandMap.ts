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
import { commandReconnect } from "./commands/reconnect";
import { commandStarted } from "./commands/started";
import { commandStartMeeting } from "./commands/startMeeting";
import { commandStartVoting } from "./commands/startVoting";
import { commandTerminated } from "./commands/terminated";
import { commandUserConnected } from "./commands/userConnected";
import { commandUsername } from "./commands/username";
import { commandVote } from "./commands/vote";
import {
  SocketCommandServerToMod,
  SocketCommandServerToModData,
} from "./types/SocketCommands";

type CommandMap = {
  [Value in SocketCommandServerToMod]: (
    data: InstanceType<typeof SocketCommandServerToModData[Value]>,
  ) => void;
};

export const commandMap: CommandMap = {
  [SocketCommandServerToMod.ERROR]: commandError,
  [SocketCommandServerToMod.USERNAME]: commandUsername,
  [SocketCommandServerToMod.LOGGED_IN]: commandLoggedIn,
  [SocketCommandServerToMod.USER_CONNECTED]: commandUserConnected,
  [SocketCommandServerToMod.GAME_LIST]: commandGameList,
  [SocketCommandServerToMod.NEW_GAME]: commandNewGame,
  [SocketCommandServerToMod.JOINED]: commandJoined,
  [SocketCommandServerToMod.LEFT]: commandLeft,
  [SocketCommandServerToMod.GAME_DESCRIPTION]: commandGameDescription,
  [SocketCommandServerToMod.CHAT]: commandChat,
  [SocketCommandServerToMod.STARTED]: commandStarted,
  [SocketCommandServerToMod.RECONNECT]: commandReconnect,
  [SocketCommandServerToMod.EMERGENCY_BUTTON_COOLDOWN]:
    commandEmergencyButtonCooldown,
  [SocketCommandServerToMod.KILLED]: commandKilled,
  [SocketCommandServerToMod.START_MEETING]: commandStartMeeting,
  [SocketCommandServerToMod.START_VOTING]: commandStartVoting,
  [SocketCommandServerToMod.VOTE]: commandVote,
  [SocketCommandServerToMod.END_MEETING]: commandEndMeeting,
  [SocketCommandServerToMod.END_GAME]: commandEndGame,
  [SocketCommandServerToMod.TERMINATED]: commandTerminated,
};
