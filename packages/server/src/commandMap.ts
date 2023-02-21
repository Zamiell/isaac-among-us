import { SocketCommandModToServer, SocketCommandModToServerData } from "common";
import { commandChat } from "./commands/chat.js";
import { commandCheckUsername } from "./commands/checkUsername.js";
import { commandCreate } from "./commands/create.js";
import { commandDebug } from "./commands/debug.js";
import { commandGameList } from "./commands/gameList.js";
import { commandJoin } from "./commands/join.js";
import { commandKill } from "./commands/kill.js";
import { commandKillMe } from "./commands/killMe.js";
import { commandLeave } from "./commands/leave.js";
import { commandLogin } from "./commands/login.js";
import { commandMeeting } from "./commands/meeting.js";
import { commandPing } from "./commands/ping.js";
import { commandReconnect } from "./commands/reconnect.js";
import { commandRevive } from "./commands/revive.js";
import { commandRoom } from "./commands/room.js";
import { commandSabotage } from "./commands/sabotage.js";
import { commandStart } from "./commands/start.js";
import { commandTaskComplete } from "./commands/taskComplete.js";
import { commandTerminate } from "./commands/terminate.js";
import { commandVote } from "./commands/vote.js";
import { ExtraCommandData } from "./interfaces/ExtraCommandData.js";
import { Socket } from "./interfaces/Socket.js";

type ServerCommandMap = {
  [Key in SocketCommandModToServer]: (
    socket: Socket,
    data: InstanceType<(typeof SocketCommandModToServerData)[Key]>,
    extraData: ExtraCommandData,
  ) => void | Promise<void>;
};

export const SERVER_COMMAND_MAP = {
  [SocketCommandModToServer.PING]: commandPing,
  [SocketCommandModToServer.CHECK_USERNAME]: commandCheckUsername,
  [SocketCommandModToServer.LOGIN]: commandLogin,
  [SocketCommandModToServer.GAME_LIST]: commandGameList,
  [SocketCommandModToServer.CREATE]: commandCreate,
  [SocketCommandModToServer.JOIN]: commandJoin,
  [SocketCommandModToServer.LEAVE]: commandLeave,
  [SocketCommandModToServer.CHAT]: commandChat,
  [SocketCommandModToServer.START]: commandStart,
  [SocketCommandModToServer.RECONNECT]: commandReconnect,
  [SocketCommandModToServer.ROOM]: commandRoom,
  [SocketCommandModToServer.KILL]: commandKill,
  [SocketCommandModToServer.SABOTAGE]: commandSabotage,
  [SocketCommandModToServer.MEETING]: commandMeeting,
  [SocketCommandModToServer.VOTE]: commandVote,
  [SocketCommandModToServer.TASK_COMPLETE]: commandTaskComplete,
  [SocketCommandModToServer.TERMINATE]: commandTerminate,
  [SocketCommandModToServer.REVIVE]: commandRevive,
  [SocketCommandModToServer.KILL_ME]: commandKillMe,
  [SocketCommandModToServer.DEBUG]: commandDebug,
} as const satisfies ServerCommandMap;
