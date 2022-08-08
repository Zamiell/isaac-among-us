import { CutsceneState } from "../enums/CutsceneState";
import { EndMeetingState } from "../enums/EndMeetingState";
import { MeetingResolution } from "../enums/MeetingResolution";
import { PlayerTypeAllowed } from "../enums/PlayerTypeAllowed";
import { Role } from "../enums/Role";
import { StartMeetingState } from "../enums/StartMeetingState";
import { Task } from "../enums/Task";
import { TaskType } from "../enums/TaskType";
import { Meeting } from "../interfaces/Meeting";
import { PlayerBody } from "../interfaces/PlayerBody";
import { PlayerData } from "../interfaces/PlayerData";
import { GameDescriptionPlayer } from "../types/SocketCommands";
import { TaskList } from "../types/TaskList";

export class AmongUsGame {
  id: number;
  name: string;
  started = false;
  imposters: number[] | null = null;
  meeting: Meeting | null = null;
  players: GameDescriptionPlayer[] = [];
  bodies: PlayerBody[] = [];
  emergencyButtonCooldown = true;

  /** Indexed by user ID. Contains only UDP data. */
  playerMap = new Map<int, PlayerData>();

  character = PlayerTypeAllowed.ISAAC;
  role = Role.CREW;
  usedEmergencyMeeting = false;

  ourTasks: TaskList = {
    [TaskType.SHORT]: [] as Task[],
    [TaskType.LONG]: [] as Task[],
    [TaskType.COMMON]: [] as Task[],
  };

  currentTask: Task | null = null;
  startTaskTime = 0;
  endTaskTime = 0;

  cutscene = {
    state: CutsceneState.DISABLED,
    startRenderFrame: null as int | null,
  };

  startMeeting = {
    state: StartMeetingState.DISABLED,
    startRenderFrame: null as int | null,
  };

  endMeeting = {
    state: EndMeetingState.DISABLED,
    startRenderFrame: null as int | null,
    meetingResolution: MeetingResolution.EJECT,
    userIDEjected: null as int | null,
  };

  constructor(id: int, name: string, character: PlayerTypeAllowed) {
    this.id = id;
    this.name = name;
    this.character = character;
  }

  getNumAlivePlayers(): int {
    const alivePlayers = this.players.filter((player) => player.alive);
    return alivePlayers.length;
  }

  getPlayerFromUserID(userID: int): GameDescriptionPlayer | undefined {
    return this.players.find((player) => player.userID === userID);
  }

  getPlayerFromUsername(username: string): GameDescriptionPlayer | undefined {
    return this.players.find((player) => player.username === username);
  }

  getPlayerIndexFromUserID(userID: int): int | undefined {
    const player = this.getPlayerFromUserID(userID);
    return player === undefined ? undefined : player.index;
  }

  getPlayerCharacter(userID: int): PlayerTypeAllowed | undefined {
    const player = this.getPlayerFromUserID(userID);
    return player === undefined ? undefined : player.character;
  }

  getPlayerUsername(userID: int): string | undefined {
    const player = this.getPlayerFromUserID(userID);
    return player === undefined ? undefined : player.username;
  }

  isPlayerJoined(userID: int): boolean {
    const player = this.getPlayerFromUserID(userID);
    return player !== undefined;
  }
}
