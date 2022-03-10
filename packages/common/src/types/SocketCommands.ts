/* eslint-disable max-classes-per-file */

import { Meeting } from "./Meeting";
import { MeetingResolution } from "./MeetingResolution";
import { MeetingType } from "./MeetingType";
import { PlayerType } from "./PlayerType";
import { Role } from "./Role";
import { SkeldRoom } from "./SkeldRoom";
import { TaskList } from "./TaskList";

// --------------
// Mod --> Server
// --------------

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
  MEETING = "meeting",
  VOTE = "vote",
  TASK_COMPLETE = "taskComplete",
  TERMINATE = "terminate",
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
}

export class JoinDataToServer {
  name = "";
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

export class MeetingDataToServer {
  gameID = 0;
  meetingType = MeetingType.NONE;
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

export class DebugDataToServer {
  gameID = 0;
}

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
  [SocketCommandModToServer.MEETING]: MeetingDataToServer,
  [SocketCommandModToServer.VOTE]: VoteDataToServer,
  [SocketCommandModToServer.TASK_COMPLETE]: TaskCompleteDataToServer,
  [SocketCommandModToServer.TERMINATE]: TerminateDataToServer,
  [SocketCommandModToServer.DEBUG]: DebugDataToServer,
};

// --------------
// Server --> Mod
// --------------

export enum SocketCommandServerToMod {
  ERROR = "error",
  USERNAME = "username",
  LOGGED_IN = "loggedIn",
  USER_CONNECTED = "userConnected",
  GAME_LIST = "gameList",
  NEW_GAME = "newGame",
  JOINED = "joined",
  LEFT = "left",
  GAME_DESCRIPTION = "gameDescription",
  CHAT = "chat",
  STARTED = "started",
  RECONNECT = "reconnect",
  EMERGENCY_BUTTON_COOLDOWN = "emergencyButtonCooldown",
  KILLED = "killed",
  START_MEETING = "startMeeting",
  START_VOTING = "startVoting",
  VOTE = "vote",
  END_MEETING = "endMeeting",
  END_GAME = "endGame",
  TERMINATED = "terminated",
}

export class ErrorDataToMod {
  msg!: string;
}

export class UsernameDataToMod {
  username!: string;
  exists!: boolean;
}

export class LoggedInDataToMod {
  userID!: number;
  username!: string;
}

export class UserConnectedDataToMod {
  userID!: number;
  username!: string;
  connected!: boolean;
}

export class GameListDataToMod {
  gameList!: GameListDescription[];
}

export class GameListDescription {
  id!: number;
  name!: string;
  numPlayers!: number;
  started!: boolean;
  joined!: boolean;
}

export class NewGameDataToMod {
  id!: number;
  name!: string;
  creator!: string;
}

export class JoinedDataToMod {
  gameID!: number;
  name!: string;
  created!: boolean;
  character!: PlayerType;
  reconnected!: boolean;
}

export class LeftDataToMod {
  gameID!: number;
}

export class GameDescriptionDataToMod {
  gameID!: number;
  players!: GameDescriptionPlayer[];
  started!: boolean;
  meeting!: Meeting | null;
}

export class GameDescriptionPlayer {
  userID!: number;
  username!: string;
  connected!: boolean;
  character!: PlayerType;
  alive!: boolean;
  room!: SkeldRoom;
  usedEmergencyMeeting!: boolean;
}

export class ChatDataToMod {
  gameID!: number;
  from!: string;
  msg!: string;
}

export class StartedDataToMod {
  gameID!: number;
  imposters!: number[] | null;
  tasks!: TaskList;
}

export class ReconnectDataToMod {
  gameID!: number;
  name!: string;
  players!: GameDescriptionPlayer[];
  imposters!: number[] | null;
  meeting!: Meeting | null;
  tasks!: TaskList;
  character!: PlayerType;
  room!: SkeldRoom;
  enterGridIndex!: number;
}

export class EmergencyButtonCooldownDataToMod {
  gameID!: number;
  cooldown!: boolean;
}

export class KilledDataToMod {
  gameID!: number;
  userIDKilled!: number;
  room!: SkeldRoom;
  x!: number;
  y!: number;
}

export class StartMeetingDataToMod {
  gameID!: number;
  meetingType!: MeetingType;
  userIDInitiated!: number;
  userIDKilled!: number;
  playersKilledSinceLastMeeting!: number[];
  timePhaseStarted!: number;
  phaseLengthSeconds!: number;
  votes!: number[];
}

export class StartVotingDataToMod {
  gameID!: number;
  timePhaseStarted!: number;
  phaseLengthSeconds!: number;
}

export class VoteDataToMod {
  gameID!: number;
  votes!: number[];
}

export class TaskCompleteDataToMod {
  gameID!: number;
  votes!: number[];
}

export class EndMeetingDataToMod {
  gameID!: number;
  meetingResolution!: MeetingResolution;
  userIDEjected!: number | null;
}

export class EndGameDataToMod {
  gameID!: number;
  winningRole!: Role;
  roles!: Role[];
}

export class TerminatedDataToMod {
  gameID!: number;
}

export const SocketCommandServerToModData = {
  [SocketCommandServerToMod.ERROR]: ErrorDataToMod,
  [SocketCommandServerToMod.USERNAME]: UsernameDataToMod,
  [SocketCommandServerToMod.LOGGED_IN]: LoggedInDataToMod,
  [SocketCommandServerToMod.USER_CONNECTED]: UserConnectedDataToMod,
  [SocketCommandServerToMod.GAME_LIST]: GameListDataToMod,
  [SocketCommandServerToMod.NEW_GAME]: NewGameDataToMod,
  [SocketCommandServerToMod.JOINED]: JoinedDataToMod,
  [SocketCommandServerToMod.LEFT]: LeftDataToMod,
  [SocketCommandServerToMod.GAME_DESCRIPTION]: GameDescriptionDataToMod,
  [SocketCommandServerToMod.CHAT]: ChatDataToMod,
  [SocketCommandServerToMod.STARTED]: StartedDataToMod,
  [SocketCommandServerToMod.RECONNECT]: ReconnectDataToMod,
  [SocketCommandServerToMod.EMERGENCY_BUTTON_COOLDOWN]:
    EmergencyButtonCooldownDataToMod,
  [SocketCommandServerToMod.KILLED]: KilledDataToMod,
  [SocketCommandServerToMod.START_MEETING]: StartMeetingDataToMod,
  [SocketCommandServerToMod.START_VOTING]: StartVotingDataToMod,
  [SocketCommandServerToMod.VOTE]: VoteDataToMod,
  [SocketCommandServerToMod.END_MEETING]: EndMeetingDataToMod,
  [SocketCommandServerToMod.END_GAME]: EndGameDataToMod,
  [SocketCommandServerToMod.TERMINATED]: TerminatedDataToMod,
};
