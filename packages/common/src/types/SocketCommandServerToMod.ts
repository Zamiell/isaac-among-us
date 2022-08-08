import { MeetingResolution } from "../enums/MeetingResolution";
import { MeetingType } from "../enums/MeetingType";
import { PlayerTypeAllowed } from "../enums/PlayerTypeAllowed";
import { Role } from "../enums/Role";
import { SkeldRoom } from "../enums/SkeldRoom";
import { Meeting } from "../interfaces/Meeting";
import { PlayerBody } from "../interfaces/PlayerBody";
import { TaskList } from "./TaskList";

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
  imposters!: number[] | null;
  tasks!: TaskList;
}

export class ReconnectDataToMod {
  gameID!: number;
  name!: string;
  players!: GameDescriptionPlayer[];
  imposters!: number[];
  meeting!: Meeting | null;
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
} as const;
