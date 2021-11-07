import { commandChat } from "./commands/chat";
import { commandCheckUsername } from "./commands/checkUsername";
import { commandCreate } from "./commands/create";
import { commandDebug } from "./commands/debug";
import { commandGameList } from "./commands/gameList";
import { commandJoin } from "./commands/join";
import { commandKill } from "./commands/kill";
import { commandLeave } from "./commands/leave";
import { commandLogin } from "./commands/login";
import { commandMeeting } from "./commands/meeting";
import { commandPing } from "./commands/ping";
import { commandReconnect } from "./commands/reconnect";
import { commandRoom } from "./commands/room";
import { commandStart } from "./commands/start";
import { commandTaskComplete } from "./commands/taskComplete";
import { commandTerminate } from "./commands/terminate";
import { commandVote } from "./commands/vote";
import { ExtraCommandData } from "./types/ExtraCommandData";
import { Socket } from "./types/Socket";
import {
  SocketCommandModToServer,
  SocketCommandModToServerData,
} from "./types/SocketCommands";

type CommandMap = {
  [Value in SocketCommandModToServer]: (
    socket: Socket,
    data: InstanceType<typeof SocketCommandModToServerData[Value]>,
    extraData: ExtraCommandData,
  ) => void | Promise<void>;
};

export const commandMap: CommandMap = {
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
  [SocketCommandModToServer.MEETING]: commandMeeting,
  [SocketCommandModToServer.VOTE]: commandVote,
  [SocketCommandModToServer.TASK_COMPLETE]: commandTaskComplete,
  [SocketCommandModToServer.TERMINATE]: commandTerminate,
  [SocketCommandModToServer.DEBUG]: commandDebug,
};
