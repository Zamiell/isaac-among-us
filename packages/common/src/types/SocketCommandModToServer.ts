/* eslint-disable max-classes-per-file */

import { AnyClass } from "isaacscript-common";
import { MeetingType } from "../enums/MeetingType";
import { SabotageType } from "../enums/SabotageType";
import { SkeldRoom } from "../enums/SkeldRoom";

export enum SocketCommandModToServer {
  PING = "ping",
  CHECK_USERNAME = "checkUsername",
  LOGIN = "login",
  GAME_LIST = "gameList",
  CREATE = "create",
  JOIN = "join",
  LEAVE = "leave",
  CHAT = "chat",
  START = "start",
  RECONNECT = "reconnect",
  ROOM = "room",
  KILL = "kill",
  SABOTAGE = "sabotage",
  MEETING = "meeting",
  VOTE = "vote",
  TASK_COMPLETE = "taskComplete",
  TERMINATE = "terminate",
  REVIVE = "revive",
  KILL_ME = "killMe",
  DEBUG = "debug",
}

export class CheckUsernameDataToServer {
  username = "";
}

export class LoginDataToServer {
  username = "";
  password = "";
}

export class CreateDataToServer {
  name = "";
  password = "";
}

export class JoinDataToServer {
  name = "";
  password = "";
  created = false;
}

export class LeaveDataToServer {
  gameID = 0;
}

export class ChatDataToServer {
  gameID = 0;
  msg = "";
}

export class StartDataToServer {
  gameID = 0;
}

export class ReconnectDataToServer {
  gameID = 0;
}

export class RoomDataToServer {
  gameID = 0;
  room = SkeldRoom.CAFETERIA;
  enterGridIndex = 0;
}

export class KillDataToServer {
  gameID = 0;
  userIDKilled = 0;
  room = SkeldRoom.CAFETERIA;
  x = 0;
  y = 0;
}

export class SabotageDataToServer {
  gameID = 0;
  sabotageType = SabotageType.FIX_LIGHTS;
}

export class MeetingDataToServer {
  gameID = 0;
  meetingType = MeetingType.REPORT_BODY;
  userIDKilled = 0;
}

export class VoteDataToServer {
  gameID = 0;
  userIDVotedFor = 0;
  skip = false;
}

export class TaskCompleteDataToServer {
  gameID = 0;
  task = 0;
}

export class TerminateDataToServer {
  gameID = 0;
}

export class ReviveDataToServer {
  gameID = 0;
}

export class KillMeDataToServer {
  gameID = 0;
  userIDKilled = 0;
  room = SkeldRoom.CAFETERIA;
  x = 0;
  y = 0;
}

export class DebugDataToServer {
  gameID = 0;
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class NoData {}

export const SocketCommandModToServerData = {
  [SocketCommandModToServer.PING]: NoData,
  [SocketCommandModToServer.CHECK_USERNAME]: CheckUsernameDataToServer,
  [SocketCommandModToServer.LOGIN]: LoginDataToServer,
  [SocketCommandModToServer.GAME_LIST]: NoData,
  [SocketCommandModToServer.CREATE]: CreateDataToServer,
  [SocketCommandModToServer.JOIN]: JoinDataToServer,
  [SocketCommandModToServer.LEAVE]: LeaveDataToServer,
  [SocketCommandModToServer.CHAT]: ChatDataToServer,
  [SocketCommandModToServer.START]: StartDataToServer,
  [SocketCommandModToServer.RECONNECT]: ReconnectDataToServer,
  [SocketCommandModToServer.ROOM]: RoomDataToServer,
  [SocketCommandModToServer.KILL]: KillDataToServer,
  [SocketCommandModToServer.SABOTAGE]: SabotageDataToServer,
  [SocketCommandModToServer.MEETING]: MeetingDataToServer,
  [SocketCommandModToServer.VOTE]: VoteDataToServer,
  [SocketCommandModToServer.TASK_COMPLETE]: TaskCompleteDataToServer,
  [SocketCommandModToServer.TERMINATE]: TerminateDataToServer,
  [SocketCommandModToServer.REVIVE]: ReviveDataToServer,
  [SocketCommandModToServer.KILL_ME]: KillMeDataToServer,
  [SocketCommandModToServer.DEBUG]: DebugDataToServer,
} as const satisfies Record<SocketCommandModToServer, AnyClass>;
