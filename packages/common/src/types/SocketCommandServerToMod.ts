/* eslint-disable max-classes-per-file */

import type { AnyClass } from "isaacscript-common";
import type { MeetingResolution } from "../enums/MeetingResolution";
import type { MeetingType } from "../enums/MeetingType";
import type { PlayerTypeAllowed } from "../enums/PlayerTypeAllowed";
import type { Role } from "../enums/Role";
import type { SabotageType } from "../enums/SabotageType";
import type { SkeldRoom } from "../enums/SkeldRoom";
import type { Meeting } from "../interfaces/Meeting";
import type { PlayerBody } from "../interfaces/PlayerBody";
import type { TaskList } from "./TaskList";

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
  PLAYER_JOINED = "playerJoined",
  PLAYER_LEFT = "playerLeft",
  NEW_OWNER = "newOwner",
  CHAT = "chat",
  STARTED = "started",
  RECONNECT = "reconnect",
  EMERGENCY_BUTTON_COOLDOWN = "emergencyButtonCooldown",
  KILLED = "killed",
  SABOTAGE = "sabotage",
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
  hasPassword!: boolean;
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
  ownerUserID!: number;
  created!: boolean;
  hasPassword!: boolean;
  character!: PlayerTypeAllowed;
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

export class PlayerJoinedDataToMod {
  gameID!: number;
  userID!: number;
}

export class PlayerLeftDataToMod {
  gameID!: number;
  userID!: number;
}

export class NewOwnerDataToMod {
  gameID!: number;
  userID!: number;
}

export class GameDescriptionPlayer {
  index!: number;
  userID!: number;
  username!: string;
  connected!: boolean;
  character!: PlayerTypeAllowed;
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
  imposterUserIDs!: number[];
  tasks!: TaskList;
}

export class ReconnectDataToMod {
  gameID!: number;
  name!: string;
  ownerUserID!: number;
  players!: GameDescriptionPlayer[];
  imposterUserIDs!: number[];
  meeting!: Meeting | null;
  emergencyButtonOnCooldown!: boolean;
  tasks!: TaskList;
  character!: PlayerTypeAllowed;
  room!: SkeldRoom;
  enterGridIndex!: number;
  bodies!: PlayerBody[];
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

export class SabotageDataToMod {
  gameID!: number;
  sabotageType!: SabotageType;
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
  imposterUserIDs!: number[];
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
  [SocketCommandServerToMod.PLAYER_JOINED]: PlayerJoinedDataToMod,
  [SocketCommandServerToMod.PLAYER_LEFT]: PlayerLeftDataToMod,
  [SocketCommandServerToMod.NEW_OWNER]: NewOwnerDataToMod,
  [SocketCommandServerToMod.CHAT]: ChatDataToMod,
  [SocketCommandServerToMod.STARTED]: StartedDataToMod,
  [SocketCommandServerToMod.RECONNECT]: ReconnectDataToMod,
  [SocketCommandServerToMod.EMERGENCY_BUTTON_COOLDOWN]:
    EmergencyButtonCooldownDataToMod,
  [SocketCommandServerToMod.KILLED]: KilledDataToMod,
  [SocketCommandServerToMod.SABOTAGE]: SabotageDataToMod,
  [SocketCommandServerToMod.START_MEETING]: StartMeetingDataToMod,
  [SocketCommandServerToMod.START_VOTING]: StartVotingDataToMod,
  [SocketCommandServerToMod.VOTE]: VoteDataToMod,
  [SocketCommandServerToMod.END_MEETING]: EndMeetingDataToMod,
  [SocketCommandServerToMod.END_GAME]: EndGameDataToMod,
  [SocketCommandServerToMod.TERMINATED]: TerminatedDataToMod,
} as const satisfies Record<SocketCommandServerToMod, AnyClass>;
