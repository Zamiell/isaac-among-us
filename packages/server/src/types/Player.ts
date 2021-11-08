import { PlayerBody } from "./PlayerBody";
import { PlayerType } from "./PlayerType";
import { Role } from "./Role";
import { SkeldRoom } from "./SkeldRoom";
import { Task } from "./Task";
import { TaskType } from "./TaskType";

export class Player {
  socketID: number;
  userID: number;
  username: string;
  connected = true;
  role = Role.CREW;
  character: PlayerType;
  alive = true;
  body: PlayerBody | null = null;
  room = SkeldRoom.CAFETERIA;
  enterGridIndex = 0;
  usedEmergencyMeeting = false;
  tasks = {
    [TaskType.SHORT]: [] as Task[],
    [TaskType.LONG]: [] as Task[],
    [TaskType.COMMON]: [] as Task[],
  };

  constructor(
    socketID: number,
    userID: number,
    username: string,
    character: PlayerType,
  ) {
    this.socketID = socketID;
    this.userID = userID;
    this.username = username;
    this.character = character;
  }
}
