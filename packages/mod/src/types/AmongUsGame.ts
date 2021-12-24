import { CutsceneState } from "./CutsceneState";
import { EndMeetingState } from "./EndMeetingState";
import { Meeting } from "./Meeting";
import { MeetingResolution } from "./MeetingResolution";
import { PlayerData } from "./PlayerData";
import { Role } from "./Role";
import { GameDescriptionPlayer } from "./SocketCommands";
import { StartMeetingState } from "./StartMeetingState";
import { Task } from "./Task";
import { TaskList } from "./TaskList";
import { TaskType } from "./TaskType";

export class AmongUsGame {
  id: number;
  name: string;
  started = false;
  imposters: number[] | null = null;
  meeting: Meeting | null = null;
  players: GameDescriptionPlayer[] = [];
  /** Indexed by user ID. Contains only UDP data. */
  playerMap = new Map<int, PlayerData>();

  character = PlayerType.PLAYER_ISAAC;
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
    startFrame: null as int | null,
  };

  startMeeting = {
    state: StartMeetingState.DISABLED,
    startFrame: null as int | null,
  };

  endMeeting = {
    state: EndMeetingState.DISABLED,
    startFrame: null as int | null,
    meetingResolution: MeetingResolution.EJECT,
    userIDEjected: null as int | null,
  };

  constructor(id: int, name: string, character: PlayerType) {
    this.id = id;
    this.name = name;
    this.character = character;
  }

  getNumAlivePlayers(): int {
    let numAlivePlayers = 0;
    for (const player of this.players) {
      if (player.alive) {
        numAlivePlayers += 1;
      }
    }

    return numAlivePlayers;
  }

  getPlayerFromUserID(userID: int): GameDescriptionPlayer | null {
    for (const player of this.players) {
      if (player.userID === userID) {
        return player;
      }
    }

    return null;
  }

  getPlayerFromUsername(username: string): GameDescriptionPlayer | null {
    for (const player of this.players) {
      if (player.username === username) {
        return player;
      }
    }

    return null;
  }

  getPlayerIndexFromUserID(userID: int): int | null {
    for (let i = 0; i < this.players.length; i++) {
      const player = this.players[i];
      if (player.userID === userID) {
        return i;
      }
    }

    return null;
  }

  getPlayerCharacter(userID: int): PlayerType | null {
    const player = this.getPlayerFromUserID(userID);
    return player === null ? null : player.character;
  }

  getPlayerUsername(userID: int): string | null {
    const player = this.getPlayerFromUserID(userID);
    return player === null ? null : player.username;
  }

  isPlayerJoined(userID: int): boolean {
    for (const player of this.players) {
      if (player.userID === userID) {
        return true;
      }
    }

    return false;
  }
}
