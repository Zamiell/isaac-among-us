import {
  GameDescriptionPlayer,
  Meeting,
  MeetingResolution,
  PlayerBody,
  PlayerTypeAllowed,
  Role,
  Task,
  TaskList,
  TaskType,
} from "common";
import { log, logTable } from "isaacscript-common";
import { CutsceneState } from "../enums/CutsceneState";
import { EndMeetingState } from "../enums/EndMeetingState";
import { StartMeetingState } from "../enums/StartMeetingState";
import { PlayerData } from "../interfaces/PlayerData";

export class AmongUsGame {
  id: number;
  name: string;
  ownerUserID: number;
  started = false;
  imposterUserIDs: number[] = [];
  meeting: Meeting | null = null;
  players: GameDescriptionPlayer[] = [];
  bodies: PlayerBody[] = [];
  emergencyButtonOnCooldown = true;

  /** Indexed by user ID. Contains only UDP data. */
  playerMap = new Map<int, PlayerData>();

  character = PlayerTypeAllowed.ISAAC;
  role = Role.CREW;
  usedEmergencyMeeting = false;
  inVent = false;

  ourTasks: TaskList = {
    [TaskType.SHORT]: [] as Task[],
    [TaskType.LONG]: [] as Task[],
    [TaskType.COMMON]: [] as Task[],
  };

  currentTask: Task | -1 | null = null; // -1 is the type of the "FAKE_TASK" constant.
  startTaskTime = 0;
  endTaskTime = 0;
  taskReturnRoomName = "";
  taskReturnGridIndex = 0;

  startGameCutscene = {
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

  constructor(
    id: int,
    name: string,
    ownerUserID: number,
    character: PlayerTypeAllowed,
  ) {
    this.id = id;
    this.name = name;
    this.ownerUserID = ownerUserID;
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

  isImposter(userID: int): boolean {
    const player = this.getPlayerFromUserID(userID);
    return player !== undefined && this.imposterUserIDs.includes(player.userID);
  }

  logBodies(): void {
    this.bodies.forEach((body, i) => {
      log(`Body ${i}:`);
      logTable(body);
    });
  }

  logOurTasks(): void {
    log("Our tasks:");
    for (const [taskType, tasks] of Object.entries(this.ourTasks)) {
      log(`- ${taskType}`);
      for (const task of tasks) {
        log(`  - Task.${Task[task]} (${task})`);
      }
    }
  }
}
