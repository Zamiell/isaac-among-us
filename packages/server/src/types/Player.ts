import { PlayerTypeAllowed } from "./PlayerTypeAllowed";
import { Role } from "./Role";
import { SkeldRoom } from "./SkeldRoom";
import { Task } from "./Task";
import { TaskType } from "./TaskType";

export class Player {
  index: number;
  socketID: number;
  userID: number;
  username: string;
  connected = true;
  role = Role.CREW;
  character: PlayerTypeAllowed;
  alive = true;
  room = SkeldRoom.CAFETERIA;
  enterGridIndex = 0;
  usedEmergencyMeeting = false;
  tasks = {
    [TaskType.SHORT]: [] as Task[],
    [TaskType.LONG]: [] as Task[],
    [TaskType.COMMON]: [] as Task[],
  };

  constructor(
    index: number,
    socketID: number,
    userID: number,
    username: string,
    character: PlayerTypeAllowed,
  ) {
    this.index = index;
    this.socketID = socketID;
    this.userID = userID;
    this.username = username;
    this.character = character;
  }
}
